import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralChatbot from '../GeneralChatbot';
import BottomNav from '../BottomNav';

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

const AffinityAnalysisLesson = ({ onComplete, onNext, onBack }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Affinity Analysis');
    navigate('/define/dashboard');
  };

  return (
        <div className="bg-white max-w-4xl mx-auto">
      <div className="p-4">
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
        <h1 className="text-4xl font-bold leading-tight">Affinity<br/>Analysis</h1>
      </div>

      <p className="text-gray-500 mb-6 text-sm ml-4">
        Affinity Analysis organises a large number of needs, ideas, or other design information into their natural categories and relationships.
      </p>

      {/* Main Content */}
      <main className="flex-grow pb-24">
        <Section title="Why?">
          <p>It allows you to organize, cluster and make sense of a large set of data such as user needs or ideas.</p>
        </Section>

        <Section title="Materials">
          <p>Sticky notes, Markers, Large wall or whiteboard.</p>
        </Section>

        <Section title="Procedure">
          <ol class="list-decimal list-outside ml-4 space-y-2">
            <li>
              <strong>List Needs</strong>
              <p>List down needs interpreted from the Discover phase.</p>
            </li>
            <li><strong>Write each need on a single card or Post-it</strong></li>
            <li><strong>Present cards on the wall</strong></li>
            <li>
              <strong>Group Needs</strong>
              <p>Group the cards into clusters based on similar meanings or themes related to how people interact with the product, service or system.</p>
            </li>
          </ol>
        </Section>

        <Section title="Tips" icon="/assets/TipsBulb.png">
          <ul class="list-disc list-outside ml-4 space-y-2">
            <li>Do not agonise over perfectly clustering the needs as themes will emerge organically.</li>
            <li>Define and name themes based on content of ideas.</li>
            <li>Conduct this method with a cross-functional team, including stakeholders.</li>
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
      <BottomNav onNext={onNext} onBack={onBack} />
    </div>
  );
}

export default AffinityAnalysisLesson;
