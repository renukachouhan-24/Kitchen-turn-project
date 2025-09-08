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
    
     const [userRole, setUserRole] = useState('');

     const isCoordinator = userRole === 'coordinator';

     useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setUserRole(user.role || '');  
            }
        } catch (error) {
            console.error("Failed to parse user data from local storage", error);
        }
    }, []);  

    const fetchData = async () => {
        setLoading(true);


        const requestsPromise = axios.get('https://kitchen-flow.onrender.com/skip-requests/');
        const statsPromise = axios.get('https://kitchen-flow.onrender.com/skip-requests/stats');


        const [requestsResult, statsResult] = await Promise.allSettled([requestsPromise, statsPromise]);

        if (requestsResult.status === 'fulfilled') {
            const sortedRequests = requestsResult.value.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRequests(sortedRequests);
        } else {
            console.error("Error fetching requests:", requestsResult.reason.message);
        }

        if (statsResult.status === 'fulfilled') {
            setStudentStats(statsResult.value.data);
        } else {
            console.error("Could not fetch student stats:", statsResult.reason.message);
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
        if (!isCoordinator) {  
            alert("Access denied. Only coordinators can approve requests.");
            return;
        }

        try {
            await axios.patch(
                `https://kitchen-flow.onrender.com/skip-requests/approve/${id}`,

                { studentName },
                { headers: { userrole: userRole } }
            );
            alert(`${studentName} request approved.`);
            fetchData();
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Approval failed.");
        }
    };

     const handleReject = async (id) => {
        if (!isCoordinator) {  
            alert("Access denied. Only coordinators can reject requests.");
            return;
        }

        try {
            await axios.patch(

                `https://kitchen-flow.onrender.com/skip-requests/reject/${id}`,

                {},
                { headers: { userrole: userRole } }
            );
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
                <h1>Admin Dashboard</h1>
                <p>View and manage all incoming kitchen turn skip requests.</p>
            </div>

            <main className={styles.dashboardContainer}>
                
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
                                                <button 
                                                    onClick={() => handleApprove(request._id, request.studentName)} 
                                                    className={`${styles.actionButton} ${styles.approveButton}`}
                                                    disabled={!isCoordinator}
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleReject(request._id)} 
                                                    className={`${styles.actionButton} ${styles.rejectButton}`}
                                                    disabled={!isCoordinator}
                                                >
                                                    Reject
                                                </button>
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


// coordinator