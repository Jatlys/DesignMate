import React from 'react';
import { X, Send } from 'lucide-react';

const Chatbot = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm relative">
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
        <div className="space-y-3 mb-4">
          <div className="bg-gray-100 p-3 rounded-lg self-start max-w-xs">
            <p className="text-sm">Hi! I'm here to guide your team through the design innovation process.</p>
          </div>
          <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded-lg self-start max-w-xs">
            <p className="font-bold text-sm">Current Phase: Discover</p>
            <p className="text-sm">Focus on understanding your target demographic and empathise with their needs, actions, reactions and emotions.</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg self-start max-w-xs">
            <p className="text-sm"><span className="font-bold">Pro Tip:</span> Don't XXX YYY</p>
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center border rounded-full p-2">
          <input 
            type="text" 
            placeholder="Ask me anything" 
            className="flex-grow bg-transparent focus:outline-none px-2"
          />
          <button className="text-gray-500">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
