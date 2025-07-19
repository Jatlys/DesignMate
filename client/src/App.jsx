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
import Define from './components/Define/Define';
import DefineDashboard from './components/define/DefineDashboard';
import ActivityDiagramLesson from './components/define/ActivityDiagramLesson';
import HowMightWeLesson from './components/Define/HowMightWeLesson';
import AffinityAnalysisLesson from './components/Define/AffinityAnalysisLesson';
import FiveWhysLesson from './components/Define/FiveWhysLesson';
import Homepage from './components/Homepage';
import Methods from './components/Define/Methods';
import './index.css';

import IceBreakerStart from './components/IceBreaker/IceBreakerStart';
import IceBreakerQuestion1 from './components/IceBreaker/IceBreakerQuestion1';
import IceBreakerQuestion2 from './components/IceBreaker/IceBreakerQuestion2';
import IceBreakerQuestion3 from './components/IceBreaker/IceBreakerQuestion3';  
import IceBreakerComplete from './components/IceBreaker/IceBreakerComplete'; 
import ProblemIdentification from './components/Setup/ProblemIdentification';
import Timeline1 from './components/Setup/Timeline1';
import Timeline2 from './components/Setup/Timeline2';
import Timeline3 from './components/Setup/Timeline3';
import Skillsets from './components/Setup/Skillsets';
import ProjectOverview from './components/Setup/ProjectOverview'; 

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
          <Route path="/define" element={<Define />} />
          <Route path="/define/dashboard" element={<DefineDashboard completedLessons={completedLessons} setCompletedLessons={setCompletedLessons} />} />
          <Route path="/define/activity-diagram" element={<ActivityDiagramLesson onComplete={handleCompleteLesson} />} />
          <Route path="/define/how-might-we" element={<HowMightWeLesson onComplete={handleCompleteLesson} />} />
          <Route path="/define/affinity-analysis" element={<AffinityAnalysisLesson onComplete={handleCompleteLesson} />} />
          <Route path="/define/5-whys" element={<FiveWhysLesson onComplete={handleCompleteLesson} />} />
          <Route path="/define/methods" element={<Methods completedLessons={completedLessons} />} />
          <Route path="/icebreaker/start" element={<IceBreakerStart />} />
          <Route path="/icebreaker/question/1" element={<IceBreakerQuestion1 />} />
          <Route path="/icebreaker/question/2" element={<IceBreakerQuestion2 />} />
          <Route path="/icebreaker/question/3" element={<IceBreakerQuestion3 />} />
          <Route path="/icebreaker/complete" element={<IceBreakerComplete />} />  
          <Route path="/problem-identification" element={<ProblemIdentification />} />
<Route path="/timeline/1" element={<Timeline1 />} />
<Route path="/timeline/2" element={<Timeline2 />} />
<Route path="/timeline/3" element={<Timeline3 />} />
<Route path="/skillsets" element={<Skillsets />} />
<Route path="/project-overview" element={<ProjectOverview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;