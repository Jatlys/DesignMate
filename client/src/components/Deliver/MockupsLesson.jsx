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

const MockupsLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Mockups');
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
          <h1 className="text-4xl font-serif text-black">Mockups</h1>
          <p className="text-lg text-gray-600 mt-1">(Paper Prototypes)</p>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6">
          <p className="text-gray-700">
            Mockups are used to create a rough resemblance of Products, Services and Systems. It is low cost that is easy and quick to construct and modify.
          </p>

          <Section title="Why?">
            <p>Mockups can be used to identify hidden needs of users and show ideas in an early and quick to construct and modify.</p>
          </Section>

          <Section title="Procedure">
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li><strong>Identify key assumptions and questions</strong></li>
              <li><strong>Construct the Mockup</strong></li>
              <li><strong>Identify key areas to work on for further higher-fidelity prototyping</strong></li>
            </ol>
          </Section>

          <Section title="Best Practices">
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Be creative with the resources available</li>
              <li>Make the solution fast with minimal details</li>
              <li>Create your mockups to closely resemble the Product, Service or System that are crucial to your solution</li>
              <li>Be clear in explaining any limit of your mockup to your audience to prevent confusion</li>
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

export default MockupsLesson;
