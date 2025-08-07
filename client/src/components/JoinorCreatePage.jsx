import React from 'react';
import { User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JoinorCreatePage = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate('/join-team');
  };

  const handleCreate = () => {
    navigate('/create-team');
  };

  const handleSkip = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSubmit = () => {
    console.log('Submit clicked');
    // Navigate to the main dashboard or home page
    // navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Header Button */}
      <button 
        onClick={handleProfileClick} 
        className="absolute top-4 right-4 p-2"
      >
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </div>
      </button>

      {/* Main Content */}
      <div className="w-full max-w-sm flex flex-col items-center justify-center text-center px-4">
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-2 mb-8">
          <div className="h-1 bg-black flex-1"></div>
          <div className="h-1 bg-black flex-1"></div>
          <div className="h-1 bg-black flex-1"></div>
          <div className="h-1 bg-black flex-1"></div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif text-black mb-8">JOIN TEAM</h2>
        
        <div className="w-full">
          <button
            onClick={handleJoin}
            className="font-semibold py-3 px-6 rounded-full w-full mb-4 bg-gray-200 text-black"
          >
            JOIN
          </button>
          <button
            onClick={handleCreate}
            className="font-semibold py-3 px-6 rounded-full w-full mb-4 bg-gray-200 text-black"
          >
            CREATE
          </button>
        </div>
      </div>

      {/* Footer Buttons */}
      <button
        onClick={handleSkip}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 font-semibold py-2 px-8 rounded-full bg-gray-200 text-black"
      >
        SKIP
      </button>
      <button 
        onClick={handleSubmit}
        className="absolute bottom-4 right-4 p-2"
      >
        <ArrowRight className="w-8 h-8 text-black" />
      </button>
    </div>
  );
};

export default JoinorCreatePage;
