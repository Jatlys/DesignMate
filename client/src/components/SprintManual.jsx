import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Edit2, Lock } from 'lucide-react';
import Chatbot from './Chatbot';

const SprintManual = ({ completedLessons = new Set() }) => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('Project 1');
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(projectName);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const phaseLessons = {
    discover: ['Stakeholder Mapping', 'Personas', 'Scenarios', 'User Journey Mapping'],
    define: ['Activity Diagram', 'How Might We', 'Affinity Analysis', '5 Whys'],
    develop: ['C-Sketching (6-3-5)', 'Real, Win, Worth', 'Morphological Matrix', 'Moodboard'],
    deliver: ['Storyboarding', 'Wireframing', 'Physical Model', 'Mockups'],
  };

  const calculateProgress = (phaseId) => {
    if (!phaseLessons[phaseId]) return 0;
    const lessonsForPhase = phaseLessons[phaseId];
    const completedCount = lessonsForPhase.filter(lesson => completedLessons.has(lesson)).length;
    return Math.round((completedCount / lessonsForPhase.length) * 100);
  };

  const phases = [
    {
      id: 'discover',
      name: 'Discover',
      subtitle: 'With Empathy',
      progress: calculateProgress('discover'),
      icon: '/assets/DiscoverSmall.svg',
      color: 'text-purple-600',
    },
    {
      id: 'define',
      name: 'Define',
      subtitle: 'With Mindfulness',
      progress: calculateProgress('define'),
      icon: '/assets/DefineSmall.svg',
      color: 'text-blue-600',
    },
    {
      id: 'develop',
      name: 'Develop',
      subtitle: 'With Joyfulness',
      progress: calculateProgress('develop'),
      icon: '/assets/DevelopSmall.svg',
      color: 'text-green-600',
    },
    {
      id: 'deliver',
      name: 'Deliver',
      subtitle: 'With Non-attachment',
      progress: calculateProgress('deliver'),
      icon: '/assets/DeliverSmall.svg',
      color: 'text-orange-600',
    },
  ];

  // Calculate overall sprint progress
  const sprintProgress = Math.round(
    phases.reduce((sum, phase) => sum + phase.progress, 0) / phases.length
  );

  // Determine which phases are unlocked
  const getUnlockedPhases = () => {
    const unlocked = [0]; // First phase always unlocked
    
    for (let i = 0; i < phases.length - 1; i++) {
      if (phases[i].progress === 100) {
        unlocked.push(i + 1);
      } else {
        break;
      }
    }
    
    return unlocked;
  };

  const unlockedPhases = getUnlockedPhases();

  const handleProjectNameEdit = () => {
    if (isEditing) {
      setProjectName(editValue);
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEditValue(projectName);
    }
  };

  const handlePhaseClick = (phaseIndex) => {
    if (unlockedPhases.includes(phaseIndex)) {
      const phase = phases[phaseIndex];
      
      // Navigate to the appropriate phase page
      switch(phase.id) {
        case 'discover':
          navigate('/discover');
          break;
        case 'define':
          navigate('/define');
          break;
        case 'develop':
          navigate('/develop');
          break;
        case 'deliver':
          navigate('/deliver');
          break;
        default:
          break;
      }
    }
  };

  const handleHomeClick = () => {
    // Navigate to homepage using window.location
    navigate('/');
  };

  const handleChatbotClick = () => {
    // Open the chatbot modal
    setIsChatbotOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Project Header */}
      <div className="bg-white p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleHomeClick}
              className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Home size={24} className="text-gray-600" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="text-2xl font-bold text-black border-b border-blue-500 bg-transparent outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleProjectNameEdit()}
                    onBlur={handleProjectNameEdit}
                    autoFocus
                  />
                ) : (
                  <h1 className="text-2xl font-serif text-black">{projectName}</h1>
                )}
                <button
                  onClick={handleProjectNameEdit}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <Edit2 size={18} className="text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600 text-lg mt-1">Sprint Manual</p>
            </div>
          </div>
          
          <button
            onClick={handleChatbotClick}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {/* Chatbot icon using the actual SVG file */}
            <img src="/assets/Chatbot.svg" alt="AI Mentor" className="w-10 h-10" />
          </button>
        </div>
      </div>

      {/* Sprint Progress Section */}
      <div className="p-6 bg-gray-50">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Sprint Progress</h2>
            <p className="text-gray-500 text-sm">Overall Completion</p>
          </div>
          
          <div className="flex items-center justify-end mb-2">
            <span className="text-lg font-semibold text-gray-900">{sprintProgress}% Completed</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${sprintProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Phases Section */}
      <div className="p-6 bg-gray-50 space-y-4">
        {phases.map((phase, index) => {
          const isUnlocked = unlockedPhases.includes(index);
          const isCompleted = phase.progress === 100;
          
          return (
            <div key={phase.id} className="relative">
              <button
                onClick={() => handlePhaseClick(index)}
                disabled={!isUnlocked}
                className={`w-full p-6 rounded-2xl shadow-lg transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-white hover:shadow-xl cursor-pointer transform hover:-translate-y-1'
                    : 'bg-gray-200 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 flex items-center justify-center`}>
                      <img 
                        src={phase.icon} 
                        alt={`${phase.name} icon`}
                        className={`w-8 h-8 ${isUnlocked ? '' : 'grayscale opacity-50'}`}
                      />
                    </div>
                    <div className="text-left">
                      <h3 className={`text-lg font-bold ${
                        isUnlocked ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {phase.name}
                      </h3>
                      <p className={`text-sm ${
                        isUnlocked ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {phase.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {!isUnlocked && (
                      <Lock size={20} className="text-gray-400" />
                    )}
                    <span className={`text-lg font-semibold ${
                      isUnlocked ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                      {phase.progress}%
                    </span>
                  </div>
                </div>
                
                {/* Individual phase progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isUnlocked ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    style={{ width: `${phase.progress}%` }}
                  ></div>
                </div>
              </button>
              
              {/* Completion checkmark */}
              {isCompleted && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Complete Sprint Button Section */}
      {sprintProgress === 100 && (
        <div className="p-6 bg-gray-50">
          <button
            onClick={() => navigate('/quiz')}
            className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg text-lg hover:bg-green-700 transition-colors"
          >
            Complete Sprint & Start Quiz
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="p-6 bg-gray-50 text-center">
        <p className="text-sm text-gray-500">
          Complete each phase to unlock the next one
        </p>
      </div>

      {/* Chatbot Modal */}
      {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
};

export default SprintManual;