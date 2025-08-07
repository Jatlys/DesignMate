import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, CheckCircle } from 'lucide-react';
import DefineChatbot from './DefineChatbot';

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
    <div className="text-gray-700 space-y-2">{children}</div>
  </div>
);

const AffinityAnalysisLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Affinity Analysis');
    navigate('/define/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-24 pb-8">
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-md mx-auto">
        <button onClick={() => navigate('/define/dashboard')} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-10 h-10 text-gray-800" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <Bot className="w-10 h-10 text-gray-800" />
        </button>
      </header>

      <main className="w-full max-w-sm flex-grow flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-black">Affinity Analysis</h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6">
          <p className="text-gray-700">
            Affinity Analysis organises a large number of needs, ideas, or other design information into their natural categories and relationships.
          </p>

          <Section title="Why?">
            <p>It allows you to organize, cluster and make sense of a large set of data such as user needs or ideas.</p>
          </Section>

          <Section title="Materials">
            <p>Sticky notes, Markers, Large wall or whiteboard.</p>
          </Section>

          <Section title="Procedure">
            <ol className="list-decimal list-inside space-y-4 pl-2">
              <li>
                <strong>List Needs:</strong>
                <p className="mt-1">List down needs interpreted from the Discover phase.</p>
              </li>
              <li><strong>Write each need on a single card or Post-it.</strong></li>
              <li><strong>Present cards on the wall.</strong></li>
              <li>
                <strong>Group Needs:</strong>
                <p className="mt-1">Group the cards into clusters based on similar meanings or themes related to how people interact with the product, service or system.</p>
              </li>
            </ol>
          </Section>

          <Section title="Tips">
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Do not agonise over perfectly clustering the needs as themes will emerge organically.</li>
              <li>Define and name themes based on content of ideas.</li>
              <li>Conduct this method with a cross-functional team, including stakeholders.</li>
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

      {isChatbotOpen && <DefineChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
}

export default AffinityAnalysisLesson;
