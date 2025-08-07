import React from 'react';
import { User, ArrowLeft, ArrowRight, Upload, Copy } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const TeamCreatedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teamCode } = useParams();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleShare = () => {
    console.log('Share clicked');
    // Future share logic here
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(teamCode);
    alert('Team code copied to clipboard!');
  };

    const handleSubmit = () => {
    // Get the iceBreaker state from the previous page (CreateTeamPage)
    const { iceBreaker } = location.state || { iceBreaker: false };
    // Navigate to the joined team page, passing the iceBreaker state along.
    // This assumes the route is '/joined-team/:teamCode'.
    navigate(`/joined-team/${teamCode}`, { state: { iceBreaker } });
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Header Buttons */}
      <button 
        onClick={handleBackClick}
        className="absolute top-4 left-4 p-2"
      >
        <ArrowLeft className="w-8 h-8 text-black" />
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
        <h2 className="text-3xl sm:text-4xl font-serif text-black mb-8">TEAM CODE</h2>
        
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 bg-gray-200 flex items-center justify-center mb-6">
          <span className="text-gray-500">placeholder for qr code</span>
          <button onClick={handleShare} className="absolute bottom-2 left-2 p-1">
            <Upload className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-full w-full flex items-center justify-between">
          <span>{teamCode}</span>
          <button onClick={handleCopy}>
            <Copy className="w-5 h-5 text-black" />
          </button>
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

export default TeamCreatedPage;
