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

const PhysicalModelLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Physical Model');
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
          <h1 className="text-4xl font-serif text-black">Physical Model</h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6">
          <p className="text-gray-700">
            A 3D prototype product which simulates the functions of your idea.
          </p>

          <Section title="Why?">
            <p>It allows for better testing as it enables users to interact physically with the idea, allowing designers to gain deeper insights.</p>
          </Section>

          <Section title="Materials">
            <p>Cardboard, clay, 3D printer, foam, and other crafting materials.</p>
          </Section>

          <Section title="Procedure">
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li><strong>Consolidate the list of key information needed that represents success of the model</strong></li>
              <li><strong>Visualise the list of key information and the required functions of the prototype</strong></li>
              <li><strong>Build the prototype</strong></li>
              <li><strong>Test the model</strong></li>
            </ol>
          </Section>

          <Section title="Tips">
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Modify commercial products to reduce cost and effort needed to achieve functionality.</li>
              <li>It may be difficult to fit all the intended features into a single model. You may want to consider using multiple prototypes to test multiple functions.</li>
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

export default PhysicalModelLesson;
