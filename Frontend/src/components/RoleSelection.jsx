// src/components/RoleSelection.jsx

import React from 'react';
// Humne jo library install ki thi, usse icons import kar rahe hain
import { FaUserFriends, FaCog, FaInfoCircle } from 'react-icons/fa';

const RoleSelection = () => {
  return (
    <div className="content-wrapper">
      <div className="content-wrapper">
        <h1>Welcome to KitchenFlow</h1>
        <p className="subtitle">Select your role to continue</p>

        <div className="cards-container">
          {/* Student Card */}
          <div className="role-card">
            <div className="icon-wrapper student-icon">
              <FaUserFriends size={28} />
            </div>
            <div className="text-content">
              <h2>Student</h2>
              <p>View kitchen teams and submit skip requests</p>
            </div>
          </div>

          {/* Coordinator Card */}
          <div className="role-card">
            <div className="icon-wrapper coordinator-icon">
              <FaCog size={28} />
            </div>
            <div className="text-content">
              <h2>Coordinator</h2>
              <p>Manage skip requests and oversee kitchen duties</p>
            </div>
          </div>

          {/* Info Card */}
          <div className="info-card">
            <div className="icon-wrapper info-icon">
              <FaInfoCircle size={24} />
            </div>
            <div className="text-content">
              <h3>Getting Started</h3>
              <p>
                This is a demo application. Students can view kitchen schedules
                and request skips, while coordinators have additional privileges
                to manage requests and oversee operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;