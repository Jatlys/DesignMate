import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SprintManual from './components/SprintManual';
import Homepage from './components/Homepage';
import ViewAllProjects from './components/ViewAllProjects';
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
import DefineMethods from './components/Define/DefineMethods';

// Discover Phase Imports
import Discover from './components/Discover/Discover';
import DiscoverDashboard from './components/Discover/DiscoverDashboard';
import StakeholderMappingLesson from './components/Discover/StakeholderMappingLesson';
import PersonasLesson from './components/Discover/PersonasLesson';
import ScenariosLesson from './components/Discover/ScenariosLesson';
import UserJourneyMappingLesson from './components/Discover/UserJourneyMappingLesson';
import DiscoverMethods from './components/Discover/DiscoverMethods';

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
          {/* Icebreaker Routes */}
          <Route path="/icebreaker/start" element={<IceBreakerStart />} />
          <Route path="/icebreaker/question/1" element={<IceBreakerQuestion1 />} />
          <Route path="/icebreaker/question/2" element={<IceBreakerQuestion2 />} />
          <Route path="/icebreaker/question/3" element={<IceBreakerQuestion3 />} />
          <Route path="/icebreaker/complete" element={<IceBreakerComplete />} />

          {/* Setup Routes */}
          <Route path="/problem-identification" element={<ProblemIdentification />} />
          <Route path="/timeline/1" element={<Timeline1 />} />
          <Route path="/timeline/2" element={<Timeline2 />} />
          <Route path="/timeline/3" element={<Timeline3 />} />
          <Route path="/skillsets" element={<Skillsets />} />
          <Route path="/project-overview" element={<ProjectOverview />} />
          {/* Define Phase Routes */}
          <Route path="/define" element={<Define />} />
          <Route path="/define/dashboard" element={<DefineDashboard completedLessons={completedLessons} setCompletedLessons={setCompletedLessons} />} />
          <Route path="/define/activity-diagram" element={<ActivityDiagramLesson onComplete={handleCompleteLesson} />} />
          <Route path="/define/how-might-we" element={<HowMightWeLesson onComplete={handleCompleteLesson} />} />
          <Route path="/define/affinity-analysis" element={<AffinityAnalysisLesson onComplete={handleCompleteLesson} />} />
          <Route path="/define/5-whys" element={<FiveWhysLesson onComplete={handleCompleteLesson} />} />
          <Route path="/define/methods" element={<DefineMethods completedLessons={completedLessons} />} />

          {/* Discover Phase Routes */}
          <Route path="/discover" element={<Discover />} />
          <Route path="/discover/dashboard" element={<DiscoverDashboard completedLessons={completedLessons} setCompletedLessons={setCompletedLessons} />} />
          <Route path="/discover/stakeholder-mapping" element={<StakeholderMappingLesson onComplete={handleCompleteLesson} />} />
          <Route path="/discover/personas" element={<PersonasLesson onComplete={handleCompleteLesson} />} />
          <Route path="/discover/scenarios" element={<ScenariosLesson onComplete={handleCompleteLesson} />} />
          <Route path="/discover/user-journey-mapping" element={<UserJourneyMappingLesson onComplete={handleCompleteLesson} />} />
          <Route path="/discover/methods" element={<DiscoverMethods completedLessons={completedLessons} />} />

          <Route path="/sprint-manual" element={<SprintManual />} />
          <Route path="/view-all-projects" element={<ViewAllProjects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;