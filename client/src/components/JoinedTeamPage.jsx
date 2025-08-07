import React from 'react';

import { User, X, ArrowRight } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const JoinedTeamPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teamCode } = useParams();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleClose = () => {
    navigate('/joinorcreate-team'); // Or to the main dashboard
  };

            const handleSubmit = () => {
    // Access the iceBreaker state passed from the previous page.
    const { iceBreaker } = location.state || { iceBreaker: false };

    if (iceBreaker) {
      navigate(`/icebreaker/${teamCode}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Header Buttons */}
      <button 
        onClick={handleClose}
        className="absolute top-4 left-4 p-2"
      >
        <X className="w-8 h-8 text-black" />
      </button>
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
        <h2 className="text-3xl sm:text-4xl font-serif text-black mb-6">You have joined the team!</h2>
        
        <div className="bg-gray-200 text-black font-semibold py-3 px-8 rounded-full mb-8">
          {teamCode}
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold text-black mb-4">Participants</h3>
        <div className="w-full max-w-xs">
          <div className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full mb-2">You</div>
          <div className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-full mb-2">Ali</div>
          <div className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-full">Jim</div>
        </div>
      </div>

      {/* Footer Button */}
      <button 
        onClick={handleSubmit}
        className="absolute bottom-4 right-4 p-2"
      >
        <ArrowRight className="w-8 h-8 text-black" />
      </button>
    </div>
  );
};

export default JoinedTeamPage;
