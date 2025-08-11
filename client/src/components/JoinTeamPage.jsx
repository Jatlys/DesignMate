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
        <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto rounded-lg relative">
      {/* Header */}
      <div className="absolute top-0 left-0 p-4 mt-[33px]">
        <button onClick={handleBackClick}>
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
      </div>
      <div className="absolute top-0 right-0 p-4 mt-[33px]">
        <button onClick={handleProfileClick} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Main Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-3xl font-serif text-black mb-8">TEAM CODE</h2>
        
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="KEY IN TEAM CODE"
          value={teamCode}
          onChange={handleTeamCodeChange}
          className="bg-gray-200 text-black placeholder-black font-semibold py-3 px-6 rounded-full w-full mb-4 text-center"
        />

        <button type="button" onClick={handleQrScan} className="mb-4">
          <QrCode className="w-10 h-10 text-gray-600" />
        </button>
      </form>

      {/* Footer */}
      <div className="flex justify-end p-4">
        <button type="submit" onClick={handleSubmit}>
          <ArrowRight className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
};

export default JoinTeamPage;
