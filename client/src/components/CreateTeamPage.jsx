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
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto rounded-lg relative">
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
        <h2 className="text-3xl font-serif text-black mb-8">TEAM DETAILS</h2>
        
        <input
          type="text"
          placeholder="TEAM NAME"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="bg-gray-200 text-black placeholder-black font-semibold py-3 px-6 rounded-full w-full mb-4 text-center"
        />

        

        <div className="flex items-center justify-center w-full">
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

      {/* Footer */}
      <div className="flex justify-end p-4">
        <button type="submit" onClick={handleSubmit}>
          <ArrowRight className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
};

export default CreateTeamPage;
