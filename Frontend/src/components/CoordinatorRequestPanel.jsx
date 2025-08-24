// export default CoordinatorRequestPanel;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CoordinatorRequestPanel.module.css';

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

    // Function to handle 'Approve' button click
    const handleApprove = async (id, studentName) => {
        try {
            // Backend ko update karne ke liye request bhejain
            await axios.patch(`http://localhost:5000/skip-requests/approve/${id}`, { studentName });
            
            // UI ko turant update karne ke liye local state change karein
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

    // Function to handle 'Reject' button click
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
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardHeader}>
                <h1>Kitchen Turn Skip Request Dashboard</h1>
                <p>View and manage all incoming kitchen turn skip requests.</p>
            </div>

            <div className={styles.requestsGrid}>
                {requests.length === 0 ? (
                    <p className={styles.noRequests}>No requests found.</p>
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
        </div>
    );
};

export default CoordinatorRequestPanel;