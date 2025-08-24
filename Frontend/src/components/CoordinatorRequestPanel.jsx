import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserShield, FaExclamationCircle } from 'react-icons/fa';
import styles from './CoordinatorRequestPanel.module.css';
import Navbar from './Navbar'; 

const CoordinatorRequestPanel = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

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
            alert(`${studentName} ki request approved hai.`);
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

    if (loading) {
        return <div className={styles.loading}>Loading requests...</div>;
    }

    return (
        <div className={styles.pageWrapper}>
            <Navbar />
            
            <main className={styles.mainContent}>
                <div className={styles.titleSection}>
                    <FaUserShield className={styles.titleIcon} />
                    <h1>Coordinator Requests</h1>
                    <p>View and manage all incoming kitchen turn skip requests.</p>
                </div>

                {/* Yahan se Stat Cards aur Filter Tabs hata diye gaye hain */}
                
                <div className={styles.requestsGrid}>
                    {requests.length === 0 ? (
                        <div className={styles.emptyState}>
                            <FaExclamationCircle />
                            <p>No requests found</p>
                            <span>All requests have been processed.</span>
                        </div>
                    ) : (
                        requests.map(request => (
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










