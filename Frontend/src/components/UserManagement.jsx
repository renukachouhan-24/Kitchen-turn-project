import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import styles from './UserManagement.module.css';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
    const [students, setStudents] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            setLoggedInUser(JSON.parse(userString));
        }
    }, []);

    const isCoordinator = loggedInUser && loggedInUser.role === 'coordinator';

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:5000/students/all', {

                headers: { Authorization: `Bearer ${token}` }
            });
            setStudents(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch students:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isCoordinator) {
            fetchStudents();
        }
    }, [isCoordinator]);

    const handleRoleChange = async (id, newRole) => {
        try {

            const res = await axios.patch(
                `http://localhost:5000/students/update-role/${id}`,
                { role: newRole },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            
            const currentUser = JSON.parse(localStorage.getItem("user"));
            
            if (res.data.forceLogout && res.data.userId === currentUser._id) {
                const token = localStorage.getItem("token");
                const me = await axios.get("http://localhost:5000/api/auth/me", { // Corrected URL
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                localStorage.setItem("user", JSON.stringify(me.data));
                
                if (me.data.role === "student") {
                    setMessage("Your role has been changed to Student. Logging you out..."); // Use custom message
                    setTimeout(() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        navigate("/login"); 
                    }, 2000);
                    return;
                }

            }
            
            setMessage(res.data.message); 
            fetchStudents();
        } catch (err) {
            console.error("Error updating role:", err);
            setMessage("Failed to update role."); 
        }
    };
    
    const MessageModal = ({ message, onClose }) => {
        if (!message) return null;
        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <p>{message}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    };

    if (!isCoordinator) {
        return (
            <div>
                <Navbar />
                <div className={styles.accessDenied}>
                    <h1>Access Denied</h1>
                    <p>Only coordinators can view this page.</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div><Navbar /> <p className={styles.loading}>Loading users...</p></div>;
    }

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <h1>User Management</h1>
                <p>Change roles for students and coordinators here.</p>
                <table className={styles.userTable}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th>Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <span className={`${styles.roleBadge} ${styles[student.role]}`}>
                                        {student.role}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        value={student.role}
                                        onChange={(e) => handleRoleChange(student._id, e.target.value)}
                                        className={styles.roleDropdown}
                                    >
                                        <option value="student">Student</option>
                                        <option value="coordinator">Coordinator</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <MessageModal message={message} onClose={() => setMessage(null)} />
        </div>
    );
};

export default UserManagement;
