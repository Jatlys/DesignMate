import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../Chatbot';

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

const ActivityDiagramLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Activity Diagram');
    navigate('/define/dashboard');
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
        <h1 className="text-4xl font-bold leading-tight">Activity<br/>Diagram</h1>
      </div>

      <p className="text-gray-500 mb-6 text-sm ml-4">
        Activity diagram is a block of sequential and parallel activities that capture user interactions with the products, services or systems (PSS).
      </p>

      {/* Main Content */}
      <main className="flex-grow pb-16">
        <Section title="Why?">
          <p>It allows you to understand the user activity flow and identify opportunities for improvement. It gives you valuable information for design decisions</p>
        </Section>

        <Section title="Materials">
          <p>Sticky notes, Board</p>
        </Section>

        <Section title="Procedure">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>User Journey Observation:</strong>
              <p>Observe the full journey of how users interact with the product, service or system from start to finish</p>
            </li>
            <li>
              <strong>Step documentation:</strong>
              <p>Record each step as a separate block</p>
            </li>
            <li>
              <strong>Flow mapping:</strong>
              <p>Connect the steps to show the flow</p>
            </li>
            <li>
              <strong>User Validation:</strong>
              <p>Test the diagram with actual users to make sure it’s accurate and complete</p>
            </li>
          </ol>
        </Section>

        <Section title="Tips" icon="/assets/TipsBulb.svg">
          <p>You should use this method to identify pain points!</p>
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

export default ActivityDiagramLesson;
