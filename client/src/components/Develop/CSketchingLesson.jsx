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

const CSketchingLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('C-Sketching');
    navigate('/develop/dashboard');
  };

  return (
    <div className="h-screen bg-white flex flex-col p-4 max-w-4xl mx-auto relative overflow-hidden">
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
        <h1 className="text-4xl font-bold leading-tight">C-Sketching<br/>(6-3-5)</h1>
      </div>

      <p className="text-gray-500 mb-6 text-sm ml-4">
        Collaborative idea-generation method where six participants each sketch three design ideas in five minutes.
      </p>

      {/* Main Content */}
      <main className="flex-grow pb-16">
        <Section title="How It Works">
          <ol className="list-decimal list-inside space-y-2">
            <li>Each participant receives a sheet divided into three sections.</li>
            <li>In the first round, every team member silently sketches three ideas (one per section) in about 15 minutes.</li>
            <li>The sheets are then passed to the next person, who builds upon, modifies, or adds new ideas to the sketches in another round.</li>
            <li>This process repeats for five rounds, so each sheet is iteratively developed by all team members.</li>
            <li>After all rounds, the group discusses and refines the best ideas.</li>
          </ol>
        </Section>

        <Section title="Best Practices">
          <ul className="list-disc list-inside space-y-2">
            <li>Silence is maintained during sketching to avoid groupthink and encourage independent creativity.</li>
            <li>Feedback and discussion occur only after all rounds are complete.</li>
            <li>Encourages diverse perspectives and rapid concept evolution.</li>
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

export default CSketchingLesson;
