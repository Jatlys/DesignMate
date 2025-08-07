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

const HowMightWeLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('How Might We');
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
          <h1 className="text-4xl font-serif text-black">How Might We</h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6">
          <p className="text-gray-700">
            A design thinking activity that helps you reframe your challenges into opportunities for innovation.
          </p>

          <Section title="Why?">
            <p>It helps to open up a wider range of possible solutions and encourages a more optimistic, solution-oriented mindset.</p>
          </Section>

          <Section title="Materials">
            <p>Sticky notes, Markers, Whiteboard or wall space.</p>
          </Section>

          <Section title="Procedure">
            <p>Start with a point-of-view (POV) or a problem statement. Break it down and rephrase it as a "How Might We..." question to explore new ideas.</p>
            <ol className="list-decimal list-inside space-y-2 pl-2 mt-2">
              <li><strong>Brainstorm solutions:</strong> Brainstorm as many solutions as possible for each HMW question.</li>
              <li><strong>Group and theme:</strong> Group similar ideas together and identify common themes.</li>
            </ol>
          </Section>

          <Section title="Tips">
            <p>Encourage wild and crazy ideas. There are no bad ideas at this stage. The goal is to generate as many ideas as possible.</p>
          </Section>

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

export default HowMightWeLesson;
