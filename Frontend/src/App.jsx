


import { Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import StudentDashboard from './components/StudentDashboard';
import SkipRequest from './components/SkipRequest';
import CoordinatorPanel from './components/CoordinatorPanel';
import TodayKitchenTeam from './components/TodayKitchenTeam'; // Coordinator Management View
// import StudentViewKitchenTeam from './components/StudentViewKitchenTeam'; // REMOVED: No longer needed as TodayKitchenTeam will be the management view
import Register from './components/Register';
import CoordinatorRequestPanel from './components/CoordinatorRequestPanel';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelection />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/skip-request" element={<SkipRequest />} />
      <Route path="/coordinator" element={<CoordinatorPanel />} />
      <Route path="/coordinator-requests" element={<CoordinatorRequestPanel/>}/>
      <Route path="/today-team" element={<TodayKitchenTeam />} /> {/* UPDATED: This is now the management page */}
      {/* <Route path="/today-team-view" element={<StudentViewKitchenTeam />} /> */} {/* REMOVED: No longer needed */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
export default App;