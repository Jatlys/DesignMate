import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const BottomNav = ({ onBack, onNext }) => {
  const navigate = useNavigate();

  return (
    <footer className="w-full flex justify-between items-center p-4 bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 max-w-4xl mx-auto">
      <button onClick={onBack || (() => navigate(-1))} className="p-2">
        <ArrowLeft className="w-8 h-8 text-black" />
      </button>
      <button onClick={onNext} className="p-2">
        <ArrowRight className="w-8 h-8 text-black" />
      </button>
    </footer>
  );
};

export default BottomNav;
