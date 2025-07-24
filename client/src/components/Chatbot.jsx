import React from 'react';
import { X, Send } from 'lucide-react';

const Chatbot = ({ onClose, initialMessages, phase }) => {
  const [messages, setMessages] = React.useState(initialMessages || []);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm relative flex flex-col h-4/5">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        {/* Header */}
        <div className="flex items-center mb-4">
          <img src="/assets/Chatbot.svg" alt="AI Mentor" className="w-8 h-8 mr-3" />
          <h2 className="text-2xl font-bold">AI Mentor</h2>
        </div>
        <hr className="mb-4" />

        {/* Messages */}
        <div className="flex-grow flex flex-col space-y-3 mb-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === 'user' ? 'bg-blue-100 self-end' :
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
            type="text"
            placeholder="Ask me anything"
            className="flex-grow bg-transparent focus:outline-none px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button className="text-gray-500" onClick={handleSend} disabled={isLoading}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
