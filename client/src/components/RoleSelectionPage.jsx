import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const roles = ['STUDENT', 'FACILITATOR / TEACHER', 'CONSULTANT / PROFESSIONAL', 'OTHERS'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert('Please select a role.');
      return;
    }
    console.log('Selected role:', selectedRole);
    navigate('/joinorcreate-team');
  };

  return (
        <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto rounded-lg relative">
      {/* Header */}
      <div className="absolute top-0 right-0 p-4 mt-[33px]">
      </div>

      <div className="flex items-center justify-between p-4 bg-white mt-[94px]">
        <div className="flex items-center gap-2 flex-grow">
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-gray-300 w-1/4"></div>
        </div>
      </div>

      {/* Main Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-3xl font-serif text-black mb-8">WHAT BEST DESCRIBES YOU?</h2>
        
        <div className="w-full">
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`font-semibold py-3 px-6 rounded-full w-full mb-4 text-center ${
                selectedRole === role
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}>
              {role}
            </button>
          ))}
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

export default RoleSelectionPage;
