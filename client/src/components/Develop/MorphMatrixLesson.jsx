import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralChatbot from '../GeneralChatbot';

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

const MorphMatrixLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Morph Matrix');
    navigate('/develop/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('/')} className="p-2">
          <img src="/assets/Home.svg" alt="Home" className="w-8 h-8" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-2">
          <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-12 h-12" />
        </button>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
      </div>

      <div className="flex items-start mb-4">
        <div className="w-1 bg-black h-16 mr-3"></div>
        <h1 className="text-4xl font-bold leading-tight">Morph<br/>Matrix</h1>
      </div>

      <p className="text-gray-500 mb-6 text-sm ml-4">
        Combines all possible ideas to systematically generate novel concepts
      </p>

      {/* Main Content */}
      <main className="flex-grow pb-16">
        <Section title="How It Works">
          <ul className="list-disc list-inside space-y-2">
            <li>Identify key functions or features required for the product, service, or system.</li>
            <li>List these functions in the rows of a matrix.</li>
            <li>For each function, brainstorm multiple alternative solutions and list them in the columns.</li>
            <li>By selecting one idea from each row, teams can create a wide range of concept permutations.</li>
          </ul>
        </Section>

        <Section title="Benefits">
          <ul className="list-disc list-inside space-y-2">
            <li>Ensures broad exploration of the solution space.</li>
            <li>Helps in discovering unconventional or high-potential combinations that might be missed through unstructured brainstorming.</li>
          </ul>
        </Section>

        <button 
          onClick={handleComplete}
          className="w-full bg-gray-200 text-black font-semibold py-3 px-6 rounded-full mt-4"
        >
          Complete Lesson
        </button>
      </main>

      {isChatbotOpen && <GeneralChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
}

export default MorphMatrixLesson;
