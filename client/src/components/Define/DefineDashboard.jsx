import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, CheckCircle } from 'lucide-react';
import DefineChatbot from './DefineChatbot';

const lessons = [
  { id: 'Activity Diagram', title: 'Activity Diagram', path: '/define/activity-diagram', methodKey: 'activity-diagram' },
  { id: 'How Might We', title: 'How Might We', path: '/define/how-might-we', methodKey: 'how-might-we' },
  { id: 'Affinity Analysis', title: 'Affinity Analysis', path: '/define/affinity-analysis', methodKey: 'affinity-analysis' },
  { id: '5 Whys', title: '5 Whys', path: '/define/5-whys', methodKey: '5-whys' },
];

const LessonCard = ({ lesson, isCompleted, onStart, onReview, onReviewMethods }) => (
  <div className={`bg-white rounded-xl shadow-sm p-4 mb-4 border ${isCompleted ? 'border-green-400' : 'border-gray-200'}`}>
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-lg text-gray-900">{lesson.title}</h3>
      {isCompleted && <CheckCircle className="w-6 h-6 text-green-500" />}
    </div>
    <div className="flex justify-end items-center mt-4 space-x-2">
      {isCompleted ? (
        <>
          <button 
            onClick={() => onReview(lesson.path)}
            className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg text-sm"
          >
            Review Lesson
          </button>
          <button 
            onClick={() => onReviewMethods(lesson.methodKey)}
            className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg text-sm"
          >
            Review Methods
          </button>
        </>
      ) : (
        <button 
          onClick={() => onStart(lesson.path)}
          className="bg-black text-white font-semibold py-2 px-4 rounded-lg text-sm"
        >
          Start Learning
        </button>
      )}
    </div>
  </div>
);

const DefineDashboard = ({ completedLessons, setCompletedLessons }) => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const defineLessonIds = new Set(lessons.map(l => l.id));
  const completedDefineLessons = [...completedLessons].filter(id => defineLessonIds.has(id));
  const allLessonsCompleted = completedDefineLessons.length === lessons.length;

  const handleStartLesson = (path) => navigate(path);
  const handleReviewLesson = (path) => navigate(path);
  const handleReviewMethods = (methodKey) => {
    navigate('/define/methods', { state: { currentMethod: methodKey } });
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-24 pb-8">
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-md mx-auto">
        <button onClick={() => navigate('/sprint-manual')} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-10 h-10 text-gray-800" />
        </button>
        <button onClick={() => setIsChatbotOpen(true)} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
          <Bot className="w-10 h-10 text-gray-800" />
        </button>
      </header>

      <main className="w-full max-w-sm flex-grow flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-black">Define</h1>
          <p className="text-gray-600 mt-1">Synthesising observations into problems.</p>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
          {lessons.map(lesson => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson} 
              isCompleted={completedLessons.has(lesson.id)} 
              onStart={handleStartLesson}
              onReview={handleReviewLesson}
              onReviewMethods={handleReviewMethods}
            />
          ))}
          {allLessonsCompleted && (
            <button
              onClick={() => navigate('/sprint-manual')}
              className="w-full mt-4 bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-green-700 transition-colors"
            >
              Phase Complete
            </button>
          )}
        </div>
      </main>

      {isChatbotOpen && <DefineChatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
};

export default DefineDashboard;