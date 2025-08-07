import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Main Content */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center justify-center text-center px-4">
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-2 mb-8">
          <div className="h-1 bg-black flex-1"></div>
          <div className="h-1 bg-black flex-1"></div>
          <div className="h-1 bg-black flex-1"></div>
          <div className="h-1 bg-gray-300 flex-1"></div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif text-black mb-8">WHAT BEST DESCRIBes YOU?</h2>
        
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

export default RoleSelectionPage;
