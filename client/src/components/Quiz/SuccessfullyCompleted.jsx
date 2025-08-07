import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Home, Bot } from 'lucide-react';
import QuizChatbot from './QuizChatbot';

const SuccessfullyCompleted = () => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleNext = () => {
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 pt-20 pb-20 overflow-hidden">
      {/* Header */}
      <header className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 max-w-sm mx-auto">
        <button onClick={() => navigate('/')} className="p-2">
          <Home className="w-8 h-8 text-gray-700" />
        </button>
        <button onClick={toggleChatbot} className="p-2">
          <Bot className="w-8 h-8 text-gray-700" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center w-full max-w-sm flex-grow">
        <h1 className="text-3xl font-serif text-gray-800 mb-4">QUIZ COMPLETED!</h1>
        <img src="/assets/SuccessfullyCompleted.svg" alt="Quiz Completed" className="my-6 w-48 h-48 sm:w-56 sm:h-56" />
        <p className="text-lg text-gray-600">
          Great job on finishing your design journey!
        </p>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 right-4">
        <button 
          onClick={handleNext} 
          className="bg-black hover:bg-gray-800 text-white rounded-full p-4 shadow-lg transition-colors"
        >
          <ArrowRight size={24} />
        </button>
      </footer>

      {isChatbotOpen && <QuizChatbot onClose={toggleChatbot} />}
    </div>
  );
};

export default SuccessfullyCompleted;
