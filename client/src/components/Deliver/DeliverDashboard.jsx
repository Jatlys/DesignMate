import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Bot } from 'lucide-react';
import DeliverChatbot from './DeliverChatbot';

const lessons = [
  {
    id: 'Storyboarding',
    title: 'Storyboarding',
    description: '...explanation of storyboarding',
    path: '/deliver/storyboarding',
    methodKey: 'storyboarding'
  },
  {
    id: 'Wireframing',
    title: 'Wireframing',
    description: '...explanation of wireframing',
    path: '/deliver/wireframing',
    methodKey: 'wireframing'
  },
  {
    id: 'Physical Model',
    title: 'Physical Model',
    description: '...explanation of physical model',
    path: '/deliver/physical-model',
    methodKey: 'physical-model'
  },
  {
    id: 'Mockups',
    title: 'Mockups',
    description: '...explanation of mockups',
    path: '/deliver/mockups',
    methodKey: 'mockups'
  }
];

const LessonCard = ({ lesson, isCompleted, onToggleComplete }) => {
  const navigate = useNavigate();
  const { title, description, path, methodKey } = lesson;

  const handleReviewMethods = () => {
    navigate('/deliver/methods', { 
      state: { currentMethod: methodKey } 
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-5 mb-4 transition-all duration-300 ${isCompleted ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-200'}`}>
      <div className="flex justify-between items-start">
        <div className="pr-4">
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <div 
          onClick={() => onToggleComplete(lesson.id)}
          className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}>
          {isCompleted && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        {isCompleted ? (
          <div className="flex w-full space-x-3">
            <button
              onClick={() => navigate(path)}
              className="w-1/2 bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              Review Lessons
            </button>
            <button
              onClick={handleReviewMethods}
              className="w-1/2 bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              Review Methods
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">5 Lessons</p>
            <button
              onClick={() => navigate(path)}
              className="bg-black text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-800 transition-colors"
            >
              Start Learning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DeliverDashboard = ({ completedLessons, setCompletedLessons }) => {
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

  const deliverLessonIds = new Set(lessons.map(l => l.id));
  const completedDeliverLessons = [...completedLessons].filter(id => deliverLessonIds.has(id));
  const completionPercentage = lessons.length > 0 ? (completedDeliverLessons.length / lessons.length) * 100 : 0;

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-24 pb-8 overflow-hidden">
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-md mx-auto">
        <button onClick={() => navigate('/')} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <X className="w-10 h-10 text-gray-800" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <Bot className="w-10 h-10 text-gray-800" />
        </button>
      </header>

      <div className="w-full max-w-sm h-full flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-serif text-black">Deliver</h1>
          <p className="text-gray-600">Testing and implementing solutions</p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div className="bg-black h-2.5 rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
        </div>

        <main className="flex-grow overflow-y-auto pr-2 -mr-2">
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
              className="w-full mt-4 bg-black text-white font-semibold py-3 px-4 rounded-lg text-lg hover:bg-gray-800 transition-colors"
            >
              Complete Sprint
            </button>
          )}
        </main>
      </div>

      {isChatbotOpen && <DeliverChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
};

export default DeliverDashboard;