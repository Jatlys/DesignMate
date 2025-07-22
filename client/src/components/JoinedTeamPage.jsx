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
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto rounded-lg relative">
      {/* Header */}
      <div className="absolute top-0 left-0 p-4 mt-[33px]">
        <button onClick={handleClose}>
          <X className="w-6 h-6 text-black" />
        </button>
      </div>
      <div className="absolute top-0 right-0 p-4 mt-[33px]">
        <button onClick={handleProfileClick} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-3xl font-serif text-black mb-6">You have joined the team!</h2>
        
        <div className="bg-gray-200 text-black font-semibold py-3 px-8 rounded-full mb-8">
          {teamCode}
        </div>

        <h3 className="text-xl font-semibold text-black mb-4">Participants</h3>
        <div className="w-full max-w-xs">
          <div className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full mb-2">You</div>
          <div className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-full mb-2">Ali</div>
          <div className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-full">Jim</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end p-4">
        <button onClick={handleSubmit}>
          <ArrowRight className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
};

export default JoinedTeamPage;
