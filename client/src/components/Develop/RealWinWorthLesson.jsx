import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbot from './DevelopChatbot';

const Section = ({ title, children, icon }) => (
  <div className="mb-6">
    <div className="flex items-center mb-2">
      <div className="w-1 bg-black h-6 mr-3"></div>
      <h3 className="font-bold text-lg">{title}</h3>
      {icon && <img src={icon} alt="icon" className="ml-2 w-5 h-5" />}
    </div>
    <div className="text-gray-700 text-sm ml-4">{children}</div>
  </div>
);

const RealWinWorthLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Real-Win-Worth');
    navigate('/develop/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 max-w-sm mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('/')} className="p-2">
          <img src="/assets/Home.svg" alt="Home" className="w-8 h-8" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-2">
          <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-10 h-10" />
        </button>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
      </div>

      <div className="flex items-start mb-4">
        <div className="w-1 bg-black h-16 mr-3"></div>
        <h1 className="text-4xl font-bold leading-tight">Real-Win-Worth</h1>
      </div>

      <p className="text-gray-500 mb-6 text-sm ml-4">
        Group evaluation of the ideas present and sharing views on the given solutions highlights as good
      </p>

      {/* Main Content */}
      <main className="flex-grow pb-16">
        <Section title="How It Works">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Win:</strong> Does the idea have a "wow" factor? Is it desirable and likely to succeed in the market?</li>
            <li><strong>Worth:</strong> Is it worth pursuing from a business or strategic perspective? Will it be profitable or impactful?</li>
            <li><strong>Real:</strong> Is it feasible to implement? Are the necessary resources, technology, and capabilities available?</li>
          </ul>
        </Section>

        <Section title="Procedure">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Prepare Ideas List:</strong>
              <p>Teams compile a list of ideas and use coloured stickers or markers to indicate which ideas meet each criterion</p>
            </li>
            <li>
              <strong>Filter by Criteria:</strong>
              <p>Ideas are gradually narrowed down—first through “Win,” then “Worth,” and finally “Real.”</p>
            </li>
            <li>
              <strong>Prioritise Top Ideas:</strong>
              <p>The best ideas are those that satisfy all three criteria and are selected for prototyping or further development.</p>
            </li>
          </ol>
        </Section>

        <button 
          onClick={handleComplete}
          className="w-full bg-gray-200 text-black font-semibold py-3 px-6 rounded-full mt-4"
        >
          Complete Lesson
        </button>
      </main>

      {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
}

export default RealWinWorthLesson;
