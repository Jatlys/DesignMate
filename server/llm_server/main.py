from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

# --- App Setup ---
app = FastAPI(
    title="DesignMate LLM Server",
    description="Handles LLM and RAG operations for the DesignMate application.",
    version="0.1.0",
)

# --- CORS Configuration ---
# This allows the frontend (running on a different port) to communicate with this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if your React app runs on a different port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Knowledge Base Configuration ---
# Create directories to store knowledge base documents for each chatbot
KB_BASE_PATH = "knowledge_bases"
DISCOVER_KB_PATH = os.path.join(KB_BASE_PATH, "discover")   # this does not exist yet and is a placeholder
DEFINE_KB_PATH = os.path.join(KB_BASE_PATH, "define")
DELIVER_KB_PATH = os.path.join(KB_BASE_PATH, "deliver")
DEVELOP_KB_PATH = os.path.join(KB_BASE_PATH, "develop")


# Create directories on startup
os.makedirs(DISCOVER_KB_PATH, exist_ok=True)
os.makedirs(DEFINE_KB_PATH, exist_ok=True)
os.makedirs(DELIVER_KB_PATH, exist_ok=True)
os.makedirs(DEVELOP_KB_PATH, exist_ok=True)

# --- API Endpoints ---
@app.get("/", summary="Root endpoint to check server status")
def read_root():
    """Check if the server is running."""
    return {"status": "LLM server is running"}

# --- Placeholder Chatbot Endpoints ---
@app.post("/api/discover/chat", summary="Chat with the 'Discover' chatbot")
async def discover_chat(query: str = Form(...)):
    """Placeholder for the 'Discover' chatbot RAG pipeline."""
    # TODO: Implement RAG logic for the 'Discover' model
    return {"sender": "bot", "message": f"Discover bot received: {query}"}

@app.post("/api/define/chat", summary="Chat with the 'Define' chatbot")
async def define_chat(query: str = Form(...)):
    """Placeholder for the 'Define' chatbot RAG pipeline."""
    # TODO: Implement RAG logic for the 'Define' model
    return {"sender": "bot", "message": f"Define bot received: {query}"}

@app.post("/api/deliver/chat", summary="Chat with the 'Deliver' chatbot")
async def deliver_chat(query: str = Form(...)):
    """Placeholder for the 'Deliver' chatbot RAG pipeline."""
    # TODO: Implement RAG logic for the 'Deliver' model
    return {"sender": "bot", "message": f"Deliver bot received: {query}"}

@app.post("/api/develop/chat", summary="Chat with the 'Develop' chatbot")
async def develop_chat(query: str = Form(...)):
    """Placeholder for the 'Develop' chatbot RAG pipeline."""
    # TODO: Implement RAG logic for the 'Develop' model
    return {"sender": "bot", "message": f"Develop bot received: {query}"}


# --- Placeholder Knowledge Base Upload Endpoints ---
@app.post("/api/discover/upload", summary="Upload a document to the 'Discover' knowledge base")
async def discover_upload(file: UploadFile = File(...)):
    """Saves an uploaded file to the 'Discover' knowledge base directory."""
    file_path = os.path.join(DISCOVER_KB_PATH, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

@app.post("/api/define/upload", summary="Upload a document to the 'Define' knowledge base")
async def define_upload(file: UploadFile = File(...)):
    """Saves an uploaded file to the 'Define' knowledge base directory."""
    file_path = os.path.join(DEFINE_KB_PATH, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # TODO: Add document processing and vectorization logic here
    return {"filename": file.filename, "status": "Uploaded to Define KB"}

@app.post("/api/deliver/upload", summary="Upload a document to the 'Deliver' knowledge base")
async def deliver_upload(file: UploadFile = File(...)):
    """Saves an uploaded file to the 'Deliver' knowledge base directory."""
    file_path = os.path.join(DELIVER_KB_PATH, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # TODO: Add document processing and vectorization logic here
    return {"filename": file.filename, "status": "Uploaded to Deliver KB"}

@app.post("/api/develop/upload", summary="Upload a document to the 'Develop' knowledge base")
async def develop_upload(file: UploadFile = File(...)):
    """Saves an uploaded file to the 'Develop' knowledge base directory."""
    file_path = os.path.join(DEVELOP_KB_PATH, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # TODO: Add document processing and vectorization logic here
    return {"filename": file.filename, "status": "Uploaded to Develop KB"}

