import React from 'react';
import { X, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IceBreakerStart = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/icebreaker/question/1');
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleHelp = () => {
    console.log('Help clicked');
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Header */}
      <header className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <button onClick={handleClose} className="p-2">
          <X className="w-8 h-8 text-black" />
        </button>
        <button onClick={handleHelp} className="p-2">
          <HelpCircle className="w-8 h-8 text-gray-500" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center w-full max-w-sm">
        <h1 className="text-4xl font-bold font-['Abhaya_Libre'] text-black mb-8">
          BREAK THE ICE!
        </h1>
        
        <div className="w-64 h-60 mx-auto mb-8">
          <img 
            src="/assets/breaktheice.svg" 
            alt="Break the Ice"
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-base font-bold font-['Abhaya_Libre'] text-black mb-6">
          How well do you<br/> know your teammates?
        </p>

        <button 
          onClick={handleGetStarted}
          className="bg-zinc-300 text-black font-bold font-['Instrument_Sans'] px-8 py-3 rounded-full hover:bg-zinc-400 transition-colors"
        >
          GET STARTED
        </button>
      </main>
    </div>
  );
};

export default IceBreakerStart;