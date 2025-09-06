import { Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import StudentDashboard from './components/StudentDashboard';
import SkipRequest from './components/SkipRequest';
import TodayKitchenTeam from './components/TodayKitchenTeam';
import Register from './components/Register';
import CoordinatorRequestPanel from './components/CoordinatorRequestPanel';
import './App.css';
import LoginPage from './components/LoginPage';
import UserManagement from './components/UserManagement';

function App() {
  return (
    // YAHAN PAR <Router> NAHI HONA CHAHIYE
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/skip-request" element={<SkipRequest />} />
      <Route path="/coordinator" element={<CoordinatorRequestPanel />} />
      <Route path="/today-team" element={<TodayKitchenTeam />} />
      <Route path="/register" element={<Register />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/" element={<RoleSelection />} /> 
      <Route path="/user-management" element={<UserManagement />} />
    </Routes>
  );
}

export default App;



