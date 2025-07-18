import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Define = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/define/dashboard'); // Navigate to the main define page
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-8 max-w-sm mx-auto">
      <div className="flex-grow flex flex-col items-center justify-center">
        <img src="/assets/DefineStart.svg" alt="Illustration for the Define Phase" className="w-48 h-48 mb-8" />
        <h1 className="text-4xl font-serif text-black">Welcome to the</h1>
        <h1 className="text-4xl font-serif text-black mb-4">Define Phase.</h1>
        <p className="text-gray-600">
          Interpret and reframe needs and map them into activities, functions and representations
        </p>
      </div>
      <div className="w-full flex justify-end p-4">
        <button onClick={handleNext}>
          <ArrowRight className="w-8 h-8 text-black" />
        </button>
      </div>
    </div>
  );
};

export default Define;
