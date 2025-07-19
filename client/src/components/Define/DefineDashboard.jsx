import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Chatbot from './DefineChatbot';

const lessons = [
  {
    id: 'Activity Diagram',
    title: 'Activity Diagram',
    description: '...explanation of Activity Diagram',
    path: '/define/activity-diagram'
  },
  {
    id: 'How Might We',
    title: 'How might we',
    description: '...explanation of HMW',
    path: '/define/how-might-we'
  },
  {
    id: 'Affinity Analysis',
    title: 'Affinity Analysis',
    description: '...explanation of Affinity Analysis',
    path: '/define/affinity-analysis'
  },
  {
    id: '5 Whys',
    title: '5 Whys',
    description: '...explanation of 5 whys',
    path: '/define/5-whys'
  }
];

const LessonCard = ({ lesson, isCompleted, onToggleComplete }) => {
  const navigate = useNavigate();
  const { title, description, path } = lesson;

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
              onClick={() => navigate('/define/methods')}
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

const DefineDashboard = ({ completedLessons, setCompletedLessons }) => {
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

  const completionPercentage = (completedLessons.size / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 max-w-sm mx-auto relative">
      <header className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('/')}>
          <img src="/assets/Home.svg" alt="Home" className="w-8 h-8" />
        </button>
        <button onClick={() => navigate('/define/chatbot')} className="p-2">
          <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-10 h-10" />
        </button>
      </header>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
      </div>

      <div className="flex items-center mb-4">
        <img src="/assets/DefineSmall.svg" alt="Define phase icon" className="w-12 h-12 mr-2" />
        <div>
          <h1 className="text-2xl font-serif">Define</h1>
          <p className="text-sm text-gray-600">Interpret and reframe needs and map them into activities, functions and representations</p>
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
      </main>

      <footer className="absolute bottom-4 left-4">
        <button onClick={() => navigate('/define')}>
          <ArrowLeft className="w-8 h-8 text-black" />
        </button>
      </footer>
      {isChatbotOpen && <Chatbot onClose={() => navigate('/define')} />}
    </div>
  );
};

export default DefineDashboard;
