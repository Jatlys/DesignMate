import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, CheckCircle } from 'lucide-react';
import DevelopChatbot from './DevelopChatbot';

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
    <div className="text-gray-700 space-y-2">{children}</div>
  </div>
);

const MorphMatrixLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Morphological Matrix');
    navigate('/develop/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-24 pb-8">
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-md mx-auto">
        <button onClick={() => navigate('/develop/dashboard')} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-10 h-10 text-gray-800" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <Bot className="w-10 h-10 text-gray-800" />
        </button>
      </header>

      <main className="w-full max-w-sm flex-grow flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-black">Morphological Matrix</h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6">
          <p className="text-gray-700">
            A tool that combines all possible ideas to systematically generate novel concepts.
          </p>

          <Section title="How It Works">
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Identify key functions or features required for the product.</li>
              <li>List these functions in the rows of a matrix.</li>
              <li>For each function, brainstorm multiple alternative solutions and list them in the columns.</li>
              <li>Select one idea from each row to create a wide range of concept permutations.</li>
            </ul>
          </Section>

          <Section title="Benefits">
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Ensures broad exploration of the solution space.</li>
              <li>Helps discover unconventional combinations missed in unstructured brainstorming.</li>
            </ul>
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

      {isChatbotOpen && <DevelopChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
}

export default MorphMatrixLesson;
