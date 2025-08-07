import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, CheckCircle } from 'lucide-react';
import DefineChatbot from './DefineChatbot';

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
    <div className="text-gray-700 space-y-2">{children}</div>
  </div>
);

const FiveWhysLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('5 Whys');
    navigate('/define/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-24 pb-8">
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-md mx-auto">
        <button onClick={() => navigate('/define/dashboard')} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-10 h-10 text-gray-800" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <Bot className="w-10 h-10 text-gray-800" />
        </button>
      </header>

      <main className="w-full max-w-sm flex-grow flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-black">5 Whys</h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6">
          <p className="text-gray-700">
            5 Whys is a questioning technique used when engaging with users after a response is given.
          </p>

          <Section title="Why?">
            <p>Allows you to dig deeper and uncover needs that are not obvious or unobservable to get essential answers to a complex issue such as psychology or emotional needs.</p>
          </Section>

          <Section title="Procedure">
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li><strong>Start with a broad question</strong></li>
              <li>
                <strong>Go deeper with First 'Why'</strong>
                <p className="text-sm text-gray-600 mt-1">Remember not to ask horizontal questions such as how, what.</p>
              </li>
              <li><strong>Write down answers</strong></li>
              <li><strong>Be mindful</strong></li>
            </ol>
          </Section>

          <div className="flex flex-col items-center justify-center my-4 text-orange-500 font-bold">
            <span>why</span>
            <span className="text-black">↓</span>
            <span>why</span>
            <span className="text-black">↓</span>
            <span>why</span>
            <span className="text-black">↓</span>
            <span>why</span>
            <span className="text-black">↓</span>
            <span>why</span>
          </div>

          <button 
            onClick={handleComplete}
            className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors mt-4"
          >
            <CheckCircle size={20} />
            <span>Complete Lesson</span>
          </button>
        </div>
      </main>

      {isChatbotOpen && <DefineChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
}

export default FiveWhysLesson;
