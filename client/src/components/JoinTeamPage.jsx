import React, { useState } from 'react';
import { User, ArrowLeft, ArrowRight, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JoinTeamPage = () => {
  const [teamCode, setTeamCode] = useState('');
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleTeamCodeChange = (e) => {
    const { value } = e.target;
    // Allow only digits by replacing non-digit characters
    if (/^\d*$/.test(value)) {
      setTeamCode(value);
    }
  };

  const handleQrScan = () => {
    console.log('QR scan clicked');
    // Future QR scanning logic
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamCode.trim() !== '') {
      // Placeholder for team existence check
      const teamExists = true; // Assume team exists for now
      if (teamExists) {
        navigate(`/joined-team/${teamCode}`);
      } else {
        alert('Team not found!');
      }
    } else {
      alert('Please enter a team code.');
    }
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
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-serif text-black mb-8">TEAM CODE</h2>
        
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="KEY IN TEAM CODE"
          value={teamCode}
          onChange={handleTeamCodeChange}
          className="bg-gray-200 text-black placeholder-black font-semibold py-3 px-6 rounded-full w-full mb-6 text-center"
        />

        <button type="button" onClick={handleQrScan} className="mb-8">
          <QrCode className="w-10 h-10 text-gray-600" />
        </button>
      </form>

      {/* Footer Button */}
      <button 
        type="submit" 
        onClick={handleSubmit}
        className="absolute bottom-4 right-4 p-2"
      >
        <ArrowRight className="w-8 h-8 text-black" />
      </button>
    </div>
  );
};

export default JoinTeamPage;
