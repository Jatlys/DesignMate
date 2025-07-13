import React from 'react';
import { Code, User } from 'lucide-react';

const LandingPage = () => {
  const handleBeginClick = () => {
    // Handle navigation to next page
    console.log('Begin button clicked');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto border-2 border-blue-400 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-medium">User Startup</span>
        </div>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </div>
      </div>

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