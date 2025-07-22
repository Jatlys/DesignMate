import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SuccessfullyDelivered = () => {
  const navigate = useNavigate();

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleNext = () => {
    navigate('/quiz/questions');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 max-w-sm mx-auto">
      <header className="w-full flex justify-start">
        <button onClick={() => navigate('/')} className="p-2">
          <ArrowLeft className="w-8 h-8 text-black" />
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-serif text-black">Successfully</h1>
        <h1 className="text-4xl font-serif text-black mb-4">Delivered!</h1>
        <img src="/assets/SuccessfullyDelivered.svg" alt="Successfully Delivered" className="w-48 h-48 mb-8" />
        <p className="text-gray-600">
          Congratulations! You completed your product! Be proud of it!
        </p>
      </main>

      <footer className="w-full flex justify-end p-4">
        <button onClick={handleNext} className="p-2">
          <ArrowRight className="w-8 h-8 text-black" />
        </button>
      </footer>
    </div>
    
    
  );
};

export default SuccessfullyDelivered;
