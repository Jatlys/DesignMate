import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home, MessageCircle } from 'lucide-react';

const Section = ({ title, children, icon }) => (
  <div className="mb-6">
    <div className="flex items-center mb-2">
      <div className="w-1 bg-black h-6 mr-3"></div>
      <h3 className="font-bold text-lg">{title}</h3>
      {icon && <span className="ml-2 text-yellow-500">💡</span>}
    </div>
    <div className="text-gray-700 text-sm ml-4">{children}</div>
  </div>
);

const PersonasLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const handleNext = () => {
    if (currentStep === 2 && isFirstTime) {
      setShowPopup(true);
    } else if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate(-1);
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handlePopupOk = () => {
    setShowPopup(false);
    setCurrentStep(3);
  };

  const handleComplete = () => {
    if (isFirstTime) {
      // localStorage.setItem('personasLessonCompleted', 'true');
    }
    if (onComplete) onComplete('Personas');
    alert('Lesson completed! Would navigate to dashboard.');
  };

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <div className="h-screen bg-white flex flex-col p-4 max-w-sm mx-auto relative">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <button onClick={handleBack} className="p-2">
          <img src="/assets/Home.svg" alt="Back" className="w-8 h-8" />
        </button>
        <button 
          onClick={() => setIsChatbotOpen(true)} 
          className={`p-2 relative ${showPopup ? 'z-50' : ''}`}
        >
          <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-10 h-10" />
          {/* Pulsing circle highlight when popup is shown */}
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
        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
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
              Personas are fictional characters that represent the target users of a product or service.
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
                <p>Create personas for both typical users and those at the extremes. Insights from extreme users often inspire innovations that benefit mainstream users. Engage a diverse team, including stakeholders, in this process.</p>
            </div>
          </>
        )}

        {currentStep === 3 && (
            <>
                <div className="flex items-start mb-4">
                    <div className="w-1 bg-blue-600 h-16 mr-3"></div>
                    <h1 className="text-4xl font-bold leading-tight">Relevant<br/>Methods</h1>
                </div>
                <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">Method 1</div>
                    <div className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">Method 2</div>
                    <div className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">Method 3</div>
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
          {currentStep === 3 && (
            <button 
                onClick={handleComplete}
                className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-full hover:bg-gray-300 transition-colors"
            >
                Complete Lesson
            </button>
          )}
        </div>

        {currentStep < 3 && (
          <button onClick={handleNext} className="p-2 ml-auto">
            <ArrowRight className="w-8 h-8 text-black" />
          </button>
        )}

        {currentStep === 3 && <div className="w-12"></div>} 
      </footer>

      {/* Mock Chatbot */}
      {isChatbotOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
            <h3 className="font-bold mb-4">AI Mentor Chatbot</h3>
            <p className="mb-4">How can I help you with Personas?</p>
            <button 
              onClick={() => setIsChatbotOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup with highlighted chatbot */}
      {showPopup && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white p-8 rounded-lg text-center max-w-sm mx-4">
            <p className="mb-4">If you have any questions after the end of the lesson, you may ask AI Mentor located here!</p>
            <button onClick={handlePopupOk} className="bg-gray-200 text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors">
              Ok!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonasLesson;