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

function UserJourneyMappingLesson({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 2; // Only 2 steps now
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
    onComplete('User Journey Mapping');
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
              <h1 className="text-4xl font-bold leading-tight">User Journey<br/>Mapping</h1>
            </div>
            <p className="text-gray-500 mb-6 text-sm ml-4">
              A user Journey Map shows the typical steps and feelings a user experiences when using a product, service, or system across different times and channels
            </p>
            <Section title="Why?">
              <p>User Journey Map helps teams visualise and story-tell users' journey for deeper empathy, enabling more integrated sense-making of needs and identification of specific opportunity areas for innovation. It also creates a shared reference frame around the user experience across stakeholders.</p>
            </Section>
            <Section title="Procedure">
              <ol className="list-decimal list-inside space-y-2">
                <li><strong>1. Select Persona and a Scenario</strong><p>Define the persona's needs, expectations, and objectives within a specific scenario (see 'Personas' and 'Scenarios' references).</p></li>
                <li><strong>2. Chart the Journey</strong><p>Lay out the sequence of key actions and interactions between the user and the PSS in chronological order.</p></li>
                <li><strong>3. Spot Gaps and Gather Insights</strong><p>Examine the Journey Map to pinpoint pain points and areas where users feel positive experiences. Extract insights to enhance the overall user experience.</p></li>
              </ol>
            </Section>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="flex items-start mb-4">
              <div className="w-1 bg-black h-16 mr-3"></div>
              <h1 className="text-4xl font-bold leading-tight">User Journey<br/>Mapping</h1>
            </div>
            <Section title="Tips" icon="/assets/TipsBulb.png">
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Engage Diverse Stakeholders</strong><p>Collaborate on the journey map with various stakeholders to align and refine their views of the user experience.</p></li>
                    <li><strong>Focus on Content Before Visuals</strong><p>Don't let visuals distract from substance. Prioritise building strong content before shaping the visual story of the journey map.</p></li>
                    <li><strong>Base It on Data</strong><p>Watch out for assumptions when creating a journey map. Anchor your insights in solid data wherever possible.</p></li>
                    <li><strong>Validate and Improve with Users</strong><p>Share the journey map with users and collect feedback to ensure it accurately reflects their real experiences.</p></li>
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
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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

export default UserJourneyMappingLesson;