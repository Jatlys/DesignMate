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

const WireframingLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Wireframing');
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
        <h1 className="text-4xl font-bold leading-tight">Wireframing</h1>
      </div>

      <p className="text-gray-500 mb-6 text-sm ml-4">
        A wireframe is a static representation of the layout of your website or app.
      </p>

      {/* Main Content */}
      <main className="flex-grow pb-16">
        <Section title="Why?">
          <p>Wireframes are used to communicate content on the page as well as the functionality of the elements in your design, taking into account the user experience.</p>
        </Section>

        <Section title="Materials">
          <p>Figma and wireframing template</p>
        </Section>

        <Section title="Procedure">
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Consolidate previous user research</strong></li>
            <li><strong>Finalise elements on the page</strong></li>
            <li><strong>Sketch initial draft of the layout</strong></li>
            <li><strong>Connect elements to the pages by drawing arrows to where each element directs to</strong></li>
          </ol>
        </Section>

        <Section title="Fun Fact" icon="/assets/TipsBulb.png">
          <ul className="list-disc list-inside space-y-2">
            <li>Low fidelity refers to a sketch with just the basic structures of the site to determine layout and concept</li>
            <li>Medium fidelity has placeholder icons, images and texts to show a more accurate description of the layout</li>
            <li>High fidelity uses real images content and colours to show how the final UI looks like. If it is clickable it is called a “Prototype”</li>
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

export default WireframingLesson;
