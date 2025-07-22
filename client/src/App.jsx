import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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

// Quiz Imports
import SuccessfullyDelivered from './components/Quiz/SuccessfullyDelivered';
import QuizContainer from './components/Quiz/QuizContainer';
import SuccessfullyCompleted from './components/Quiz/SuccessfullyCompleted';
import './components/Quiz/QuizNew.css';

// Discover Phase Imports
import Discover from './components/Discover/Discover';
import DiscoverDashboard from './components/Discover/DiscoverDashboard';
import StakeholderMappingLesson from './components/Discover/StakeholderMappingLesson';
import PersonasLesson from './components/Discover/PersonasLesson';
import ScenariosLesson from './components/Discover/ScenariosLesson';
import UserJourneyMappingLesson from './components/Discover/UserJourneyMappingLesson';
import DiscoverMethods from './components/Discover/DiscoverMethods';

// Define Phase Imports
import Define from './components/Define/Define';
import DefineDashboard from './components/Define/DefineDashboard';
import ActivityDiagramLesson from './components/Define/ActivityDiagramLesson';
import HowMightWeLesson from './components/Define/HowMightWeLesson';
import AffinityAnalysisLesson from './components/Define/AffinityAnalysisLesson';
import FiveWhysLesson from './components/Define/FiveWhysLesson';
import DefineMethods from './components/Define/DefineMethods';

// Develop Phase Imports
import Develop from './components/Develop/Develop';
import DevelopDashboard from './components/Develop/DevelopDashboard';
import CSketchingLesson from './components/Develop/CSketchingLesson';
import RealWinWorthLesson from './components/Develop/RealWinWorthLesson';
import MorphMatrixLesson from './components/Develop/MorphMatrixLesson';
import MoodboardLesson from './components/Develop/MoodboardLesson';
import DevelopMethods from './components/Develop/DevelopMethods';

// Deliver Phase Imports
import Deliver from './components/Deliver/Deliver';
import DeliverDashboard from './components/Deliver/DeliverDashboard';
import MockupsLesson from './components/Deliver/MockupsLesson';
import PhysicalModelLesson from './components/Deliver/PhysicalModelLesson';
import StoryboardingLesson from './components/Deliver/StoryboardingLesson';
import WireframingLesson from './components/Deliver/WireframingLesson';
import DeliverMethods from './components/Deliver/DeliverMethods';

// Icebreaker Imports
import IceBreakerStart from './components/IceBreaker/IceBreakerStart';
import IceBreakerQuestion1 from './components/IceBreaker/IceBreakerQuestion1';
import IceBreakerQuestion2 from './components/IceBreaker/IceBreakerQuestion2';
import IceBreakerQuestion3 from './components/IceBreaker/IcebreakerQuestion3';
import IceBreakerComplete from './components/IceBreaker/IceBreakerComplete';

// Setup Imports
import ProblemIdentification from './components/Setup/ProblemIdentification';
import Timeline1 from './components/Setup/Timeline1';
import Timeline2 from './components/Setup/Timeline2';
import Timeline3 from './components/Setup/Timeline3';
import Skillsets from './components/Setup/Skillsets';
import ProjectOverview from './components/Setup/ProjectOverview';

// Chatbot Imports
import DiscoverChatbot from './components/Discover/DiscoverChatbot';
import DefineChatbot from './components/Define/DefineChatbot';
import DevelopChatbot from './components/Develop/DevelopChatbot';
import DeliverChatbot from './components/Deliver/DeliverChatbot';

