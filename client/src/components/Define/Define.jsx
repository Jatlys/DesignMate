import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Define = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/define/dashboard'); // Navigate to the main define page
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 max-w-sm mx-auto">
      <header className="w-full flex justify-start">
        <button onClick={() => navigate('/')} className="p-2">
          <ArrowLeft className="w-8 h-8 text-black" />
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <img src="/assets/DefineStart.svg" alt="Illustration for the Define Phase" className="w-48 h-48 mb-8" />
        <h1 className="text-4xl font-serif text-black">Welcome to the</h1>
        <h1 className="text-4xl font-serif text-black mb-4">Define Phase.</h1>
        <p className="text-gray-600">
          Interpret and reframe needs and map them into activities, functions and representations
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

export default Define;
