import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Chatbot from './DiscoverChatbot';

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

const ScenariosLesson = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const hasCompleted = localStorage.getItem('scenariosLessonCompleted');
    if (!hasCompleted) {
      setIsFirstTime(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep === 2 && isFirstTime) {
      setShowPopup(true);
    } else if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/discover/dashboard');
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
      localStorage.setItem('scenariosLessonCompleted', 'true');
    }
    onComplete('Scenarios');
    navigate('/discover/dashboard');
  };

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <div className="h-screen bg-white flex flex-col p-4 max-w-sm mx-auto relative">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('/discover/dashboard')} className="p-2">
          <img src="/assets/Home.svg" alt="Home" className="w-8 h-8" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-2">
          <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-10 h-10" />
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
              Scenarios are stories that describe a user's interaction with a product or service in a specific context.
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

        {currentStep === 3 && (
            <>
                <div className="flex items-start mb-4">
                    <div className="w-1 bg-blue-600 h-16 mr-3"></div>
                    <h1 className="text-4xl font-bold leading-tight">Relevant<br/>Methods</h1>
                </div>
                <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg">User Interviews</div>
                    <div className="bg-gray-100 p-4 rounded-lg">Stakeholder Mapping</div>
                    <div className="bg-gray-100 p-4 rounded-lg">Personas</div>
                    <div className="bg-gray-100 p-4 rounded-lg">User Journey Map</div>
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
                className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-full"
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

      {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}

      {showPopup && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
