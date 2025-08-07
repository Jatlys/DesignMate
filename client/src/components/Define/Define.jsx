import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Bot, ArrowRight } from 'lucide-react';
import DefineChatbot from './DefineChatbot';

const Define = () => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleNext = () => {
    navigate('/define/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-md mx-auto">
        <button onClick={() => navigate('/')} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <X className="w-10 h-10 text-gray-800" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <Bot className="w-10 h-10 text-gray-800" />
        </button>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-4">
        <img src="/assets/DefineStart.svg" alt="Illustration for the Define Phase" className="w-48 h-48 mb-8" />
        <h1 className="text-4xl font-serif text-black">Define Phase</h1>
        <p className="text-gray-600 max-w-xs mt-2">
          Interpret and reframe needs and map them into activities, functions and representations.
        </p>
      </main>

      <footer className="absolute bottom-8 right-8">
        <button 
          onClick={handleNext} 
          className="bg-black text-white rounded-full p-4 hover:bg-gray-800 transition-colors"
        >
          <ArrowRight className="w-8 h-8" />
        </button>
      </footer>

      {isChatbotOpen && <DefineChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
};

export default Define;
