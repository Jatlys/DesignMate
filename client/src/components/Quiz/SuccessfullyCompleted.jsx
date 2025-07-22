import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SuccessfullyCompleted = () => {
    const navigate = useNavigate();
  
    const toggleChatbot = () => {
      setShowChatbot(!showChatbot);
    };
  
    const handleNext = () => {
      navigate('/');
    };
  
  
    return (
      <div className="min-h-screen bg-white flex flex-col p-4 max-w-sm mx-auto">
        <header className="w-full flex justify-start">
          <button onClick={() => navigate('/')} className="p-2">
            <ArrowLeft className="w-8 h-8 text-black" />
          </button>
        </header>
  
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-serif text-black">Quiz</h1>
          <h1 className="text-4xl font-serif text-black mb-4">Completed!</h1>
          <img src="/assets/SuccessfullyDelivered.svg" alt="Successfully Delivered" className="w-48 h-48 mb-8" />
          <p className="text-gray-600">
            Great job on finishing your design journey! 
          </p>
        </main>
  
        <div className="p-6">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg text-lg hover:bg-green-700 transition-colors"
          >
           Go back to Home
          </button>
        </div>
      </div>
      
      
    );
  };

export default SuccessfullyCompleted;
