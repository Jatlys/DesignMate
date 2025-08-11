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
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto rounded-lg relative">
      {/* Header - X button */}
      <div className="w-full flex justify-start items-center px-4 pt-8 pb-4">
        <button onClick={handleBack} className="">
          <X className="w-8 h-8 text-black" />
        </button>
      </div>

      {/* Progress bar - all steps completed */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2">
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-black w-1/4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h1 className="text-3xl font-serif text-black mb-16 leading-tight">
          ALL THE BEST FOR<br/>
          YOUR PROJECT!
        </h1>
        
        {/* Rocket illustration */}
        <div className="w-64 h-64 mb-16 flex items-center justify-center">
          <img 
            src="/assets/rocket.svg" 
            alt="Rocket illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Footer with START PROJECT button */}
      <div className="flex justify-end items-center p-4">
        <div className="flex items-center gap-4">
          <span className="text-black font-semibold font-serif">
            START PROJECT
          </span>
          <button onClick={handleStartProject}>
            <ArrowRight className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IceBreakerComplete;