const AppRoutes = () => {
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState(() => {
    const savedLessons = localStorage.getItem('completedLessons');
    return savedLessons ? new Set(JSON.parse(savedLessons)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(Array.from(completedLessons)));
  }, [completedLessons]);

  const handleCompleteLesson = (lessonId) => {
    setCompletedLessons(prev => new Set(prev).add(lessonId));
  };

  const handleCloseDiscoverChatbot = () => {
    navigate('/discover');
  };
  const handleCloseDefineChatbot = () => {
    navigate('/define');
  };
  const handleCloseDevelopChatbot = () => {
    navigate('/develop');
  };
  const handleCloseDeliverChatbot = () => {
    navigate('/deliver');
  };

  return (
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
      <Route path="/sprint-manual" element={<SprintManual completedLessons={completedLessons} />} />
      <Route path="/view-all-projects" element={<ViewAllProjects />} />
      
      {/* Quiz Routes */}
      <Route path="/quiz" element={<SuccessfullyDelivered />} />
      <Route path="/quiz/questions" element={<QuizContainer />} />
      <Route path="/quiz/completed" element={<SuccessfullyCompleted />} />

      {/* Discover Phase Routes */}
      <Route path="/discover" element={<Discover />} />
      <Route path="/discover/dashboard" element={<DiscoverDashboard completedLessons={completedLessons} setCompletedLessons={setCompletedLessons} />} />
      <Route path="/discover/stakeholder-mapping" element={<StakeholderMappingLesson onComplete={handleCompleteLesson} />} />
      <Route path="/discover/personas" element={<PersonasLesson onComplete={handleCompleteLesson} />} />
      <Route path="/discover/scenarios" element={<ScenariosLesson onComplete={handleCompleteLesson} />} />
      <Route path="/discover/user-journey-mapping" element={<UserJourneyMappingLesson onComplete={handleCompleteLesson} />} />
      <Route path="/discover/DiscoverMethods" element={<DiscoverMethods completedLessons={completedLessons} />} />

      {/* Define Phase Routes */}
      <Route path="/define" element={<Define />} />
      <Route path="/define/dashboard" element={<DefineDashboard completedLessons={completedLessons} setCompletedLessons={setCompletedLessons} />} />
      <Route path="/define/activity-diagram" element={<ActivityDiagramLesson onComplete={handleCompleteLesson} />} />
      <Route path="/define/how-might-we" element={<HowMightWeLesson onComplete={handleCompleteLesson} />} />
      <Route path="/define/affinity-analysis" element={<AffinityAnalysisLesson onComplete={handleCompleteLesson} />} />
      <Route path="/define/5-whys" element={<FiveWhysLesson onComplete={handleCompleteLesson} />} />
      <Route path="/define/methods" element={<DefineMethods completedLessons={completedLessons} />} />
      
      {/* Develop Phase routes*/}
      <Route path="/develop" element={<Develop />} />
      <Route path="/develop/dashboard" element={<DevelopDashboard completedLessons={completedLessons} setCompletedLessons={setCompletedLessons} />} />
      <Route path="/develop/c-sketching" element={<CSketchingLesson onComplete={handleCompleteLesson} />} />
      <Route path="/develop/develop-methods" element={<DevelopMethods completedLessons={completedLessons} />} />
      <Route path="/develop/moodboard" element={<MoodboardLesson onComplete={handleCompleteLesson} />} />
      <Route path="/develop/morph-matrix" element={<MorphMatrixLesson onComplete={handleCompleteLesson} />} />
      <Route path="/develop/real-win-worth" element={<RealWinWorthLesson onComplete={handleCompleteLesson} />} />

      {/* Deliver Phase routes*/}
      <Route path="/deliver" element={<Deliver />} />
      <Route path="/deliver/dashboard" element={<DeliverDashboard completedLessons={completedLessons} setCompletedLessons={setCompletedLessons} />} />
      <Route path="/deliver/mockups" element={<MockupsLesson onComplete={handleCompleteLesson} />} />
      <Route path="/deliver/physical-model" element={<PhysicalModelLesson onComplete={handleCompleteLesson} />} />
      <Route path="/deliver/storyboarding" element={<StoryboardingLesson onComplete={handleCompleteLesson} />} />
      <Route path="/deliver/wireframing" element={<WireframingLesson onComplete={handleCompleteLesson} />} />
      <Route path="/deliver/methods" element={<DeliverMethods completedLessons={completedLessons} />} />

      {/* Chatbot Routes*/}
      <Route path="/discover/chatbot" element={<DiscoverChatbot onClose={handleCloseDiscoverChatbot} />} />
      <Route path="/define/chatbot" element={<DefineChatbot onClose={handleCloseDefineChatbot} />} />
      <Route path="/develop/chatbot" element={<DevelopChatbot onClose={handleCloseDevelopChatbot} />} />
      <Route path="/deliver/chatbot" element={<DeliverChatbot onClose={handleCloseDeliverChatbot} />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;