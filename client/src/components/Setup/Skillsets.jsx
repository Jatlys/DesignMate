import React, { useState } from 'react';
import { ArrowRight, X, Lightbulb, Code, Palette, Settings, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Skillsets = () => {
  const navigate = useNavigate();
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [modalSkill, setModalSkill] = useState(null);
  const [sidePanelSkill, setSidePanelSkill] = useState(null);

  const handleBack = () => {
    navigate('/timeline/3');
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleNext = () => {
    navigate('/project-overview');
  };

  const skills = [
    {
      id: 'python',
      name: 'Python',
      icon: <Code className="w-6 h-6" />,
      description: 'A versatile programming language perfect for data analysis, web development, and automation.',
      relevance: 'Essential for backend development, data processing, and creating intelligent features for your project.',
      difficulty: 'Beginner to Intermediate',
      timeToLearn: '2-4 months',
      resources: ['Python.org tutorials', 'Codecademy Python course', 'Real Python website'],
      keyFeatures: ['Easy to learn syntax', 'Extensive libraries', 'Great community support']
    },
    {
      id: 'webdesign',
      name: 'Web Design',
      icon: <Palette className="w-6 h-6" />,
      description: 'Creating beautiful, user-friendly interfaces and experiences for web applications.',
      relevance: 'Crucial for creating an engaging user interface that users will love to interact with.',
      difficulty: 'Beginner to Advanced',
      timeToLearn: '3-6 months',
      resources: ['Figma design tool', 'Adobe XD', 'UI/UX design courses'],
      keyFeatures: ['Visual design principles', 'User experience focus', 'Responsive design']
    },
    {
      id: 'robotics',
      name: 'Robotics',
      icon: <Settings className="w-6 h-6" />,
      description: 'Designing and programming robotic systems for automation and intelligent interactions.',
      relevance: 'Perfect for projects involving hardware integration, sensors, and automated processes.',
      difficulty: 'Intermediate to Advanced',
      timeToLearn: '6-12 months',
      resources: ['Arduino platform', 'Raspberry Pi projects', 'ROS (Robot Operating System)'],
      keyFeatures: ['Hardware-software integration', 'Sensor programming', 'Automation systems']
    }
  ];

  const toggleExpand = (skillId) => {
    setExpandedSkill(expandedSkill === skillId ? null : skillId);
  };

  const openModal = (skill) => {
    setModalSkill(skill);
  };

  const closeModal = () => {
    setModalSkill(null);
  };

  const openSidePanel = (skill) => {
    setSidePanelSkill(skill);
  };

  const closeSidePanel = () => {
    setSidePanelSkill(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-4xl mx-auto rounded-lg relative overflow-hidden">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-4 pt-8 pb-4">
        <button onClick={handleBack} className="">
          <ArrowLeft className="w-8 h-8 text-black" />
        </button>
        <button onClick={handleClose} className="">
          <X className="w-8 h-8 text-black" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-8 pt-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Lightbulb className="w-8 h-8 text-black" />
          <h1 className="text-3xl font-serif text-black">Ideal Skill Sets</h1>
        </div>

        {/* Description */}
        <p className="text-center text-sm font-serif text-gray-600 mb-12 leading-relaxed">
          Based on your project requirements, here are the<br />
          recommended skills for your team
        </p>

        {/* Skills List */}
        <div className="w-full space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="w-full">
              {/* Main Skill Card */}
              <div 
                className="bg-gray-200 rounded-full px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-300 transition-colors"
                onClick={() => toggleExpand(skill.id)}
              >
                <div className="flex items-center gap-3">
                  {skill.icon}
                  <span className="text-lg font-serif font-semibold text-black">{skill.name}</span>
                </div>
                {expandedSkill === skill.id ? 
                  <ChevronUp className="w-5 h-5 text-gray-600" /> : 
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                }
              </div>

              {/* Expandable Content */}
              {expandedSkill === skill.id && (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-serif text-gray-700 mb-3">{skill.description}</p>
                  
                  <div className="space-y-2 text-xs font-serif">
                    <div><span className="font-semibold">Difficulty:</span> {skill.difficulty}</div>
                    <div><span className="font-semibold">Time to Learn:</span> {skill.timeToLearn}</div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openModal(skill); }}
                      className="px-3 py-1 bg-blue-500 text-white text-xs font-serif rounded-full hover:bg-blue-600"
                    >
                      More Details
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); openSidePanel(skill); }}
                      className="px-3 py-1 bg-green-500 text-white text-xs font-serif rounded-full hover:bg-green-600"
                    >
                      Resources
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end p-4">
        <button onClick={handleNext}>
          <ArrowRight className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Modal */}
      {modalSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-serif font-bold text-black">{modalSkill.name}</h3>
              <button onClick={closeModal}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-3 text-sm font-serif text-gray-700">
              <p>{modalSkill.description}</p>
              <div><span className="font-semibold">Why it's relevant:</span> {modalSkill.relevance}</div>
              <div><span className="font-semibold">Difficulty:</span> {modalSkill.difficulty}</div>
              <div><span className="font-semibold">Time to Learn:</span> {modalSkill.timeToLearn}</div>
              
              <div>
                <span className="font-semibold">Key Features:</span>
                <ul className="mt-1 ml-4 list-disc">
                  {modalSkill.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Side Panel */}
      {sidePanelSkill && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeSidePanel}></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-serif font-bold text-black">{sidePanelSkill.name} Resources</h3>
              <button onClick={closeSidePanel}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-4 text-sm font-serif text-gray-700">
              <p>{sidePanelSkill.description}</p>
              
              <div>
                <h4 className="font-semibold mb-2">Learning Resources:</h4>
                <ul className="space-y-1 ml-4 list-disc">
                  {sidePanelSkill.resources.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Why it's important:</h4>
                <p>{sidePanelSkill.relevance}</p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold mb-1">Quick Facts:</h4>
                <div className="text-xs space-y-1">
                  <div>Difficulty: {sidePanelSkill.difficulty}</div>
                  <div>Time to Learn: {sidePanelSkill.timeToLearn}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skillsets;