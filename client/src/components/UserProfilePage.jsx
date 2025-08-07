import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <button 
        onClick={handleBackClick}
        className="absolute top-4 left-4 p-2"
      >
        <ArrowLeft className="w-8 h-8 text-black" />
      </button>
      <div className="w-full max-w-sm flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl sm:text-4xl font-serif text-black">User Profile</h1>
        <p className="text-gray-600 mt-4">This is the user profile page.</p>
      </div>
    </div>
  );
};

export default UserProfilePage;
