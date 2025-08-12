import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import GeneralChatbot from '../GeneralChatbot';

const Section = ({ title, children, icon }) => (
  <div className="mb-6">
    <div className="flex items-center mb-3">
      {icon && <img src={icon} alt="" className="w-6 h-6 mr-2" />}
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    {children}
  </div>
);

function PersonasLesson({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 2; // Changed from 3 to 2
  const progressPercentage = (currentStep / totalSteps) * 100;

  useEffect(() => {
    if (currentStep === 2) { // Changed from 3 to 2
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/discover/dashboard');
    }
  };

  const handleComplete = () => {
    onComplete('Personas');
    navigate('/discover/dashboard');
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
            <div className="absolute inset-0 rounded-full border-8 border-blue-300 opacity-50 animate-ping"></div>
          )}
        </button>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto pb-20">
        {currentStep === 1 && (
          <>
            <div className="flex items-start mb-4">
              <div className="w-1 bg-black h-16 mr-3"></div>
              <h1 className="text-4xl font-bold leading-tight">Personas</h1>
            </div>
            <p className="text-gray-500 mb-6 text-sm ml-4">
              A persona is a fictional character that represents a group of users with similar goals, needs, and characteristics.
            </p>
            <Section title="Why?">
              <p>Personas help the design team to understand the users' needs, experiences, behaviors, and goals. It helps to create a user-centered design.</p>
            </Section>
            <Section title="Procedure">
              <ol className="list-decimal list-inside space-y-2">
                <li><strong>Research</strong><p>Conduct user research to collect data about your target audience.</p></li>
                <li><strong>Identify Patterns</strong><p>Analyze the research data to identify patterns and create user groups.</p></li>
                <li><strong>Create Persona</strong><p>Develop a persona for each user group with a name, photo, and key characteristics.</p></li>
                <li><strong>Share</strong><p>Share the personas with the team to ensure everyone has a shared understanding of the users.</p></li>
              </ol>
            </Section>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="flex items-start mb-4">
              <div className="w-1 bg-black h-16 mr-3"></div>
              <h1 className="text-4xl font-bold leading-tight">Personas</h1>
            </div>
            <Section title="Tips" icon="💡">
                <ul className="list-disc list-inside space-y-2">
                    <li>Personas represent idealised versions of your target user groups rather than specific individuals.</li>
                    <li>Combine personas that share similar concepts, and separate those that are distinctly different.</li>
                    <li>Take into account both typical and extreme user groups.</li>
                </ul>
            </Section>
            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-6 rounded-r-lg">
                <p className="font-bold">Handy Tip!</p>
                <p>Create personas for both typical users and those at the extremes. Insights from extreme users often inspire innovations that benefit mainstream users.</p>
            </div>
          </>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="absolute bottom-0 left-0 right-0 bg-white p-4 flex items-center">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft className="w-8 h-8 text-black" />
        </button>
        
        <div className="flex-grow flex justify-center">
          {currentStep === 2 && ( // Changed from 3 to 2
            <button 
                onClick={handleComplete}
                className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-full"
            >
                Complete Lesson
            </button>
          )}
        </div>

        {currentStep < 2 && ( // Changed from 3 to 2
          <button onClick={handleNext} className="p-2 ml-auto">
            <ArrowRight className="w-8 h-8 text-black" />
          </button>
        )}

        {currentStep === 2 && <div className="w-12"></div>} {/* Changed from 3 to 2 */}
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

export default PersonasLesson;