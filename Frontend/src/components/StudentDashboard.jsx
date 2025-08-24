import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaCalendarAlt, FaRegCompass, FaRegPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
    const [allStudents, setAllStudents] = useState([]);
    const [todayTeam, setTodayTeam] = useState([]);
    const [tomorrowTeam, setTomorrowTeam] = useState([]);
    const [error, setError] = useState(null);

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
            setError(null);
        } catch (err) {
            setError('Failed to load all students.');
            console.error("Error fetching all students:", err);
        }
    };

    const fetchActiveStudentsForTeams = async () => {
        try {
            // Ab hum sirf 'active' students ko fetch karenge, 'on_leave' students ko nahi
            const response = await axios.get('http://localhost:5000/students/active');
            const activeStudents = response.data;
            
            if (activeStudents.length >= 5) {
                const initialTodayTeam = activeStudents.slice(0, 5);
                const initialTomorrowTeam = activeStudents.slice(5, 10);
                setTodayTeam(initialTodayTeam);
                setTomorrowTeam(initialTomorrowTeam);
                const initialTodayTeamIds = initialTodayTeam.map(student => student._id);
                await axios.patch('http://localhost:5000/menu/update-team', { teamMembers: initialTodayTeamIds });
                console.log("Initial Today's kitchen team updated in backend.");
            } else {
                setTodayTeam(activeStudents);
                setTomorrowTeam([]);
                await axios.patch('http://localhost:5000/menu/update-team', { teamMembers: [] });
                console.log("Not enough students, backend today's team cleared.");
            }
            setError(null);
        } catch (err) {
            setError('Failed to load kitchen teams.');
            console.error("Error fetching active students:", err);
        }
    };

    useEffect(() => {
        fetchAllStudents();
        fetchActiveStudentsForTeams();
    }, []);

    const handleStatusChange = async (studentId, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/students/update-status/${studentId}`, { status: newStatus });
            fetchAllStudents();
            fetchActiveStudentsForTeams();
            setError(null);
        } catch (err) {
            setError('Failed to update student status.');
            console.error("Error updating status:", err);
        }
    };

    const handleAdvanceToNextDay = async () => {
        const activeStudents = allStudents.filter(s => s.status === 'active');
        
        if (activeStudents.length >= 10) {
            const firstFive = activeStudents.slice(0, 5);
            const remaining = activeStudents.slice(5);
            const rotatedList = [...remaining, ...firstFive];

            const newTodayTeam = rotatedList.slice(0, 5);
            const newTomorrowTeam = rotatedList.slice(5, 10);

            setTodayTeam(newTodayTeam);
            setTomorrowTeam(newTomorrowTeam);
            setError(null);

            try {
                const newTodayTeamIds = newTodayTeam.map(student => student._id);
                await axios.patch('http://localhost:5000/menu/update-team', { teamMembers: newTodayTeamIds });
                console.log("Today's kitchen team updated in backend.");
            } catch (err) {
                setError('Failed to update today\'s team in backend.');
                console.error("Error updating today's team in backend:", err);
            }
        } else {
            setError("Not enough active students (minimum 10 needed) for a full rotation.");
        }
    };

    const handleResetData = async () => {
        try {
            await axios.patch('http://localhost:5000/students/reset');
            console.log("All data reset successfully.");
            fetchAllStudents();
            fetchActiveStudentsForTeams();
            setError(null);
            try {
                await axios.patch('http://localhost:5000/menu/update-team', { teamMembers: [] });
                console.log("Today's kitchen team cleared in backend on reset.");
            } catch (err) {
                setError('Failed to clear today\'s team in backend on reset.');
                console.error("Error clearing today's team in backend on reset:", err);
            }
        } catch (err) {
            setError('Failed to reset data.');
            console.error("Error resetting data:", err);
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
                <div className={styles.userProfileNav}>Coordinator</div>
            </header>
            
            <main className={styles.overviewContainer}>
                <div className={styles.overviewHeader}>
                    <div className={styles.titleLogoIcon}>
                        <div className={styles.titleLogoShape}></div>
                    </div>
                    <h1>Kitchen Turn Overview</h1>
                </div>
                <p className={styles.overviewSubtitle}>Day 1 - Monday, August 20, 2025</p>
                
                {error && <div className={styles.errorMessage}>{error}</div>}

                <div className={styles.teamsDisplayContainer}>
                    <div className={styles.teamDisplayCard}>
                        <div className={styles.teamCardHeader}>
                            <FaUsers className={styles.teamIcon} /><h3>Today's Kitchen Team</h3>
                        </div>
                        <ul className={styles.teamList}>
                            {todayTeam.length > 0 ? todayTeam.map(({ _id, name }) => <li key={_id}>{name}</li>) : <li>No team assigned yet.</li>}
                        </ul>
                    </div>
                    <div className={styles.teamDisplayCard}>
                        <div className={styles.teamCardHeader}>
                            <FaCalendarAlt className={styles.teamIcon} /><h3>Tomorrow's Kitchen Team</h3>
                        </div>
                        <ul className={styles.teamList}>
                            {tomorrowTeam.length > 0 ? tomorrowTeam.map(({ _id, name }) => <li key={_id}>{name}</li>) : <li>No team assigned yet.</li>}
                        </ul>
                    </div>
                </div>
                
                {/* YAHAN SE BUTTONS HATA DIYE GAYE HAIN */}
                {/* <div className={styles.actionButtonsContainer}>
                    <button className={styles.btnPrimaryOverview} onClick={handleAdvanceToNextDay}>Advance to Next Day</button>
                    <button className={styles.btnSecondaryOverview} onClick={handleResetData}>Reset All Data</button>
                </div> */}
                
                <div className={styles.allStudentsContainer}>
                    <h2>All Students</h2>
                    <div className={styles.allStudentsGrid}>
                        {allStudents.map(({ _id, name, status, joiningDate }) => (
                            <div className={styles.overviewStudentCard} key={_id}>
                                <div className={styles.studentInfo}>
                                    <p className={styles.studentName}>{name}</p>
                                    <p className={styles.studentPosition}>{`Joined: ${new Date(joiningDate).toLocaleDateString()}`}</p>
                                </div>
                                <select
                                    className={`${styles.studentStatusDropdown} ${status === 'inactive' || status === 'on_leave' ? styles.statusInactive : styles.statusActive}`}
                                    value={status}
                                    onChange={(e) => handleStatusChange(_id, e.target.value)}
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