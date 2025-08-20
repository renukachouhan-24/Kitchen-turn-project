// // src/App.jsx

// import { Routes, Route } from 'react-router-dom';
// import RoleSelection from './components/RoleSelection';
// import StudentDashboard from './components/StudentDashboard';
// import SkipRequest from './components/SkipRequest';
// import CoordinatorPanel from './components/CoordinatorPanel'; // Naya component import karein
// import './App.css';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<RoleSelection />} />
//       <Route path="/dashboard" element={<StudentDashboard />} />
//       <Route path="/skip-request" element={<SkipRequest />} />
//       <Route path="/coordinator" element={<CoordinatorPanel />} /> {/* Naya route add karein */}
//     </Routes>
//   );
// }

// export default App;

// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import StudentDashboard from './components/StudentDashboard';
import SkipRequest from './components/SkipRequest';
import CoordinatorPanel from './components/CoordinatorPanel';
import TodayKitchenTeam from './components/TodayKitchenTeam'; // Naya component import karein
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelection />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/skip-request" element={<SkipRequest />} />
      <Route path="/coordinator" element={<CoordinatorPanel />} />
      <Route path="/today-team" element={<TodayKitchenTeam />} /> {/* Naya route add karein */}
    </Routes>
  );
}

export default App;