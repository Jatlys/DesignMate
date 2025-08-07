import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, CheckCircle } from 'lucide-react';
import DeliverChatbot from './DeliverChatbot';

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
    <div className="text-gray-700 space-y-2">{children}</div>
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
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-24 pb-8">
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-md mx-auto">
        <button onClick={() => navigate('/deliver/dashboard')} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-10 h-10 text-gray-800" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <Bot className="w-10 h-10 text-gray-800" />
        </button>
      </header>

      <main className="w-full max-w-sm flex-grow flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-black">Wireframing</h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6">
          <p className="text-gray-700">
            A wireframe is a static representation of the layout of your website or app.
          </p>

          <Section title="Why?">
            <p>Wireframes are used to communicate content on the page as well as the functionality of the elements in your design, taking into account the user experience.</p>
          </Section>

          <Section title="Materials">
            <p>Figma and wireframing template.</p>
          </Section>

          <Section title="Procedure">
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li><strong>Consolidate previous user research</strong></li>
              <li><strong>Finalise elements on the page</strong></li>
              <li><strong>Sketch initial draft of the layout</strong></li>
              <li><strong>Connect elements to the pages by drawing arrows to where each element directs to</strong></li>
            </ol>
          </Section>

          <Section title="Fun Fact">
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Low fidelity refers to a sketch with just the basic structures of the site to determine layout and concept.</li>
              <li>Medium fidelity has placeholder icons, images and texts to show a more accurate description of the layout.</li>
              <li>High fidelity uses real images content and colours to show how the final UI looks like. If it is clickable it is called a “Prototype”.</li>
            </ul>
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

      {isChatbotOpen && <DeliverChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
}

export default WireframingLesson;
