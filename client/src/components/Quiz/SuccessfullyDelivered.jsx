import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import QuizChatbot from './QuizChatbot';

const SuccessfullyDelivered = () => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleNext = () => {
    navigate('/quiz/questions');
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Header */}
      <header className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <button onClick={() => navigate('/')} className="p-2">
          <img src="/assets/Home.svg" alt="Home" className="w-8 h-8" />
        </button>
        <button onClick={toggleChatbot} className="p-2">
          <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-10 h-10" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center w-full max-w-sm">
        <h1 className="text-3xl sm:text-4xl font-serif text-black">Successfully</h1>
        <h1 className="text-3xl sm:text-4xl font-serif text-black mb-4">Delivered!</h1>
        <img src="/assets/SuccessfullyDelivered.svg" alt="Successfully Delivered" className="my-6 w-48 h-48 sm:w-56 sm:h-56" />
        <p className="text-md sm:text-lg text-gray-600">
          Congratulations! You completed your product! Be proud of it!
        </p>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 left-4 right-4 flex items-center justify-end max-w-sm mx-auto">
        <button 
          onClick={handleNext} 
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-105"
        >
          <ArrowRight size={24} />
        </button>
      </footer>

      {isChatbotOpen && <QuizChatbot onClose={toggleChatbot} />}
    </div>
  );
};

export default SuccessfullyDelivered;
