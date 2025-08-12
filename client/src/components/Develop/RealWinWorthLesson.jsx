import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

const RealWinWorthLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    onComplete('Real, Win, Worth');
    navigate('/develop/dashboard');
  };

  const handlePopupOk = () => {
    setShowPopup(false);
  };

  return (
    <div className="h-screen bg-white flex flex-col p-4 max-w-4xl mx-auto relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('/')} className="p-2">
          <img src="/assets/Home.svg" alt="Home" className="w-8 h-8" />
        </button>
        <button 
          onClick={() => setIsChatbotOpen(true)} 
          className={`p-2 relative ${showPopup ? 'z-50' : ''}`}
        >
          <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-12 h-12" />
          {showPopup && (
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-pulse"></div>
          )}
          {showPopup && (
            <div className="absolute inset-0 rounded-full border-8 border-blue-300 opacity-50 anime-ping"></div>
          )}
        </button>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
      </div>

      <div className="flex items-start mb-4">
        <div className="w-1 bg-black h-16 mr-3"></div>
        <h1 className="text-4xl font-bold leading-tight">Real-Win-Worth</h1>
      </div>

      <p className="text-gray-500 mb-6 text-sm ml-4">
        Group evaluation of the ideas present and sharing views on the given solutions highlights as good
      </p>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto pb-20">
        <Section title="How It Works">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Win:</strong> Does the idea have a "wow" factor? Is it desirable and likely to succeed in the market?</li>
            <li><strong>Worth:</strong> Is it worth pursuing from a business or strategic perspective? Will it be profitable or impactful?</li>
            <li><strong>Real:</strong> Is it feasible to implement? Are the necessary resources, technology, and capabilities available?</li>
          </ul>
        </Section>

        <Section title="Procedure">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Prepare Ideas List:</strong>
              <p>Teams compile a list of ideas and use coloured stickers or markers to indicate which ideas meet each criterion</p>
            </li>
            <li>
              <strong>Filter by Criteria:</strong>
              <p>Ideas are gradually narrowed down—first through “Win,” then “Worth,” and finally “Real.”</p>
            </li>
            <li>
              <strong>Prioritise Top Ideas:</strong>
              <p>The best ideas are those that satisfy all three criteria and are selected for prototyping or further development.</p>
            </li>
          </ol>
        </Section>

      </main>

      {/* Footer Navigation */}
      <footer className="absolute bottom-0 left-0 right-0 bg-white p-4 flex items-center">
        <button onClick={() => navigate('/develop/dashboard')} className="p-2">
          <ArrowLeft className="w-8 h-8 text-black" />
        </button>
        
        <div className="flex-grow flex justify-center">
          <button 
            onClick={handleComplete}
            className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-full"
          >
            Complete Lesson
          </button>
        </div>

        <div className="w-12"></div>
      </footer>

      {isChatbotOpen && <GeneralChatbot onClose={() => setIsChatbotOpen(false)} />}

      {showPopup && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white p-8 rounded-lg text-center max-w-md mx-4">
            <p className="mb-4">If you have any questions after the end of the lesson, you may ask AI Mentor located here!</p>
            <button onClick={handlePopupOk} className="bg-gray-200 text-black font-semibold py-2 px-6 rounded-full">
              Ok!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RealWinWorthLesson;
