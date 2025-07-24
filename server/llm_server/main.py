from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import shutil
import os
from langchain_community.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.prompts import PromptTemplate

# --- App Setup ---
app = FastAPI(
    title="DesignMate LLM Server",
    description="Handles LLM and RAG operations for the DesignMate application.",
    version="0.1.0",
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
PHASES = ["discover", "define", "deliver", "develop"]
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
    You are a friendly and helpful Design Thinking Assistant. Use the provided context to answer the user's question.
    Do not use any markdown formatting (such as asterisks, bullet points, or code blocks). Write in plain, readable text only.
    Keep your answers concise and focused on key ideas.
    When relevant, apply design thinking principles such as empathy, defining the problem, ideation, prototyping, and testing.
    If you do not know the answer, say so clearly and do not try to make one up.
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
@app.get("/", summary="Root endpoint to check server status")
def read_root():
    """Check if the server is running."""
    return {"status": "LLM server is running"}

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

# --- Static Files Mount (Moved to the end) ---
# This must be the last route added so it doesn't override API endpoints.
# Path for Docker environment
dist_path_docker = os.path.join(os.path.dirname(__file__), 'dist')

# Path for local development environment
dist_path_local = os.path.join(os.path.dirname(__file__), '..', '..', 'client', 'dist')

# Determine which path exists
if os.path.exists(dist_path_docker):
    static_dir = dist_path_docker
elif os.path.exists(dist_path_local):
    static_dir = dist_path_local
else:
    static_dir = None

if static_dir:
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
