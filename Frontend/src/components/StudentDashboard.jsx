import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaCalendarAlt } from 'react-icons/fa';
import Navbar from './Navbar';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
    const [allStudents, setAllStudents] = useState([]);
    const [todayTeam, setTodayTeam] = useState([]);
    const [tomorrowTeam, setTomorrowTeam] = useState([]);
    const [error, setError] = useState(null);

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            setLoggedInUser(JSON.parse(userString));
        }
    }, []);

    const isCoordinator = loggedInUser && loggedInUser.role === 'coordinator';

    const fetchAllStudents = async () => {
        try {
            const response = await axios.get('https://kitchen-turn-project.onrender.com/students/all');
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
            const response = await axios.get('https://kitchen-turn-project.onrender.com/students/active');
            let activeStudents = response.data;

            activeStudents = activeStudents.filter(student => student.role !== 'coordinator');

            if (activeStudents.length >= 5) {
                setTodayTeam(activeStudents.slice(0, 5));
                setTomorrowTeam(activeStudents.slice(5, 10));
            } else {
                setTodayTeam(activeStudents);
                setTomorrowTeam([]);
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

        const refreshInterval = setInterval(() => {
            fetchAllStudents();
            fetchActiveStudentsForTeams();

        }, 180000);


        return () => clearInterval(refreshInterval);
    }, []);

    const handleStatusChange = async (studentId, newStatus) => {
        if (!isCoordinator) {
            alert("You do not have permission to change the status.");
            return;
        }
        try {
            await axios.patch(`https://kitchen-turn-project.onrender.com/students/update-status/${studentId}`, { status: newStatus });
            fetchAllStudents();
            fetchActiveStudentsForTeams();
            setError(null);
        } catch (err) {
            setError('Failed to update student status.');
            console.error("Error updating status:", err);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <Navbar showRegister={false} showSkipRequest={true} />

            <main className={styles.overviewContainer}>
                <div className={styles.overviewHeader}>
                    <h1>Kitchen Turn Overview</h1>
                </div>
                <p className={styles.overviewSubtitle}>A recipe has no soul. You, as the cook, must bring soul to the recipe.</p>

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

                <div className={styles.allStudentsContainer}>
                    <h2>All Students</h2>
                    <div className={styles.allStudentsGrid}>
                        {allStudents.map(({ _id, name, status, role, joiningDate }) => (
                            <div className={styles.overviewStudentCard} key={_id}>
                                <div className={styles.studentInfo}>
                                    <p className={styles.studentName}>{name}</p>
                                    <p className={styles.studentPosition}>{`Joined: ${new Date(joiningDate).toLocaleDateString()}`}</p>
                                </div>

                                {role === 'coordinator' ? (
                                    <p className={styles.coordinatorBadge}>COORDINATOR</p>
                                ) : (
                                    <select
                                        className={`${styles.studentStatusDropdown} ${status === 'inactive' || status === 'on_leave' ? styles.statusInactive : styles.statusActive}`}
                                        value={status}
                                        onChange={(e) => handleStatusChange(_id, e.target.value)}
                                        disabled={!isCoordinator}
                                        title={!isCoordinator ? "Only coordinators can change status." : ""}
                                    >
                                        <option value="active">ACTIVE</option>
                                        <option value="inactive">INACTIVE</option>
                                        <option value="on_leave">ON LEAVE</option>
                                    </select>
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;