import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GeneralChatbot from '../GeneralChatbot';

const lessons = [
  {
    id: 'Stakeholder Mapping',
    title: 'Stakeholder Mapping',
    description: '...explanation of stakeholder mapping',
    path: '/discover/stakeholder-mapping',
    methodKey: 'stakeholder-mapping',
    hasReviewMethods: true
  },
  {
    id: 'Personas',
    title: 'Personas',
    description: '...explanation of personas',
    path: '/discover/personas',
    methodKey: 'personas',
    hasReviewMethods: true
  },
  {
    id: 'Scenarios',
    title: 'Scenarios',
    description: '...explanation of scenarios',
    path: '/discover/scenarios',
    methodKey: 'scenarios',
    hasReviewMethods: true
  },
  {
    id: 'User Journey Mapping',
    title: 'User Journey Mapping',
    description: '...explanation of user journey mapping',
    path: '/discover/user-journey-mapping',
    methodKey: 'user-journey-mapping',
    hasReviewMethods: true
  }
];

const LessonCard = ({ lesson, isCompleted, onToggleComplete }) => {
  const navigate = useNavigate();
  const { title, description, path, methodKey } = lesson;

  const handleReviewMethods = () => {
    navigate('/discover/methods', { 
      state: { currentMethod: methodKey } 
    });
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <input 
          type="checkbox" 
          checked={isCompleted} 
          onChange={() => onToggleComplete(lesson.id)}
          className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer"
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        {isCompleted ? (
          <div className="flex w-full space-x-2">
            <button 
              onClick={() => navigate(path)}
              className="bg-green-200 text-green-800 font-semibold py-2 px-4 rounded-lg text-sm w-1/2"
            >
              Review Lessons
            </button>
            <button 
              onClick={handleReviewMethods}
              className="bg-green-200 text-green-800 font-semibold py-2 px-4 rounded-lg text-sm w-1/2"
            >
              Review Methods
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500">5 Lessons</p>
            <button 
              onClick={() => navigate(path)}
              className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-lg text-sm"
            >
              Start Learning
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const DiscoverDashboard = ({ completedLessons, setCompletedLessons }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleToggleComplete = (lessonId) => {
    const newSet = new Set(completedLessons);
    if (newSet.has(lessonId)) {
      newSet.delete(lessonId);
    } else {
      newSet.add(lessonId);
    }
    setCompletedLessons(newSet);
  };

  const discoverLessonIds = new Set(lessons.map(l => l.id));
  const completedDiscoverLessons = [...completedLessons].filter(id => discoverLessonIds.has(id));
  const completionPercentage = lessons.length > 0 ? (completedDiscoverLessons.length / lessons.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 max-w-sm mx-auto relative">
      <header className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('/')}>
          <img src="/assets/Home.svg" alt="Home" className="w-8 h-8" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-2">
          <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-12 h-12" />
        </button>
      </header>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
      </div>

      <div className="flex items-center mb-4">
        <img src="/assets/DiscoverSmall.svg" alt="Discover phase icon" className="w-12 h-12 mr-2" />
        <div>
          <h1 className="text-2xl font-serif">Discover</h1>
          <p className="text-sm text-gray-600">Understanding users and empathising with their needs</p>
        </div>
      </div>

      <main className="flex-grow pb-16">
          {lessons.map(lesson => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson} 
              isCompleted={completedLessons.has(lesson.id)} 
              onToggleComplete={handleToggleComplete}
            />
          ))}
        {completionPercentage === 100 && (
          <button
            onClick={() => navigate('/sprint-manual')}
            className="w-full mt-4 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg text-lg"
          >
            Complete
          </button>
        )}
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Need a hand?</h3>
            <p className="text-sm">Our AI Mentor is here to help you with the discovery phase.</p>
          </div>
          <button onClick={() => setIsChatbotOpen(true)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
            Chat with AI Mentor
          </button>
        </div>
      </main>

      <footer className="absolute bottom-4 left-4">
        <button onClick={() => navigate('/sprint-manual')}>
          <ArrowLeft className="w-8 h-8 text-black" />
        </button>
      </footer>
      {isChatbotOpen && <GeneralChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
};

export default DiscoverDashboard;