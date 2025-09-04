// CoordinatorRequestPanel.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserShield, FaExclamationCircle, FaSearch } from 'react-icons/fa';
import styles from './CoordinatorRequestPanel.module.css';
import Navbar from './Navbar'; 

const CoordinatorRequestPanel = () => {
    const [requests, setRequests] = useState([]);
    const [studentStats, setStudentStats] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);

        const requestsPromise = axios.get('https://kitchen-turn-project.onrender.com/skip-requests/');
        // === UPDATED ENDPOINT ===
        const statsPromise = axios.get('https://kitchen-turn-project.onrender.com/skip-requests/stats');

        const [requestsResult, statsResult] = await Promise.allSettled([requestsPromise, statsPromise]);

        if (requestsResult.status === 'fulfilled') {
            const sortedRequests = requestsResult.value.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRequests(sortedRequests);
        } else {
            console.error("Error fetching requests:", requestsResult.reason.message);
        }

        // Stats wala data check karein
        if (statsResult.status === 'fulfilled') {
            setStudentStats(statsResult.value.data);
        } else {
            console.error("Could not fetch student stats (backend route '/stats' might be missing):", statsResult.reason.message);
            setStudentStats([]); 
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 15000);
        return () => clearInterval(intervalId);
    }, []);

    const handleApprove = async (id, studentName) => {
        try {
            await axios.patch(`https://kitchen-turn-project.onrender.com/skip-requests/approve/${id}`, { studentName });
            alert(`${studentName} ki request approved hai.`);
            fetchData();
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Approval failed.");
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.patch(`https://kitchen-turn-project.onrender.com/skip-requests/reject/${id}`);
            alert("Request rejected.");
            fetchData();
        } catch (error) {
            console.error("Error rejecting request:", error);
            alert("Rejection failed.");
        }
    };
    
    const filteredStats = studentStats.filter(student => 
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className={styles.loading}>Loading Dashboard...</div>;
    }

    return (
        <div className={styles.pageWrapper}>
            <Navbar />
            
            <div className={styles.titleSection}>
                <FaUserShield className={styles.titleIcon} />
                <h1>Coordinator Dashboard</h1>
                <p>View and manage all incoming kitchen turn skip requests.</p>
            </div>

            <main className={styles.dashboardContainer}>
                
                {/* Section 1: All Requests */}
                <div className={styles.requestsContainer}>
                    <h2>All Requests</h2>
                    <div className={styles.requestsGrid}>
                        {requests.length === 0 ? (
                            <div className={styles.emptyState}>
                                <FaExclamationCircle />
                                <p>No Requests Found</p>
                            </div>
                        ) : (
                            requests.map(request => (
                                <div key={request._id} className={`${styles.requestCard} ${styles[request.status.toLowerCase()]}`}>
                                    <div className={styles.cardHeader}>
                                        <h3>Main Kitchen</h3>
                                        <div className={`${styles.statusBadge} ${styles[request.status.toLowerCase()]}`}>
                                            {request.status}
                                        </div>
                                    </div>
                                    <div className={styles.requestDetails}>
                                        <p><strong>Skip Date:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
                                        <p><strong>Requested By:</strong> {request.studentName}</p>
                                        <p><strong>Reason:</strong> {request.reason}</p>
                                    </div>
                                    <div className={styles.actions}>
                                        {request.status === 'Pending' ? (
                                            <>
                                                <button onClick={() => handleApprove(request._id, request.studentName)} className={`${styles.actionButton} ${styles.approveButton}`}>Approve</button>
                                                <button onClick={() => handleReject(request._id)} className={`${styles.actionButton} ${styles.rejectButton}`}>Reject</button>
                                            </>
                                        ) : (
                                            <span className={styles.actionTaken}>Action Taken</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Section 2: Sidebar */}
                <aside className={styles.statsSidebar}>
                    <h3>Student Skip History</h3>
                    <div className={styles.searchBox}>
                        <FaSearch className={styles.searchIcon} />
                        <input 
                            type="text" 
                            placeholder="Search student..." 
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <ul className={styles.studentList}>
                        {filteredStats.length > 0 ? (
                            filteredStats.map((student, index) => (
                                <li key={index} className={styles.studentListItem}>
                                    <span>{student.studentName}</span>
                                    {/* Yahan approved request count dikhaya gaya hai */}
                                    <div className={styles.approvedCountDiv}>
                                        {student.skipCount}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className={styles.noStudentFound}>No student found.</li>
                        )}
                    </ul>
                </aside>
            </main>
        </div>
    );
};

export default CoordinatorRequestPanel;