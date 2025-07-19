import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OnboardingPage from './components/OnboardingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import UsernamePage from './components/UsernamePage';
import RoleSelectionPage from './components/RoleSelectionPage';
import JoinorCreatePage from './components/JoinorCreatePage';
import JoinTeamPage from './components/JoinTeamPage';
import JoinedTeamPage from './components/JoinedTeamPage';
import CreateTeamPage from './components/CreateTeamPage';
import TeamCreatedPage from './components/TeamCreatedPage';
import UserProfilePage from './components/UserProfilePage';

// Define Phase Imports
import Define from './components/Define/Define';
import DefineDashboard from './components/Define/DefineDashboard';
import ActivityDiagramLesson from './components/Define/ActivityDiagramLesson';
import HowMightWeLesson from './components/Define/HowMightWeLesson';
import AffinityAnalysisLesson from './components/Define/AffinityAnalysisLesson';
import FiveWhysLesson from './components/Define/FiveWhysLesson';
import Homepage from './components/Homepage';
import Methods from './components/Define/DefineMethods';

// Develop Phase Imports
import Develop from './components/Develop/Develop';
import DevelopDashboard from './components/Develop/DevelopDashboard';
import DevelopMethods from './components/Develop/DevelopMethods';
import CSketchingLesson from './components/Develop/CSketchingLesson';
import RealWinWorthLesson from './components/Develop/RealWinWorthLesson';
import MorphMatrixLesson from './components/Develop/MorphMatrixLesson';
import MoodboardLesson from './components/Develop/MoodboardLesson';

import './index.css';

function App() {
  const [completedLessons, setCompletedLessons] = useState(new Set());

  const handleCompleteLesson = (lessonId) => {
    setCompletedLessons(prev => new Set(prev).add(lessonId));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/username" element={<UsernamePage />} />
          <Route path="/role-selection" element={<RoleSelectionPage />} />
          <Route path="/joinorcreate-team" element={<JoinorCreatePage />} />
          <Route path="/join-team" element={<JoinTeamPage />} />
          <Route path="/joined-team/:teamCode" element={<JoinedTeamPage />} />
          <Route path="/create-team" element={<CreateTeamPage />} />
          <Route path="/team-created/:teamCode" element={<TeamCreatedPage />} />
          <Route path="/profile" element={<UserProfilePage />} />

          {/* Define Phase Routes */}
          <Route path="/define" element={<Define />} />
          <Route path="/define/dashboard" element={<DefineDashboard completedLessons={completedLessons} setCompletedLessons={setCompletedLessons} />} />
          <Route path="/define/activity-diagram" element={<ActivityDiagramLesson onComplete={handleCompleteLesson} />} />
          <Route path="/define/how-might-we" element={<HowMightWeLesson onComplete={handleCompleteLesson} />} />
          <Route path="/define/affinity-analysis" element={<AffinityAnalysisLesson onComplete={handleCompleteLesson} />} />
          <Route path="/define/5-whys" element={<FiveWhysLesson onComplete={handleCompleteLesson} />} />
          <Route path="/define/methods" element={<Methods completedLessons={completedLessons} />} />

          {/* Develop Phase Routes */}
          <Route path="/develop" element={<Develop />} />
          <Route path="/develop/dashboard" element={<DevelopDashboard completedLessons={completedLessons} setCompletedLessons={setCompletedLessons} />} />
          <Route path="/develop/methods" element={<DevelopMethods completedLessons={completedLessons} />} />
          <Route path="/Develop/c-sketching" element={<CSketchingLesson onComplete={handleCompleteLesson} />} />
          <Route path="/Develop/real-win-worth" element={<RealWinWorthLesson onComplete={handleCompleteLesson} />} />
          <Route path="/Develop/morph-matrix" element={<MorphMatrixLesson onComplete={handleCompleteLesson} />} />
          <Route path="/Develop/moodboard" element={<MoodboardLesson onComplete={handleCompleteLesson} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;