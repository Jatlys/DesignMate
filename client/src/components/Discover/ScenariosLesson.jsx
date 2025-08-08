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

function ScenariosLesson({ onComplete }) {
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
    onComplete('Scenarios');
    navigate('/discover/dashboard');
  };

  const handlePopupOk = () => {
    setShowPopup(false);
  };

  return (
    <div className="h-screen bg-white flex flex-col p-4 max-w-sm mx-auto relative overflow-hidden">
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
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto pb-20">
        {currentStep === 1 && (
          <>
            <div className="flex items-start mb-4">
              <div className="w-1 bg-black h-16 mr-3"></div>
              <h1 className="text-4xl font-bold leading-tight">Scenarios</h1>
            </div>
            <p className="text-gray-500 mb-6 text-sm ml-4">
              A scenario is a narrative describing a specific situation in which a user interacts with a product or service to achieve a goal.
            </p>
            <Section title="Why?">
              <p>Scenarios help to understand the user's motivations, goals, and the context in which they will use the product. They are useful for exploring design concepts and communicating the user experience.</p>
            </Section>
            <Section title="Procedure">
              <ol className="list-decimal list-inside space-y-2">
                <li><strong>Set the Stage</strong><p>Define the user (persona), their goal, and the context of the situation.</p></li>
                <li><strong>Outline the Plot</strong><p>Describe the sequence of events and interactions the user goes through to achieve their goal.</p></li>
                <li><strong>Add Details</strong><p>Include thoughts, feelings, and motivations of the user to make the scenario more engaging.</p></li>
                <li><strong>Review and Refine</strong><p>Share the scenario with the team to ensure it is realistic and captures the user's experience.</p></li>
              </ol>
            </Section>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="flex items-start mb-4">
              <div className="w-1 bg-black h-16 mr-3"></div>
              <h1 className="text-4xl font-bold leading-tight">Scenarios</h1>
            </div>
            <Section title="Tips" icon="/assets/TipsBulb.png">
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Keep Scenarios Practical</strong><p>Steer clear of scenarios that are unrealistic or impossible.</p></li>
                    <li><strong>Ensure Diversity</strong><p>Deliberately explore both negative and positive situations by asking specific questions about each.</p></li>
                    <li>Craft scenarios such that each scenario generates one user need.</li>
                </ul>
            </Section>
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
          <div className="bg-white p-8 rounded-lg text-center max-w-sm mx-4">
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

export default ScenariosLesson;