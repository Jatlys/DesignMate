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

const RealWinWorthLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Real, Win, Worth');
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
          <h1 className="text-4xl font-serif text-black">Real-Win-Worth</h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6">
          <p className="text-gray-700">
            A framework for evaluating new ideas based on three criteria: Is it real? Can we win? Is it worth doing?
          </p>

          <Section title="How It Works">
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Real:</strong> Is the market real? Is the product real?</li>
              <li><strong>Win:</strong> Can the product be competitive? Can our company be competitive?</li>
              <li><strong>Worth:</strong> Does the project fit the company’s strategy? Is it profitable?</li>
            </ul>
          </Section>

          <Section title="Procedure">
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>
                <strong>Prepare Ideas List:</strong>
                <p className="text-sm text-gray-600 mt-1">Compile ideas and use markers to indicate which ideas meet each criterion.</p>
              </li>
              <li>
                <strong>Filter by Criteria:</strong>
                <p className="text-sm text-gray-600 mt-1">Narrow down ideas—first through “Real,” then “Win,” and finally “Worth.”</p>
              </li>
              <li>
                <strong>Prioritise Top Ideas:</strong>
                <p className="text-sm text-gray-600 mt-1">The best ideas satisfy all three criteria and are selected for prototyping.</p>
              </li>
            </ol>
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

export default RealWinWorthLesson;
