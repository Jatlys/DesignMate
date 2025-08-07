import React from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IceBreakerComplete = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/'); // Go to homepage
  };

  const handleStartProject = () => {
    // Navigate to next phase - you can change this to wherever you want to go next
    navigate('/problem-identification'); // or '/dashboard' or wherever
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center p-4 pt-20 pb-20 overflow-hidden">
      {/* Header */}
      <header className="absolute top-4 left-4 right-4 flex items-center justify-start z-10">
        <button onClick={handleBack} className="p-2">
          <X className="w-8 h-8 text-black" />
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-sm h-full flex flex-col items-center justify-between">
        {/* Progress bar */}
        <div className="w-full px-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="h-1 bg-black w-1/4 rounded-full"></div>
            <div className="h-1 bg-black w-1/4 rounded-full"></div>
            <div className="h-1 bg-black w-1/4 rounded-full"></div>
            <div className="h-1 bg-black w-1/4 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center flex-grow">
          <h1 className="text-3xl font-serif text-black mb-8 leading-tight">
            ALL THE BEST FOR<br/>
            YOUR PROJECT!
          </h1>
          
          <div className="w-64 h-64 mb-8 flex items-center justify-center">
            <img 
              src="/assets/rocket.svg" 
              alt="Rocket illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 left-4 right-4 flex justify-end max-w-sm mx-auto">
        <button 
          onClick={handleStartProject} 
          className="flex items-center gap-4 p-2 group"
        >
          <span className="text-black font-semibold font-serif group-hover:text-blue-600 transition-colors">
            START PROJECT
          </span>
          <div className="bg-blue-500 text-white rounded-full p-2 group-hover:bg-blue-600 transition-colors">
            <ArrowRight className="w-6 h-6" />
          </div>
        </button>
      </footer>
    </div>
  );
};

export default IceBreakerComplete;