# DesignMa+e

A mobile-first web application to facilitate the design thinking and problem solving process.

DesignMa+e is a web application that helps users to create and manage their projects, with an AI enabled tool to help break down the problem, assist in time management, provide useful tools and resources, and provide feedback on the progress of the project.

We aim to assist beginners and professionals alike in their design thinking journey through providing a user-friendly interface and AI-powered tools to assist them in their brainstorming, pushing them to think outside the box, and helping them to create innovative solutions.

## 🚀 Features

- **Mobile-First Design:** Optimized for a seamless experience on mobile devices.
- **User Onboarding:** A smooth and intuitive onboarding process for new users.
- **Responsive UI:** A fully responsive interface that works on all device sizes.
- **AI-Powered Chatbots:** Integrated LLMs to assist with the design process.
- **Progress Tracking:** Track the progress of your projects and receive feedback.
- **Resource Library:** Access to a library of useful tools and resources.
- **Time Management:** AI assisted time allocation on each phase of the design process.
- **Icebreakers:** Icebreakers to help you connect with new teammates.

## 🛠️ Tech Stack

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool and development server.
- **Tailwind CSS:** A utility-first CSS framework for rapid styling.
- **React Router:** For client-side routing.
- **Lucide React:** A library of beautiful and consistent icons.

### Backend

- **Node.js:** A JavaScript runtime for the main backend server.
- **Express.js:** A web application framework for Node.js.
- **Python:** Powers the LLM server.
- **FastAPI:** A modern, fast web framework for building APIs with Python.



## 📁 Project Structure

```
designmate/
├── client/           # React frontend
│   ├── src/
│   │   ├── assets/       # Static assets like images and fonts
│   │   ├── components/   # Reusable React components
│   │   ├── App.jsx       # Main application component
│   │   ├── main.jsx      # Application entry point
│   │   └── firebase.js   # Firebase configuration
│   ├── index.html      # Main HTML file
│   └── vite.config.js  # Vite configuration
├── server/           # Backend services
│   ├── llm_server/     # Python-based LLM server
│   │   ├── main.py     # FastAPI application
│   │   └── ...
│   └── server.js       # Node.js backend server
├── Dockerfile        # Docker configuration
├── cloudbuild.yaml   # Google Cloud Build configuration
└── README.md         # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **Ollama:** For running local LLMs. Download it from the [official website](https://ollama.com/).

### 1. Clone the Repository

```bash
git clone https://github.com/Jatlys/DesignMate.git
cd DesignMate
```

### 2. Setup the Backend

#### Node.js Server

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create an environment file
cp .env.example .env
```

Update the `.env` file with your environment variables.

#### Python LLM Server

1.  **Install Ollama and Models:**
    -   Install Ollama from the [official website](https://ollama.com/) and ensure it's running.
    -   Pull the required models:
        ```bash
        ollama pull llama2
        ollama pull nomic-embed-text
        ```

2.  **Setup Python Environment:**

    ```bash
    # Navigate to the LLM server directory
    cd server/llm_server

    # Create and activate a virtual environment
    python -m venv venv
    # On Windows: .\venv\Scripts\activate
    # On macOS/Linux: source venv/bin/activate

    # Install dependencies
    pip install -r requirements.txt
    ```

### 3. Setup the Frontend

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install
```

## 🚦 Running the Application

1.  **Start the LLM Server:**

    ```bash
    # In server/llm_server directory
    uvicorn main:app --host 0.0.0.0 --port 8000
    ```

2.  **Start the Node.js Server:**

    ```bash
    # In server directory
    npm run dev
    ```

3.  **Start the Frontend Development Server:**

    ```bash
    # In client directory
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## 🛣️ API Endpoints

### Node.js Server (Base URL: `http://localhost:5000`)

-   `GET /`: Server status.
-   `GET /api/test`: Test the backend connection.
-   `GET /api/health`: Health check.

### Python LLM Server (Base URL: `http://localhost:8000`)

-   `POST /api/general/upload`: Upload a PDF to the Define chatbot's knowledge base.


## 🚀 Deployment

The project is configured for deployment using Docker and Google Cloud Build. Refer to the `Dockerfile` and `cloudbuild.yaml` for more details.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature-name`).
3.  Commit your changes (`git commit -m 'Add feature'`).
4.  Push to the branch (`git push origin feature-name`).
5.  Submit a pull request.

## 🐛 Troubleshooting

-   **Tailwind CSS styles not applying:** Ensure the `@tailwind` directives are in `index.css` and that Tailwind is correctly installed.
-   **Firebase errors:** Double-check your Firebase configuration in `firebase.js` and ensure the required services are enabled in the Firebase console.
-   **CORS errors:** Make sure the server's CORS policy is configured to allow requests from the frontend's URL.

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
