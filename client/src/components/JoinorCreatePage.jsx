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
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto rounded-lg relative">
      {/* Header */}
      <div className="absolute top-0 right-0 p-4 mt-[33px]">
        <button onClick={handleProfileClick} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="flex items-center justify-between p-4 bg-white mt-[94px]">
        <div className="flex items-center gap-2 flex-grow">
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-black w-1/4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-3xl font-serif text-black mb-8">JOIN TEAM</h2>
        
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

      {/* Footer */}
      <div className="flex items-center justify-between p-4">
        <div className="w-6 h-6"></div> {/* Spacer */}
        <button
          onClick={handleSkip}
          className="font-semibold py-2 px-8 rounded-full bg-gray-200 text-black"
        >
          SKIP
        </button>
        <button onClick={handleSubmit}>
          <ArrowRight className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
};

export default JoinorCreatePage;
