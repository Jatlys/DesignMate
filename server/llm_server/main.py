from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import shutil
from langchain_community.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.prompts import PromptTemplate
from contextlib import asynccontextmanager

# --- Lifespan Management ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Build vector stores on startup if they don't exist."""
    print("Checking for vector stores...")
    for phase in PHASES:
        kb_path = KB_PATHS[phase]
        persist_dir = DB_PATHS[phase]
        # Check if the vector store is missing or empty
        if not os.path.exists(persist_dir) or not os.listdir(persist_dir):
            print(f"Vector store for '{phase}' not found. Building now...")
            create_vector_db(kb_path, persist_dir)
            print(f"Vector store for '{phase}' built successfully.")
        else:
            print(f"Vector store for '{phase}' already exists.")
    yield
    # Code to run on shutdown could be placed here

# --- App Setup ---
app = FastAPI(
    title="DesignMate LLM Server",
    description="Handles LLM and RAG operations for the DesignMate application.",
    version="0.1.0",
    lifespan=lifespan
)

# forcing refresh
print("refresh")

# --- CORS Configuration ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Knowledge Base and Vector Store Configuration ---
KB_BASE_PATH = "knowledge_bases"
DB_BASE_PATH = "vector_stores"

# Define paths for each phase
PHASES = ["general"]
KB_PATHS = {phase: os.path.join(KB_BASE_PATH, phase) for phase in PHASES}
DB_PATHS = {phase: os.path.join(DB_BASE_PATH, phase) for phase in PHASES}

# Create directories on startup
for path in KB_PATHS.values():
    os.makedirs(path, exist_ok=True)
for path in DB_PATHS.values():
    os.makedirs(path, exist_ok=True)

# --- LangChain and Google Gemini Setup ---
# Load environment variables from .env file for local development
load_dotenv()

# Initialize Google Gemini embeddings and chat model.
# This requires the GOOGLE_API_KEY environment variable to be set.
gemini_embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
gemini_llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")


# --- RAG Helper Functions ---
def create_vector_db(source_dir: str, persist_dir: str):
    """Creates a Chroma vector database from documents in a source directory."""
    if not os.path.exists(source_dir) or not os.listdir(source_dir):
        return None
    
    loader = DirectoryLoader(source_dir, glob="*.pdf", loader_cls=PyPDFLoader)
    documents = loader.load()
    if not documents:
        return None

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)
    
    db = Chroma.from_documents(texts, gemini_embeddings, persist_directory=persist_dir)
    db.persist()
    return db

def get_rag_chain(persist_dir: str):
    """Initializes a RetrievalQA chain from a persisted Chroma database."""
    if not os.path.exists(persist_dir) or not os.listdir(persist_dir):
        return None
        
    db = Chroma(persist_directory=persist_dir, embedding_function=gemini_embeddings)
    retriever = db.as_retriever(search_kwargs={"k": 2})
    
    prompt_template = """
    ### [INST] 
    You are a friendly and helpful Design Thinking Assistant. Your primary goal is to answer the user's question based on the provided context.
    
    First, analyze the context provided. If it contains the information needed to answer the question, use it to form your response.
    If the context is not relevant or does not contain the answer, then use your own general knowledge to answer the question as helpfully as possible.
    
    IMPORTANT FORMATTING RULES:
    - Use Markdown for formatting when it improves readability (e.g., lists, bolding, italics, code blocks).
    - For lists, use hyphens (-) or asterisks (*).
    - Use double asterisks (**) for bolding and single asterisks (*) for italics.
    
    When giving suggestions, tips, or recommendations, present them in a clear, formatted list.
    When addressing a query or problem, include specific actionable steps the user can take, preferably in a numbered or bulleted list.

    When relevant, apply design thinking principles such as empathy, defining the problem, ideation, prototyping, and testing (You can use the 4 Ds in the Double Diamond Frame Work as well). 
    Keep your answers concise and focused on key ideas.
    Your tone should be approachable, encouraging, and solution-oriented.
    Do not mention the words "context" or "question" in your response.
    
    Context: {context}
    Question: {question}
    
    ### [/INST]
    """
    
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

    qa_chain = RetrievalQA.from_chain_type(
                llm=gemini_llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt}
    )
    return qa_chain

# --- API Endpoints ---
@app.post("/api/{phase}/chat", summary="Chat with a chatbot for a specific phase")
async def chat(phase: str, query: str = Form(...)):
    """Handles chat requests for any phase using a RAG pipeline."""
    if phase not in PHASES:
        return {"error": "Invalid phase"}

    persist_dir = DB_PATHS[phase]
    qa_chain = get_rag_chain(persist_dir)

    if qa_chain is None:
        return {"sender": "bot", "message": f"The knowledge base for the '{phase}' phase is empty. Please upload documents first."}

    try:
        response = qa_chain({"query": query})
        return {"sender": "bot", "message": response["result"]}
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/{phase}/upload", summary="Upload a document to a knowledge base for a specific phase")
async def upload(phase: str, file: UploadFile = File(...)):
    """Saves an uploaded file and updates the corresponding vector store."""
    if phase not in PHASES:
        return {"error": "Invalid phase"}

    kb_path = KB_PATHS[phase]
    persist_dir = DB_PATHS[phase]

    file_path = os.path.join(kb_path, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Recreate the vector database for that phase
    create_vector_db(kb_path, persist_dir)

    return {"filename": file.filename, "status": f"Uploaded and processed for {phase} KB"}

# --- Static Files and Catch-all Route ---
static_files_dir = os.path.join(os.path.dirname(__file__), "dist")

app.mount("/assets", StaticFiles(directory=os.path.join(static_files_dir, "assets")), name="assets")

@app.get("/{full_path:path}")
async def catch_all(request: Request, full_path: str):
    """Catch-all endpoint to serve index.html for client-side routing."""
    file_path = os.path.join(static_files_dir, "index.html")
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"error": "index.html not found"}
