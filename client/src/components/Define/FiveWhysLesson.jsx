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

const FiveWhysLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('5 Whys');
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
        <h1 className="text-4xl font-bold leading-tight">5 Whys</h1>
      </div>

      <p className="text-gray-500 mb-6 text-sm ml-4">
        5 Whys is a questioning technique used when engaging with users after a response is given.
      </p>

      {/* Main Content */}
      <main className="flex-grow pb-16">
        <Section title="Why?">
          <p>Allows you to dig deeper and uncover needs that is not obvious or unobservable to get essential answers to a complex issue such as psychology or emotional needs.</p>
        </Section>

        <Section title="Procedure">
          <ol className="list-decimal list-outside ml-4 space-y-2">
            <li><strong>Start with a broad question</strong></li>
            <li>
              <strong>Go deeper with First 'Why'</strong>
              <p className="text-gray-500">Remember not to ask horizontal questions such as how, what.</p>
            </li>
            <li><strong>Write down answers</strong></li>
            <li><strong>Be mindful</strong></li>
          </ol>
        </Section>

        <div className="flex flex-col items-center justify-center my-4 text-orange-500 font-bold">
          <span>why</span>
          <span className="text-black">↓</span>
          <span>why</span>
          <span className="text-black">↓</span>
          <span>why</span>
          <span className="text-black">↓</span>
          <span>why</span>
          <span className="text-black">↓</span>
          <span>why</span>
        </div>

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

export default FiveWhysLesson;
