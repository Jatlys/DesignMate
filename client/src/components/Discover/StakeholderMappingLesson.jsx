import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import GeneralChatbot from '../GeneralChatbot';

const Section = ({ title, children, icon }) => (
  <div className="mb-6">
    <div className="flex items-center mb-3">
      {icon && <img src={icon} alt="" className="w-6 h-6 mr-2" />}
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    {children}
  </div>
);

function StakeholderMappingLesson({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 2; 
  const progressPercentage = (currentStep / totalSteps) * 100;

  useEffect(() => {
    if (currentStep === 2) { 
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
    onComplete('Stakeholder Mapping');
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
              <h1 className="text-4xl font-bold leading-tight">Stakeholder<br/>Mapping</h1>
            </div>
            <p className="text-gray-500 mb-6 text-sm ml-4">
              Stakeholder Mapping visually represents stakeholder analysis to provide an overview and help prioritise the stakeholders involved.
            </p>
            <Section title="Why?">
              <p>Stakeholder mapping helps designers, engineers, and professionals to understand each stakeholder deeply through asking key questions to gain an overview of the stakeholders and to prioritise stakeholders involved.</p>
            </Section>
            <Section title="Procedure">
              <ol className="list-decimal list-inside space-y-2">
                <li><strong>Identify</strong><p>Determine the relevant stakeholders based on your opportunity statements.</p></li>
                <li><strong>Prioritise & Arrange</strong><p>Place stakeholders on a 2x2 Influence-Interest grid.</p></li>
                <li><strong>Illustrate Relationship</strong><p>Show connections between stakeholders using lines, arrows, and labels.</p></li>
                <li><strong>Analyse</strong><p>Review the stakeholder map from various perspectives. Record any insights, ideas, or questions that come up.</p></li>
              </ol>
            </Section>
            <Section title="Tips" icon="/assets/TipsBulb.png">
              <p>You can use this to communicate with your team about the stakeholders!</p>
            </Section>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="flex items-start mb-4">
                <div className="w-1 bg-purple-600 h-16 mr-3"></div>
                <h1 className="text-4xl font-bold leading-tight">Stakeholder<br/>Mapping</h1>
            </div>
            <p className="text-gray-500 mb-2 text-sm ml-4 font-semibold">Example</p>
            <p className="text-gray-600 mb-4 text-sm ml-4">Based on the implementation of a new EMR system in a hospital, stakeholders are prioritised and arranged on an Influence vs. Interest grid.</p>
            <img src="/assets/StakeholderGrid.svg" alt="Stakeholder Mapping Example Grid" className="w-full" />
          </>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="absolute bottom-0 left-0 right-0 bg-white p-4 flex items-center">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft className="w-8 h-8 text-black" />
        </button>
        
        <div className="flex-grow flex justify-center">
          {currentStep === 2 && ( 
            <button 
                onClick={handleComplete}
                className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-full"
            >
                Complete Lesson
            </button>
          )}
        </div>

        {currentStep < 2 && ( 
          <button onClick={handleNext} className="p-2 ml-auto">
            <ArrowRight className="w-8 h-8 text-black" />
          </button>
        )}

        {currentStep === 2 && <div className="w-12"></div>} 
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

export default StakeholderMappingLesson;