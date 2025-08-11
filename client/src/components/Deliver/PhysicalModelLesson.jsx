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

const PhysicalModelLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Physical Model');
    navigate('/deliver/dashboard');
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
        <h1 className="text-4xl font-bold leading-tight">Physical<br/>Model</h1>
      </div>

      <p className="text-gray-500 mb-6 text-sm ml-4">
        A 3D prototype product which simulates the functions of your idea.
      </p>

      {/* Main Content */}
      <main className="flex-grow pb-16">
        <Section title="Why?">
          <p>It allows for better testing as it enables users to interact physically with the idea, allowing designers to gain deeper insights.</p>
        </Section>

        <Section title="Materials">
          <p>Cardboard, clay, 3D printer, foam, and other crafting materials.</p>
        </Section>

        <Section title="Procedure">
          <ol class="list-decimal list-inside space-y-2">
            <li><strong>Consolidate the list of key information needed that represents success of the model</strong></li>
            <li><strong>Visualise the list of key information and the required functions of the prototype</strong></li>
            <li><strong>Build the prototype</strong></li>
            <li><strong>Test the model</strong></li>
          </ol>
        </Section>

        <Section title="Tips" icon="/assets/TipsBulb.png">
          <ul class="list-disc list-inside space-y-2">
            <li>Modify commercial products to reduce cost and effort needed to achieve functionality.</li>
            <li>It may be difficult to fit all the intended features into a single model. You may want to consider using multiple prototypes to test multiple functions.</li>
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

export default PhysicalModelLesson;
