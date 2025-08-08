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

const MockupsLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Mockups');
    navigate('/deliver/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 max-w-sm mx-auto">
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
        <h1 className="text-4xl font-bold leading-tight">Mockups<br/>(Paper Prototypes)</h1>
      </div>

      <p className="text-gray-500 mb-6 text-sm ml-4">
        Mockups are used to create a rough resemblance of Products, Services and Systems. It is low cost that is easy and quick to construct and modify.
      </p>

      {/* Main Content */}
      <main className="flex-grow pb-16">
        <Section title="Why?">
          <p>Mockups can be used to identify hidden needs of users and show ideas in an early and quick to construct and modify.</p>
        </Section>

        <Section title="Procedure">
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Identify key assumptions and questions</strong></li>
            <li><strong>Construct the Mockup</strong></li>
            <li><strong>Identify key areas to work on for further higher-fidelity prototyping</strong></li>
          </ol>
        </Section>

        <Section title="Best Practices" icon="/assets/TipsBulb.png">
          <ul className="list-disc list-inside space-y-2">
            <li>Be creative with the resources available</li>
            <li>Make the solution fast with minimal details</li>
            <li>Create your mockups to closely resemble the Product, Service or System that are crucial to your solution</li>
            <li>Be clear in explaining any limit of your mockup to your audience to prevent confusion</li>
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

export default MockupsLesson;
