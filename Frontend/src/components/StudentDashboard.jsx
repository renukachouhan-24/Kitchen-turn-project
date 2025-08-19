// src/components/StudentDashboard.jsx

import React from 'react';
import { FaUsers, FaCalendarAlt, FaSearch, FaRegCompass, FaRegPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './StudentDashboard.module.css';

// ... (Dummy Data waisa hi rahega) ...
const todayTeam = [ { id: 1, name: 'Alice Johnson' }, { id: 2, name: 'Bob Smith' }, { id: 3, name: 'Charlie Brown' }, { id: 4, name: 'Diana Wilson' }, { id: 5, name: 'Emma Davis' }, ];
const tomorrowTeam = [ { id: 6, name: 'Frank Miller' }, { id: 7, name: 'Grace Taylor' }, { id: 8, name: 'Henry Clark' }, { id: 9, name: 'Isabella Martinez' }, { id: 10, name: 'Jack Anderson' }, ];
const allStudents = [ { id: 1, name: 'Alice Johnson', position: 1 }, { id: 2, name: 'Bob Smith', position: 2 }, { id: 3, name: 'Charlie Brown', position: 3 }, { id: 4, name: 'Diana Wilson', position: 4 }, { id: 5, name: 'Emma Davis', position: 5 }, { id: 6, name: 'Frank Miller', position: 6 }, { id: 7, name: 'Grace Taylor', position: 7 }, { id: 8, name: 'Henry Clark', position: 8 }, { id: 9, name: 'Isabella Martinez', position: 9 }, { id: 10, name: 'Jack Anderson', position: 10 }, { id: 11, name: 'Liam Garcia', position: 11 }, { id: 12, name: 'Olivia Rodriguez', position: 12 }, { id: 13, name: 'Noah Hernandez', position: 13 }, { id: 14, name: 'Ava Lopez', position: 14 }, { id: 15, name: 'Ethan Gonzalez', position: 15 }, ];


const StudentDashboard = () => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <div className={styles.logoShape}></div>
          </div>
          <span>KitchenFlow</span>
        </div>
        <nav className={styles.mainNav}>
          <Link to="/dashboard" className={styles.active}>
            <FaRegCompass /><span>Kitchen Overview</span>
          </Link>
          <Link to="/skip-request">
            <FaRegPaperPlane /><span>Skip Request</span>
          </Link>
        </nav>
        <div className={styles.userProfileNav}>Student</div>
      </header>
      
      <main className={styles.overviewContainer}>
        <div className={styles.overviewHeader}>
          <div className={styles.titleLogoIcon}>
            <div className={styles.titleLogoShape}></div>
          </div>
          <h1>Kitchen Turn Overview</h1>
        </div>
        <p className={styles.overviewSubtitle}>Day 1 - Monday, August 19, 2025</p>
        
        {/* ... Baaki ka content waisa hi rahega ... */}
        <div className={styles.teamsDisplayContainer}>
          <div className={styles.teamDisplayCard}>
            <div className={styles.teamCardHeader}>
              <FaUsers className={styles.teamIcon} /><h3>Today's Kitchen Team</h3>
            </div>
            <ul className={styles.teamList}>
              {todayTeam.map(student => <li key={student.id}>{student.name}</li>)}
            </ul>
          </div>
          <div className={styles.teamDisplayCard}>
            <div className={styles.teamCardHeader}>
              <FaCalendarAlt className={styles.teamIcon} /><h3>Tomorrow's Kitchen Team</h3>
            </div>
            <ul className={styles.teamList}>
              {tomorrowTeam.map(student => <li key={student.id}>{student.name}</li>)}
            </ul>
          </div>
        </div>
        <div className={styles.actionButtonsContainer}>
          <button className={styles.btnPrimaryOverview}>Advance to Next Day</button>
          <button className={styles.btnSecondaryOverview}>Reset All Data</button>
        </div>
        <div className={styles.allStudentsContainer}>
          <div className={styles.allStudentsHeader}>
            <h2>All Students</h2>
            <div className={styles.controls}>
              <div className={styles.searchBox}>
                <FaSearch /><input type="text" placeholder="Search students..." />
              </div>
              <button className={styles.btnPrimaryOverview}>Add Student</button>
            </div>
          </div>
          <div className={styles.allStudentsGrid}>
            {allStudents.map(student => (
              <div className={styles.overviewStudentCard} key={student.id}>
                <div className={styles.studentInfo}>
                  <p className={styles.studentName}>{student.name}</p>
                  <p className={styles.studentPosition}>Position: {student.position}</p>
                </div>
                <span className={styles.studentStatusBadge}>ACTIVE</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};
export default StudentDashboard;


