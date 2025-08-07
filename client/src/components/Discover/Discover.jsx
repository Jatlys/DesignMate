import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Discover = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/discover/dashboard'); // Navigate to the main discover page
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Back Arrow */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-4 left-4 p-2"
      >
        <ArrowLeft className="w-8 h-8 text-black" />
      </button>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-4">
        <img 
          src="/assets/DIscoverPage.svg" 
          alt="Illustration for the Discover Phase" 
          className="w-32 h-32 sm:w-48 sm:h-48 mb-8"
        />
        <h1 className="text-3xl sm:text-4xl font-serif text-black">Welcome to the</h1>
        <h1 className="text-3xl sm:text-4xl font-serif text-black mb-4">Discover Phase.</h1>
        <p className="text-gray-600 max-w-md">
          Work together with stakeholders to explore and gain insight into opportunities and needs through co-creation
        </p>
      </main>

      {/* Next Arrow */}
      <button 
        onClick={handleNext} 
        className="absolute bottom-4 right-4 p-2"
      >
        <ArrowRight className="w-8 h-8 text-black" />
      </button>
    </div>
  );
};

export default Discover;
