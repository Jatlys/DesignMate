const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Chatbot Proxy Logic ---
// This function forwards requests to your Python LLM server.
const handleChatRequest = async (req, res) => {
  const { phase } = req.params;
  const { query } = req.body; // The user's message
  const llmServerUrl = process.env.LLM_SERVER_URL || 'http://127.0.0.1:8000'; // URL of your Python server

  console.log(`Forwarding request for phase '${phase}' to LLM server...`);

  try {
    // Use a FormData object to match the Python server's expectation
    const formData = new FormData();
    formData.append('query', query);

    const response = await fetch(`${llmServerUrl}/api/${phase}/chat`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`LLM server returned an error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data); // Send the LLM's response back to the frontend

  } catch (error) {
    console.error('Error forwarding request to LLM server:', error);
    res.status(500).json({ message: 'Failed to connect to the AI service.' });
  }
};

app.post('/api/:phase/chat', handleChatRequest);

// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connected successfully!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});