# DesignMa+e

A mobile-first web application for user startup and design management, built as a prototype using modern web technologies.
🚀 Tech Stack
Frontend

React - UI library for building user interfaces
Vite - Fast build tool and development server
Tailwind CSS - Utility-first CSS framework for styling
React Router - Client-side routing
Lucide React - Beautiful icons

Backend

Node.js - JavaScript runtime
Express.js - Web application framework
CORS - Cross-origin resource sharing

Authentication & Database

Firebase Authentication - User login and registration
Firebase Firestore - NoSQL database for user data

📱 Features

Mobile-first design - Optimized for mobile devices
User onboarding - Smooth onboarding experience for new users
Firebase authentication - Secure user login and registration
Responsive UI - Works on all device sizes
Real-time data - Firebase integration for live updates

🛠️ Installation & Setup
Prerequisites

Node.js (v16 or higher)
Python (v3.8 or higher)
Ollama (for running local LLMs)

### 1. Frontend Setup

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server
npm start
```

### 2. Backend LLM & RAG Setup

These instructions are for the Python server that powers the chatbot's AI capabilities.

**A. Install Ollama and Models**

1.  **Install Ollama:** Download and install Ollama from the [official website](https://ollama.com/). After installation, ensure the Ollama application is running.
2.  **Pull Required Models:** Open a terminal and run the following commands to download the necessary LLM and embedding models:
    ```bash
    ollama pull llama2
    ollama pull nomic-embed-text
    ```

**B. Setup Python Environment**

```bash
# Navigate to the LLM server directory
cd server/llm_server

# (Recommended) Create and activate a virtual environment
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On macOS/Linux
# source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

**C. Start the LLM Server**

Once the environment is set up, start the FastAPI server:

```bash
# From the server/llm_server directory
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 3. Populating the RAG Knowledge Base

To give the chatbots knowledge, you need to upload PDF documents to their respective knowledge bases. This is done via a `curl` command.

1.  Open a new terminal.
2.  Navigate to the directory containing the PDF you want to upload.
3.  Run the appropriate `curl` command below, replacing `your-file.pdf` with your actual file name.

**Upload to Define Chatbot:**
```bash
cURL -X POST -F "file=@your-file.pdf" http://localhost:8000/api/define/upload
```

**Upload to Develop Chatbot:**
```bash
cURL -X POST -F "file=@your-file.pdf" http://localhost:8000/api/develop/upload
```

**Upload to Deliver Chatbot:**
```bash
cURL -X POST -F "file=@your-file.pdf" http://localhost:8000/api/deliver/upload
```

**Note on Data Transfer:** The uploaded documents and their processed vector data are stored in `server/llm_server/knowledge_bases` and `server/llm_server/vector_stores` respectively. To move your setup to another machine, simply copy these two folders to the same location in the new project directory.
npm or yarn
Firebase account

Clone the Repository
bashgit clone <your-repo-url>
cd designmate-app
Frontend Setup
bash# Navigate to client directory
cd client

# Install dependencies

npm install

# Start development server

npm run dev
Backend Setup
bash# Navigate to server directory
cd server

# Install dependencies

npm install

# Create environment file

cp .env.example .env

# Start development server

npm run dev
🔧 Configuration
Firebase Setup

Create a Firebase project at https://console.firebase.google.com/
Enable Authentication with Email/Password and Google providers
Enable Firestore Database
Copy your Firebase config to client/src/firebase.js

Environment Variables
Server (.env)
envPORT=5000
NODE_ENV=development
Client (optional .env)
envVITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
🚦 Running the Application
Development Mode

Start the backend server:
bashcd server
npm run dev
Server runs on http://localhost:5000
Start the frontend (in new terminal):
bashcd client
npm run dev
App runs on http://localhost:3000

Production Build
bashcd client
npm run build
📁 Project Structure
designmate-app/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # React components
│ │ │ └── OnboardingPage.jsx
│ │ ├── firebase.js # Firebase configuration
│ │ ├── App.jsx # Main app component
│ │ ├── index.css # Global styles
│ │ └── main.jsx # App entry point
│ ├── public/ # Static assets
│ ├── package.json # Frontend dependencies
│ └── vite.config.js # Vite configuration
├── server/ # Express backend
│ ├── routes/ # API routes
│ ├── middleware/ # Express middleware
│ ├── server.js # Main server file
│ ├── package.json # Backend dependencies
│ └── .env # Environment variables
└── README.md
🛣️ API Endpoints
Base URL: http://localhost:5000

GET / - Server status
GET /api/test - Backend connection test
GET /api/health - Health check

More endpoints will be added as features are developed
🎨 UI Components
Current Pages

OnboardingPage - Initial user onboarding experience

Planned Pages

Login/Signup forms
User dashboard
Profile management
Design tools interface

🧪 Testing
Frontend
bashcd client
npm run build # Test build process
npm run preview # Preview production build
Backend
bashcd server
curl http://localhost:5000/api/test # Test API endpoint
🚀 Deployment
Frontend (Vercel/Netlify)

Build the client: npm run build
Deploy the dist folder
Set environment variables in your hosting platform

Backend (Heroku/Railway)

Deploy the server folder
Set environment variables
Update CORS origin to your frontend URL

🤝 Contributing

Fork the repository
Create a feature branch: git checkout -b feature-name
Commit changes: git commit -m 'Add feature'
Push to branch: git push origin feature-name
Submit a pull request

📝 Development Notes
For Flask Developers

React components are like Flask templates
.jsx files contain both HTML-like markup and JavaScript logic
Tailwind classes replace traditional CSS
State management replaces server-side sessions

Mobile Development

Uses max-w-sm for mobile-first design
Responsive breakpoints with Tailwind
Touch-friendly button sizes and spacing

🐛 Troubleshooting
Common Issues
Tailwind styles not working:

Check that @tailwind directives are in index.css
Ensure Tailwind is installed: npm install -D tailwindcss

Firebase errors:

Verify Firebase config in firebase.js
Check that Authentication is enabled in Firebase Console

CORS errors:

Ensure server CORS is configured for frontend URL
Check that both servers are running

Import errors:

Verify file paths in import statements
Check that components are exported correctly
