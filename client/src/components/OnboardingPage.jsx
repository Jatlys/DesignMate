import React from 'react';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const navigate = useNavigate();

  const handleBeginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto rounded-lg">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="text-center mb-12">
          <h1 className="text-lg text-gray-700 mb-2">Welcome to</h1>
          <h2 className="text-2xl font-bold text-black">DESIGNmA+E</h2>
        </div>

        {/* Begin Button */}
        <button
          onClick={handleBeginClick}
          className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-3 px-12 rounded-full transition-colors duration-200"
        >
          BEGIN
        </button>
      </div>
    </div>
  );
};

export default LandingPage;