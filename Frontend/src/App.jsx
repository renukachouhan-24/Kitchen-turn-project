import { Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import StudentDashboard from './components/StudentDashboard';
import SkipRequest from './components/SkipRequest';
// import CoordinatorPanel from './components/CoordinatorPanel'; // Hata diya gaya hai
import TodayKitchenTeam from './components/TodayKitchenTeam';
import Register from './components/Register';
import CoordinatorRequestPanel from './components/CoordinatorRequestPanel';
import Navbar from './components/Navbar'; // Ab yahi main coordinator view hai
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelection />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/skip-request" element={<SkipRequest />} />
      {/* Ab /coordinator path seedhe CoordinatorRequestPanel ko render karega */}
      <Route path="/coordinator" element={<CoordinatorRequestPanel />} />
      {/* /coordinator-requests route ki ab zarurat nahi hai, ya to hata sakte hain
          ya ise rehne de sakte hain agar future mein direct access ki zarurat ho */}
      {/* <Route path="/coordinator-requests" element={<CoordinatorRequestPanel/>}/> */}
      <Route path="/today-team" element={<TodayKitchenTeam />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
export default App;