import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UsernamePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    navigate('/role-selection');
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Main Content */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center justify-center text-center px-4">
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-2 mb-8">
          <div className="h-1 bg-black flex-1"></div>
          <div className="h-1 bg-black flex-1"></div>
          <div className="h-1 bg-gray-300 flex-1"></div>
          <div className="h-1 bg-gray-300 flex-1"></div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif text-black">TELL US ABOUT</h2>
        <h3 className="text-3xl sm:text-4xl font-serif text-black mb-8 italic">you</h3>
        
        <input
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-200 text-black placeholder-black font-semibold py-3 px-6 rounded-full w-full mb-4 text-center"
        />
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

export default UsernamePage;
