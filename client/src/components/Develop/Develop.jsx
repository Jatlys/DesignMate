import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X, Bot } from 'lucide-react';
import GeneralChatbot from '../GeneralChatbot';

const Develop = () => {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);

  const handleNext = () => {
    navigate('/develop/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 pt-20 pb-20 overflow-hidden">
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-md mx-auto">
        <button onClick={() => navigate('/')} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <X className="w-10 h-10 text-gray-800" />
        </button>
        <button onClick={() => setShowChatbot(true)} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <Bot className="w-10 h-10 text-gray-800" />
        </button>
      </header>

      <main className="flex flex-col items-center justify-center text-center w-full max-w-sm flex-grow">
        <img src="/assets/DevelopStart.svg" alt="Illustration for the Develop Phase" className="w-48 h-48 mb-8" />
        <h1 className="text-4xl font-serif text-black">Welcome to the</h1>
        <h1 className="text-4xl font-serif text-black mb-4">Develop Phase.</h1>
        <p className="text-lg text-gray-600 max-w-md">
          Modelling, ideating and refining concepts based on opportunities and insights identified in earlier phases.
        </p>
      </main>

      <footer className="absolute bottom-8 right-8">
        <button 
          onClick={handleNext} 
          className="text-black hover:text-gray-700 transition-colors"
        >
          <ArrowRight size={40} />
        </button>
      </footer>

      {showChatbot && <GeneralChatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
};

export default Develop;
