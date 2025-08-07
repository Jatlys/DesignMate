import React, { useState } from 'react';
import { User, ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateTeamPage = () => {
  const [teamName, setTeamName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [icebreaker, setIcebreaker] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim() !== '') {
      // Placeholder for team code generation
      const generatedTeamCode = '123456'; // Example team code
      navigate(`/team-created/${generatedTeamCode}`, { state: { iceBreaker: icebreaker } });
    } else {
      alert('Please enter a team name.');
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
        <h2 className="text-3xl sm:text-4xl font-serif text-black mb-8">TEAM DETAILS</h2>
        
        <input
          type="text"
          placeholder="TEAM NAME"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="bg-gray-200 text-black placeholder-black font-semibold py-3 px-6 rounded-full w-full mb-6 text-center"
        />

        <div className="flex items-center justify-center w-full mb-8">
          <span className="mr-4 font-semibold text-black text-lg">Icebreaker</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={icebreaker}
              onChange={() => setIcebreaker(!icebreaker)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-black"></div>
          </label>
        </div>
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

export default CreateTeamPage;
