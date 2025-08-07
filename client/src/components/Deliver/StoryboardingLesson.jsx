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

const StoryboardingLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleComplete = () => {
    onComplete('Storyboarding');
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
          <h1 className="text-4xl font-serif text-black">Storyboarding</h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6">
          <p className="text-gray-700">
            Storyboarding is used to display your idea and scenarios of use. You can use videos, sketching and texts to illustrate the story.
          </p>

          <Section title="Why?">
            <p>It allows you to effectively show your ideas and concepts without needing a developed prototype.</p>
          </Section>

          <Section title="Materials">
            <p>Video recording device or Computer with drawing software.</p>
          </Section>

          <Section title="Procedure">
            <ol className="list-decimal list-inside space-y-3 pl-2">
              <li>
                <strong>Identify Target User</strong>
              </li>
              <li>
                <strong>Identify key focus of the story</strong>
                <p className="text-sm text-gray-600">Important details to convey</p>
              </li>
              <li>
                <strong>Identify story context</strong>
                <p className="text-sm text-gray-600">When, where does it take place?</p>
              </li>
              <li>
                <strong>Identify key actors</strong>
                <p className="text-sm text-gray-600">Who and what are involved in your story</p>
              </li>
              <li>
                <strong>Establish flow of events</strong>
                <p className="text-sm text-gray-600">Determine the flow of events and start drawing</p>
              </li>
            </ol>
          </Section>

          <Section title="Tips">
            <p>Your storyboard should help you carry your point across to your audience.</p>
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

export default StoryboardingLesson;
