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

const MoodboardLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Moodboard');
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
        <h1 className="text-4xl font-bold leading-tight">Moodboard</h1>
      </div>

      <p className="text-gray-500 mb-6 text-sm ml-4">
        Having an idea of the style and theme of the given idea. Futuristic, old fashion and simple could be some of the ideas of categories you are trying to capture and portray to the team.
      </p>

      {/* Main Content */}
      <main className="flex-grow pb-16">
        <Section title="How It Works">
          <ul className="list-disc list-inside space-y-2">
            <li>Teams gather images from magazines, the internet, or photographs that relate (directly or indirectly) to the design challenge.</li>
            <li>These images are "ripped" out and "rapped" together on a blank canvas to form a collage.</li>
            <li>The collage serves as a mood board or visual prompt, helping teams articulate ideas that might be hard to express in words.</li>
          </ul>
        </Section>

        <Section title="Best Practices">
          <ul className="list-disc list-inside space-y-2">
            <li>Include images from unrelated domains to encourage unconventional thinking.</li>
            <li>Present and explain the collage to others to gather feedback and surface new interpretations.</li>
          </ul>
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

export default MoodboardLesson;
