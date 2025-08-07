import React from 'react';
import { useNavigate } from 'react-router-dom';


const OnboardingPage = () => {
  const navigate = useNavigate();

  const handleBeginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-xl sm:text-2xl text-gray-700 mb-2">Welcome to</h1>
        <h2 className="text-3xl sm:text-4xl font-bold text-black">DESIGNmA+E</h2>
      </div>
      <button
        onClick={handleBeginClick}
        className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-3 px-12 rounded-full transition-colors duration-200"
      >
        BEGIN
      </button>
    </div>
  );
};

export default OnboardingPage;