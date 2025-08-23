// src/components/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaCalendarAlt, FaRegCompass, FaRegPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
    const [allStudents, setAllStudents] = useState([]);
    const [todayTeam, setTodayTeam] = useState([]);
    const [tomorrowTeam, setTomorrowTeam] = useState([]);

    const fetchAllStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/students/all');
            // 'on_leave' students ko neeche dikhane ke liye sort karein
            const sortedStudents = response.data.sort((a, b) => {
                if (a.status === 'on_leave' && b.status !== 'on_leave') return 1;
                if (a.status !== 'on_leave' && b.status === 'on_leave') return -1;
                return 0;
            });
            setAllStudents(sortedStudents);
        } catch (error) {
            console.error("Error fetching all students:", error);
        }
    };

    const fetchActiveStudentsForTeams = async () => {
        try {
            // Ab hum sirf 'active' students ko fetch karenge, 'on_leave' students ko nahi
            const response = await axios.get('http://localhost:5000/students/active');
            const activeStudents = response.data;
            
            if (activeStudents.length >= 5) {
                setTodayTeam(activeStudents.slice(0, 5));
                setTomorrowTeam(activeStudents.slice(5, 10));
            } else {
                setTodayTeam(activeStudents);
                setTomorrowTeam([]);
            }
        } catch (error) {
            console.error("Error fetching active students:", error);
        }
    };

    useEffect(() => {
        fetchAllStudents();
        fetchActiveStudentsForTeams();
    }, []);

    const handleStatusChange = async (studentId, newStatus) => {
        try {
            await axios.post(`http://localhost:5000/students/update-status/${studentId}`, { status: newStatus });
            fetchAllStudents();
            fetchActiveStudentsForTeams();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleAdvanceToNextDay = () => {
        // ... (existing rotation logic, no change needed here) ...
    };

    const handleResetData = async () => {
        try {
            await axios.post('http://localhost:5000/students/reset');
            console.log("All data reset successfully.");
            fetchAllStudents();
            fetchActiveStudentsForTeams();
        } catch (error) {
            console.error("Error resetting data:", error);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            {/* ...Header... */}
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoIcon}><div className={styles.logoShape}></div></div>
                    <span>KitchenFlow</span>
                </div>
                <nav className={styles.mainNav}>
                    <Link to="/dashboard" className={styles.active}><FaRegCompass /><span>Kitchen Overview</span></Link>
                    <Link to="/skip-request"><FaRegPaperPlane /><span>Skip Request</span></Link>
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
                    <button className={styles.btnPrimaryOverview} onClick={handleAdvanceToNextDay}>Advance to Next Day</button>
                    <button className={styles.btnSecondaryOverview} onClick={handleResetData}>Reset All Data</button>
                </div>
                
                <div className={styles.allStudentsContainer}>
                    <h2>All Students</h2>
                    <div className={styles.allStudentsGrid}>
                        {allStudents.map(student => (
                            <div className={styles.overviewStudentCard} key={student._id}>
                                <div className={styles.studentInfo}>
                                    <p className={styles.studentName}>{student.name}</p>
                                    <p className={styles.studentPosition}>{`Joined: ${new Date(student.joiningDate).toLocaleDateString()}`}</p>
                                </div>
                                <select
                                    className={`${styles.studentStatusDropdown} ${student.status === 'inactive' || student.status === 'on_leave' ? styles.statusInactive : styles.statusActive}`}
                                    value={student.status}
                                    onChange={(e) => handleStatusChange(student._id, e.target.value)}
                                >
                                    <option value="active">ACTIVE</option>
                                    <option value="inactive">INACTIVE</option>
                                    <option value="on_leave">ON LEAVE</option>
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;