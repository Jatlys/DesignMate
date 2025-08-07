import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot } from 'lucide-react';
import DevelopChatbot from './DevelopChatbot';

const lessons = [
  {
    id: 'C-Sketching (6-3-5)',
    title: 'C-Sketching (6-3-5)',
    description: 'A quick, iterative sketching method to generate a wide range of ideas.',
    path: '/develop/c-sketching',
    methodKey: 'c-sketching',
    hasReviewMethods: true
  },
  {
    id: 'Real, Win, Worth',
    title: 'Real-Win-Worth',
    description: 'A framework to evaluate the feasibility and potential of new ideas.',
    path: '/develop/real-win-worth',
    methodKey: 'real-win-worth',
    hasReviewMethods: true
  },
  {
    id: 'Morphological Matrix',
    title: 'Morph Matrix',
    description: 'A creative tool to explore new combinations of product attributes.',
    path: '/develop/morph-matrix',
    methodKey: 'morph-matrix',
    hasReviewMethods: true
  },
  {
    id: 'Moodboard',
    title: 'Moodboard',
    description: 'A visual collection of images and materials to define a project\'s style.',
    path: '/develop/moodboard',
    methodKey: 'moodboard',
    hasReviewMethods: false
  }
];

const LessonCard = ({ lesson, isCompleted, onToggleComplete }) => {
  const navigate = useNavigate();
  const { title, description, path, methodKey, hasReviewMethods } = lesson;

  const handleReviewMethods = () => {
    navigate('/develop/methods', { 
      state: { currentMethod: methodKey } 
    });
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-4 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <input 
          type="checkbox" 
          checked={isCompleted} 
          onChange={() => onToggleComplete(lesson.id)}
          className="form-checkbox h-5 w-5 text-blue-600 rounded cursor-pointer focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        {isCompleted ? (
          <div className="flex w-full space-x-2">
            <button 
              onClick={() => navigate(path)}
              className={`bg-green-100 text-green-800 font-semibold py-2 px-4 rounded-lg text-sm transition-colors hover:bg-green-200 ${
                hasReviewMethods ? 'w-1/2' : 'w-full'
              }`}
            >
              Review Lesson
            </button>
            {hasReviewMethods && (
              <button 
                onClick={handleReviewMethods}
                className="bg-green-100 text-green-800 font-semibold py-2 px-4 rounded-lg text-sm w-1/2 transition-colors hover:bg-green-200"
              >
                Review Methods
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500">{`${lesson.description.split(' ').length} words`}</p>
            <button 
              onClick={() => navigate(path)}
              className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors hover:bg-black"
            >
              Start Learning
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const DevelopDashboard = ({ completedLessons, setCompletedLessons }) => {
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

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-24 pb-8">
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-md mx-auto">
        <button onClick={() => navigate('/develop')} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-10 h-10 text-gray-800" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <Bot className="w-10 h-10 text-gray-800" />
        </button>
      </header>

      <main className="w-full max-w-sm flex-grow flex flex-col">
        <div className="flex items-center mb-6">
          <img src="/assets/DevelopSmall.svg" alt="Develop phase icon" className="w-12 h-12 mr-4" />
          <div>
            <h1 className="text-3xl font-serif text-black">Develop</h1>
            <p className="text-md text-gray-600">Ideating and prototyping solutions</p>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
          {lessons.map(lesson => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson} 
              isCompleted={completedLessons.has(lesson.id)} 
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      </main>

      {isChatbotOpen && <DevelopChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
};

export default DevelopDashboard;