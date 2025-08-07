import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Develop = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/develop/dashboard'); // Navigate to the main develop page
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 max-w-sm mx-auto">


      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <img src="/assets/DevelopStart.svg" alt="Illustration for the Develop Phase" className="w-48 h-48 mb-8" />
        <h1 className="text-4xl font-serif text-black">Welcome to the</h1>
        <h1 className="text-4xl font-serif text-black mb-4">Develop Phase.</h1>
        <p className="text-gray-600">
          Phase which is about modelling, ideating and refining concepts based on opportunities and insights identified in earlier phases. Encourages the team to be creative and show what they really are passionate about the solution and see what they want to come to life.
        </p>
      </main>

      <footer className="w-full flex justify-between items-center p-4">
        <button onClick={() => navigate('/')} className="p-2">
          <ArrowLeft className="w-8 h-8 text-black" />
        </button>
        <button onClick={handleNext} className="p-2">
          <ArrowRight className="w-8 h-8 text-black" />
        </button>
      </footer>
    </div>
  );
};

export default Develop;
