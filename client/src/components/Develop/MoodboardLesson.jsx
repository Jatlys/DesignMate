import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, CheckCircle } from 'lucide-react';
import DevelopChatbot from './DevelopChatbot';

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
    <div className="text-gray-700 space-y-2">{children}</div>
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
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-24 pb-8">
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-md mx-auto">
        <button onClick={() => navigate('/develop/dashboard')} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-10 h-10 text-gray-800" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <Bot className="w-10 h-10 text-gray-800" />
        </button>
      </header>

      <main className="w-full max-w-sm flex-grow flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-black">Moodboard</h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6">
          <p className="text-gray-700">
            A visual tool that communicates the style and theme of an idea, using categories like futuristic, classic, or minimalist to guide the design direction.
          </p>

          <Section title="How It Works">
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Gather images from various sources that relate to the design challenge.</li>
              <li>Arrange these images on a canvas to form a collage.</li>
              <li>The collage serves as a visual prompt to articulate ideas that are hard to express in words.</li>
            </ul>
          </Section>

          <Section title="Best Practices">
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Include images from unrelated domains to spark unconventional thinking.</li>
              <li>Present the collage to others to gather feedback and new interpretations.</li>
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

      {isChatbotOpen && <DevelopChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
}

export default MoodboardLesson;
