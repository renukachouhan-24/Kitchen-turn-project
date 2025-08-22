// src/components/StudentDashboard.jsx

import React, { useState, useEffect } from 'react'; // Data manage karne ke liye
import axios from 'axios'; // API call ke liye
import { FaUsers, FaCalendarAlt, FaSearch, FaRegCompass, FaRegPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
  // State for our data from the database
  const [allStudents, setAllStudents] = useState([]);
  const [todayTeam, setTodayTeam] = useState([]); // Iska logic hum baad mein banayenge
  const [tomorrowTeam, setTomorrowTeam] = useState([]); // Iska logic hum baad mein banayenge

  // Yeh function component ke load hote hi chalega
  useEffect(() => {
    // Backend API se students ka data fetch karein
    axios.get('http://localhost:5000/students')
      .then(response => {
        // Jo data response mein aaya, use allStudents state mein set kar dein
        setAllStudents(response.data);
      })
      .catch((error) => {
        console.log("Error fetching students:", error);
      });
  }, []); // [] ka matlab yeh effect sirf ek baar chalega, jab component load hoga

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
        <p className={styles.overviewSubtitle}>Day 1 - Monday, August 20, 2025</p>
        
        <div className={styles.teamsDisplayContainer}>
          <div className={styles.teamDisplayCard}>
            <div className={styles.teamCardHeader}>
              <FaUsers className={styles.teamIcon} /><h3>Today's Kitchen Team</h3>
            </div>
            <ul className={styles.teamList}>
              {todayTeam.length > 0 ? todayTeam.map(student => <li key={student._id}>{student.name}</li>) : <li>No team assigned yet.</li>}
            </ul>
          </div>
          <div className={styles.teamDisplayCard}>
            <div className={styles.teamCardHeader}>
              <FaCalendarAlt className={styles.teamIcon} /><h3>Tomorrow's Kitchen Team</h3>
            </div>
            <ul className={styles.teamList}>
              {tomorrowTeam.length > 0 ? tomorrowTeam.map(student => <li key={student._id}>{student.name}</li>) : <li>No team assigned yet.</li>}
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
            {/* ... Add Student Form yahan aayega ... */}
          </div>
          <div className={styles.allStudentsGrid}>
            {/* Yeh list ab sirf database se aa rahi hai */}
            {allStudents.map(student => (
              <div className={styles.overviewStudentCard} key={student._id}> {/* Use _id from MongoDB */}
                <div className={styles.studentInfo}>
                  <p className={styles.studentName}>{student.name}</p>
                  {/* joiningDate ko aache format mein dikha rahe hain */}
                  <p className={styles.studentPosition}>{`Joined: ${new Date(student.joiningDate).toLocaleDateString()}`}</p>
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