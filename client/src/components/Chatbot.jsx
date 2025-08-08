import React from 'react';
import { X, Send, Paperclip } from 'lucide-react';

const Chatbot = ({ onClose, initialMessages, phase }) => {
    const storageKey = `chat_messages_${phase}`;

  const [messages, setMessages] = React.useState(() => {
    try {
      const savedMessages = localStorage.getItem(storageKey);
      // If we have saved messages and they are not empty, use them.
      // Otherwise, fall back to initialMessages.
      if (savedMessages && JSON.parse(savedMessages).length > 0) {
        return JSON.parse(savedMessages);
      }
    } catch (error) {
      console.error("Could not parse messages from local storage", error);
    }
    return initialMessages || [];
  });
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const inputRef = React.useRef(null);
  const fileInputRef = React.useRef(null);

  // Save messages to local storage whenever they change
  React.useEffect(() => {
    try {
      // Don't save the initial placeholder messages if the conversation hasn't started
      if (messages.length > (initialMessages?.length || 0)) {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      }
    } catch (error) {
      console.error("Failed to save messages to local storage", error);
    }
  }, [messages, storageKey, initialMessages]);

  React.useEffect(() => {
    // Save messages to localStorage whenever they change.
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [messages, storageKey]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append('query', input);

        console.log('Current phase:', phase); // Add this line to check the phase
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${phase}/chat`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setMessages((prevMessages) => [...prevMessages, { text: data.message, sender: 'bot' }]);
        } else {
          console.error('Failed to get response from the bot');
          setMessages((prevMessages) => [...prevMessages, { text: 'Sorry, I encountered an error.', sender: 'bot' }]);
        }
      } catch (error) {
        console.error('Error communicating with the bot:', error);
        setMessages((prevMessages) => [...prevMessages, { text: 'Sorry, I couldn\'t connect to the server.', sender: 'bot' }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setMessages((prevMessages) => [...prevMessages, { text: `Uploading ${file.name}...`, sender: 'system' }]);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${phase}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [...prevMessages, { text: `${data.filename} uploaded successfully. You can now ask questions about it.`, sender: 'system' }]);
      } else {
        setMessages((prevMessages) => [...prevMessages, { text: 'File upload failed.', sender: 'system' }]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessages((prevMessages) => [...prevMessages, { text: 'Error connecting to the server for file upload.', sender: 'system' }]);
    } finally {
      setIsUploading(false);
      // Clear the file input so the same file can be uploaded again
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm relative flex flex-col h-4/5">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        {/* Header */}
        <div className="flex items-center mb-4">
          <img src="/assets/Chatbot.svg" alt="AI Mentor" className="w-10 h-10 mr-3" />
          <h2 className="text-2xl font-bold">AI Mentor</h2>
        </div>
        <hr className="mb-4" />

        {/* Messages */}
        <div className="flex-grow space-y-3 mb-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === 'user' ? 'bg-blue-100 self-end' :
                msg.sender === 'system' ? 'bg-gray-200 text-gray-600 text-xs mx-auto text-center' :
                msg.sender === 'ai-phase' ? 'bg-red-100 border-l-4 border-red-500' :
                msg.sender === 'ai-tip' ? 'bg-yellow-100' :
                'bg-gray-100 self-start'
              }`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          ))}
          {isLoading && (
            <div
              className={`p-3 rounded-lg max-w-xs bg-gray-100 self-start`}
            >
              <p className="text-sm animate-pulse">Bot is typing...</p>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center border rounded-full p-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf"
            disabled={isLoading || isUploading}
          />
          <button className="text-gray-500 p-2 hover:bg-gray-100 rounded-full" onClick={() => fileInputRef.current.click()} disabled={isLoading || isUploading}>
            <Paperclip size={20} />
          </button>
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask me anything"
            className="flex-grow bg-transparent focus:outline-none px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading || isUploading}
          />
          <button className="text-gray-500 p-2 hover:bg-gray-100 rounded-full" onClick={handleSend} disabled={isLoading || isUploading}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
