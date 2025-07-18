import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto rounded-lg relative">
      {/* Header */}
      <div className="absolute top-0 right-0 p-4 mt-[33px]">
      </div>

      <div className="flex items-center justify-between p-4 bg-white mt-[94px]">
        <div className="flex items-center gap-2 flex-grow">
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-gray-300 w-1/4"></div>
          <div className="h-1 bg-gray-300 w-1/4"></div>
        </div>
      </div>

      {/* Main Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-3xl font-serif text-black">TELL US ABOUT</h2>
        <h3 className="text-3xl font-serif text-black mb-8 italic">you</h3>
        
        <input
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-200 text-black placeholder-black font-semibold py-3 px-6 rounded-full w-full mb-4 text-center"
        />
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

export default UsernamePage;
