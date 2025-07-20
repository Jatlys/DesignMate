import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Edit2 } from 'lucide-react';
import Chatbot from './Chatbot';
import { useNavigate } from 'react-router-dom';

const ViewAllProjects = () => {
  const [projectName, setProjectName] = useState('Your Projects');
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(projectName);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  // Project data without progress tracking
  const [projects] = useState([
    {
      id: 'project1',
      name: 'Project 1',
      subtitle: 'Design Innovation',
      icon: '/assets/DiscoverSmall.svg',
      color: 'text-purple-600'
    },
    {
      id: 'project2',
      name: 'Project 2',
      subtitle: 'User Experience',
      icon: '/assets/DefineSmall.svg',
      color: 'text-blue-600'
    },
    {
      id: 'project3',
      name: 'Project 3',
      subtitle: 'Product Development',
      icon: '/assets/DevelopSmall.svg',
      color: 'text-green-600'
    },
    {
      id: 'project4',
      name: 'Project 4',
      subtitle: 'Market Launch',
      icon: '/assets/DeliverSmall.svg',
      color: 'text-orange-600'
    }
  ]);

  const navigate = useNavigate();

  const handleProjectNameEdit = () => {
    if (isEditing) {
      setProjectName(editValue);
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEditValue(projectName);
    }
  };

  const handleProjectClick = (index) => {
    if (index === 0) {
      navigate('/sprint-manual');
    } else {
      alert(`Navigating to ${projects[index].name}...`);
    }
  };

  const handleBackClick = () => {
    // Navigate back to homepage
    window.location.href = '/';
  };

  const handleChatbotClick = () => {
    // Open the chatbot modal
    setIsChatbotOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackClick}
            className="transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <p className="text-gray-800 text-2xl font-bold">All Projects</p>
        </div>
        
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {/* Chatbot icon using the actual SVG file */}
          <img src="/assets/Chatbot.svg" alt="AI Mentor" className="w-10 h-10" />
        </button>
      </div>

      {/* Projects Section */}
      <div className="p-6 pt-0 bg-white space-y-4 flex-grow">
        {projects.map((project, index) => {
          return (
            <div key={project.id} className="relative">
              <button
                onClick={() => handleProjectClick(index)}
                className="w-full p-6 rounded-2xl shadow-lg transition-all duration-300 bg-white hover:shadow-xl cursor-pointer transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                      <img 
                        src={project.icon} 
                        alt={`${project.name} icon`}
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-900">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50 text-center">
        <p className="text-sm text-gray-500">
          Click on any project to view details
        </p>
      </div>

      {/* Chatbot Modal */}
      {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
};

export default ViewAllProjects;
