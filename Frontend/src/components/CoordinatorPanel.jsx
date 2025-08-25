// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaUserShield, FaClock, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaUsers } from 'react-icons/fa';
// import styles from './CoordinatorRequestPanel.module.css';
// import Navbar from './Navbar';

// const CoordinatorRequestPanel = () => {
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filter, setFilter] = useState('All');

//     const fetchRequests = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/skip-requests/');
//             setRequests(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     const handleApprove = async (id, studentName) => {
//         try {
//             await axios.patch(`http://localhost:5000/skip-requests/approve/${id}`, { studentName });
            
//             const updatedRequests = requests.map(request =>
//                 request._id === id ? { ...request, status: 'Approved' } : request
//             );
//             setRequests(updatedRequests);
            
//             alert(`${studentName} ki request approved hai.`);
//         } catch (error) {
//             console.error("Error approving request:", error);
//             alert("Approval failed.");
//         }
//     };

//     const handleReject = async (id) => {
//         try {
//             await axios.patch(`http://localhost:5000/skip-requests/reject/${id}`);
            
//             const updatedRequests = requests.map(request =>
//                 request._id === id ? { ...request, status: 'Rejected' } : request
//             );
//             setRequests(updatedRequests);

//             alert("Request rejected.");
//         } catch (error) {
//             console.error("Error rejecting request:", error);
//             alert("Rejection failed.");
//         }
//     };
    
//     // Filtering logic
//     const filteredRequests = requests.filter(request => {
//         if (filter === 'All') return true;
//         return request.status === filter;
//     });

//     const pendingCount = requests.filter(r => r.status === 'Pending').length;
//     const approvedCount = requests.filter(r => r.status === 'Approved').length;
//     const rejectedCount = requests.filter(r => r.status === 'Rejected').length;

//     if (loading) {
//         return <div className={styles.loading}>Loading requests...</div>;
//     }

//     return (
//         <div className={styles.pageWrapper}>
//             <Navbar showRegister={false} showSkipRequest={false} />
            
//             <main className={styles.mainContent}>
//                 <div className={styles.titleSection}>
//                     <FaUserShield className={styles.titleIcon} />
//                     <h1>Coordinator Requests</h1>
//                     <p>View and manage all incoming kitchen turn skip requests.</p>
//                 </div>

//                 <div className={styles.requestsGrid}>
//                     {filteredRequests.length === 0 ? (
//                         <div className={styles.emptyState}>
//                             <FaExclamationCircle />
//                             <p>No requests found</p>
//                             <span>All requests have been processed.</span>
//                         </div>
//                     ) : (
//                         filteredRequests.map(request => (
//                             <div key={request._id} className={`${styles.requestCard} ${styles[request.status.toLowerCase()]}`}>
//                                 <div className={styles.cardHeader}>
//                                     <h3 className={styles.kitchenName}>Main Kitchen</h3>
//                                     <div className={`${styles.statusBadge} ${styles[request.status.toLowerCase()]}`}>
//                                         {request.status}
//                                     </div>
//                                 </div>
//                                 <div className={styles.requestDetails}>
//                                     <p><strong>Skip Date:</strong> {new Date(request.startDate).toLocaleDateString()}</p>
//                                     <p><strong>Requested By:</strong> {request.studentName}</p>
//                                     <p><strong>Reason:</strong> {request.reason}</p>
//                                 </div>
//                                 <div className={styles.actions}>
//                                     {request.status === 'Pending' ? (
//                                         <>
//                                             <button
//                                                 onClick={() => handleApprove(request._id, request.studentName)}
//                                                 className={`${styles.actionButton} ${styles.approveButton}`}>
//                                                 Approve
//                                             </button>
//                                             <button
//                                                 onClick={() => handleReject(request._id, request.studentName)}
//                                                 className={`${styles.actionButton} ${styles.rejectButton}`}>
//                                                 Reject
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <span className={styles.actionTaken}>Action Taken</span>
//                                     )}
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default CoordinatorRequestPanel;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserShield, FaClock, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaUsers } from 'react-icons/fa';
import styles from './CoordinatorRequestPanel.module.css';
import Navbar from './Navbar';

const CoordinatorRequestPanel = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter] = useState('All'); // setFilter ko hata diya gaya hai

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
    
    // Filtering logic
    const filteredRequests = requests.filter(request => {
        if (filter === 'All') return true;
        return request.status === filter;
    });

    // Unused variables ko hata diya gaya hai
    // const pendingCount = requests.filter(r => r.status === 'Pending').length;
    // const approvedCount = requests.filter(r => r.status === 'Approved').length;
    // const rejectedCount = requests.filter(r => r.status === 'Rejected').length;

    if (loading) {
        return <div className={styles.loading}>Loading requests...</div>;
    }

    return (
        <div className={styles.pageWrapper}>
            <Navbar showRegister={false} showSkipRequest={false} />
            
            <main className={styles.mainContent}>
                <div className={styles.titleSection}>
                    <FaUserShield className={styles.titleIcon} />
                    <h1>Coordinator Requests</h1>
                    <p>View and manage all incoming kitchen turn skip requests.</p>
                </div>

                <div className={styles.requestsGrid}>
                    {filteredRequests.length === 0 ? (
                        <div className={styles.emptyState}>
                            <FaExclamationCircle />
                            <p>No requests found</p>
                            <span>All requests have been processed.</span>
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