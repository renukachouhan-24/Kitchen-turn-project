import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserShield, FaClock, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaRegCompass, FaRegPaperPlane } from 'react-icons/fa';
import styles from './CoordinatorRequestPanel.module.css';
import Navbar from './Navbar';

const CoordinatorRequestPanel = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = true;
    const [filter, setFilter] = useState('All');

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/skip-requests/');
            setRequests(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleApprove = async (id, studentName) => {
        try {
            await axios.patch(`http://localhost:5000/skip-requests/approve/${id}`, { studentName });
            
            const updatedRequests = requests.map(request =>
                request._id === id ? { ...request, status: 'Approved' } : request
            );
            setRequests(updatedRequests);
            
            alert(`${studentName} ki request approved hai. Student ko kitchen duty se hata diya gaya hai.`);

        } catch (error) {
            console.error("Error approving request:", error);
            alert("Approval failed.");
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/skip-requests/reject/${id}`);
            
            const updatedRequests = requests.map(request =>
                request._id === id ? { ...request, status: 'Rejected' } : request
            );
            setRequests(updatedRequests);

            alert("Request rejected.");

        } catch (error) {
            console.error("Error rejecting request:", error);
            alert("Rejection failed.");
        }
    };
    
    // Filtering logic
    const filteredRequests = requests.filter(request => {
        if (filter === 'All') return true;
        return request.status === filter;
    });

    const pendingCount = requests.filter(r => r.status === 'Pending').length;
    const approvedCount = requests.filter(r => r.status === 'Approved').length;
    const rejectedCount = requests.filter(r => r.status === 'Rejected').length;

    if (loading) {
        return <div className={styles.loading}>Loading requests...</div>;
    }

    return (
        <div className={styles.pageWrapper}>
            <Navbar showRegister={false}/>
            {/* Navbar for Coordinator Panel */}
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <FaUserShield />
                    <span>KitchenFlow</span>
                </div>
                <nav className={styles.mainNav}>
                    {/* Coordinator Panel link, jo active hai */}
                    <Link to="/coordinator" className={styles.active}>
                        <span>Coordinator Panel</span>
                    </Link>
                    {/* Student View ke liye link, jisse coordinator student dashboard par jaa sake */}
                    <Link to="/dashboard"> 
                        <FaRegCompass />
                        <span>Student View</span>
                    </Link>
                </nav>
                <div className={styles.userProfileNav}>
                    Coordinator
                </div>
            </header>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <div className={styles.titleSection}>
                    <FaUserShield className={styles.titleIcon} />
                    <h1>Coordinator Panel</h1>
                    <p>Manage skip requests and kitchen assignments</p>
                </div>

                <div className={styles.statCardsContainer}>
                    <div className={styles.statCard}>
                        <FaUsers className={`${styles.statIcon} ${styles.total}`} />
                        <div>
                            <span className={styles.statCount}>{requests.length}</span>
                            <span className={styles.statTitle}>Total Requests</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <FaClock className={`${styles.statIcon} ${styles.pending}`} />
                        <div>
                            <span className={styles.statCount}>{pendingCount}</span>
                            <span className={styles.statTitle}>Pending</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <FaCheckCircle className={`${styles.statIcon} ${styles.approved}`} />
                        <div>
                            <span className={styles.statCount}>{approvedCount}</span>
                            <span className={styles.statTitle}>Approved</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <FaTimesCircle className={`${styles.statIcon} ${styles.rejected}`} />
                        <div>
                            <span className={styles.statCount}>{rejectedCount}</span>
                            <span className={styles.statTitle}>Rejected</span>
                        </div>
                    </div>
                </div>

                <div className={styles.filterTabs}>
                    <button onClick={() => setFilter('Pending')} className={`${styles.tab} ${filter === 'Pending' ? styles.activeTab : ''}`}>
                        Pending <span>{pendingCount}</span>
                    </button>
                    <button onClick={() => setFilter('Approved')} className={`${styles.tab} ${filter === 'Approved' ? styles.activeTab : ''}`}>
                        Approved <span>{approvedCount}</span>
                    </button>
                    <button onClick={() => setFilter('Rejected')} className={`${styles.tab} ${filter === 'Rejected' ? styles.activeTab : ''}`}>
                        Rejected <span>{rejectedCount}</span>
                    </button>
                    <button onClick={() => setFilter('All')} className={`${styles.tab} ${filter === 'All' ? styles.activeTab : ''}`}>
                        All <span>{requests.length}</span>
                    </button>
                </div>

                <div className={styles.requestsGrid}>
                    {filteredRequests.length === 0 ? (
                        <div className={styles.emptyState}>
                            <FaExclamationCircle />
                            <p>No requests found</p>
                            <span>{filter === 'All' ? 'All requests have been processed.' : `No ${filter.toLowerCase()} requests.`}</span>
                        </div>
                    ) : (
                        filteredRequests.map(request => (
                            <div key={request._id} className={`${styles.requestCard} ${styles[request.status.toLowerCase()]}`}>
                                <div className={styles.cardHeader}>
                                    <h3 className={styles.kitchenName}>Main Kitchen</h3>
                                    <div className={`${styles.statusBadge} ${styles[request.status.toLowerCase()]}`}>
                                        {request.status}
                                    </div>
                                </div>
                                <div className={styles.requestDetails}>
                                    <p><strong>Skip Date:</strong> {new Date(request.startDate).toLocaleDateString()}</p>
                                    <p><strong>Requested By:</strong> {request.studentName}</p>
                                    <p><strong>Reason:</strong> {request.reason}</p>
                                </div>
                                <div className={styles.actions}>
                                    {request.status === 'Pending' ? (
                                        <>
                                            <button
                                                onClick={() => handleApprove(request._id, request.studentName)}
                                                className={`${styles.actionButton} ${styles.approveButton}`}>
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(request._id, request.studentName)}
                                                className={`${styles.actionButton} ${styles.rejectButton}`}>
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
            </main>
        </div>
    );
};

export default CoordinatorRequestPanel;