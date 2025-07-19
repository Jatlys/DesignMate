import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbot from './DeliverChatbot';

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

const StoryboardingLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Storyboarding');
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
          <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-10 h-10" />
        </button>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
      </div>

      <div className="flex items-start mb-4">
        <div className="w-1 bg-black h-16 mr-3"></div>
        <h1 className="text-4xl font-bold leading-tight">Storyboarding</h1>
      </div>

      <p className="text-gray-500 mb-6 text-sm ml-4">
        Storyboarding is used to display your idea and scenarios of use. You can use videos, sketching and texts to illustrate the story.
      </p>

      {/* Main Content */}
      <main className="flex-grow pb-16">
        <Section title="Why?">
          <p>It allows you to effectively show your ideas and concepts without needing a developed prototype</p>
        </Section>

        <Section title="Materials">
          <p>Video recording device or Computer with drawing software</p>
        </Section>

        <Section title="Procedure">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Identify Target User</strong>
            </li>
            <li>
              <strong>Identify key focus of the story</strong>
              <p>Important details to convey</p>
            </li>
            <li>
              <strong>Identify story context</strong>
              <p>when, where does it take place?</p>
            </li>
            <li>
              <strong>Identify key actors</strong>
              <p>Who and what are involved in your story</p>
            </li>
            <li>
              <strong>Establish flow of events</strong>
              <p>Determine the flow of events and start drawing</p>
            </li>
          </ol>
        </Section>

        <Section title="Tips" icon="/assets/TipsBulb.png">
          <p>Your storyboard should help you carry your point across to your audience</p>
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

export default StoryboardingLesson;
