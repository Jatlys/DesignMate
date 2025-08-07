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

const ActivityDiagramLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Activity Diagram');
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
          <h1 className="text-4xl font-serif text-black">Activity Diagram</h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6">
          <p className="text-gray-700">
            An activity diagram is a block of sequential and parallel activities that capture user interactions with products, services, or systems (PSS).
          </p>

          <Section title="Why?">
            <p>It allows you to understand the user activity flow and identify opportunities for improvement, providing valuable information for design decisions.</p>
          </Section>

          <Section title="Materials">
            <p>Sticky notes, Board.</p>
          </Section>

          <Section title="Procedure">
            <ol className="list-decimal list-inside space-y-4 pl-2">
              <li>
                <strong>User Journey Observation:</strong>
                <p className="mt-1">Observe the full journey of how users interact with the product, service, or system from start to finish.</p>
              </li>
              <li>
                <strong>Step Documentation:</strong>
                <p className="mt-1">Record each step as a separate block.</p>
              </li>
              <li>
                <strong>Flow Mapping:</strong>
                <p className="mt-1">Connect the steps to show the flow.</p>
              </li>
              <li>
                <strong>User Validation:</strong>
                <p className="mt-1">Test the diagram with actual users to make sure it’s accurate and complete.</p>
              </li>
            </ol>
          </Section>

          <Section title="Tips">
            <p>Use this method to identify pain points!</p>
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

export default ActivityDiagramLesson;
