
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegPaperPlane, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import styles from './Navbar.module.css';
 

const Navbar = ({ showRegister, showSkipRequest }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    // and is included as a dependency for the useEffect hook.
    const handleLogout = useCallback(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setLoggedInUser(null);
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await axios.get("http://localhost:5000/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                 if (res.data.role !== "coordinator" && window.location.pathname === "/user-management") {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setLoggedInUser(null);
                    navigate("/login");
                    window.location.reload();
                } else {
                    setLoggedInUser(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data)); 
                }
            } catch (err) {
                console.error("Session check failed:", err);
                handleLogout();
            }
        };

        checkUser();
    }, [navigate, handleLogout]); // `handleLogout` is now a dependency

    const isCoordinator = loggedInUser?.role === "coordinator";

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logoLink}>
                <div className={styles.logoContainer}>
                <span> <span className={styles.logo}>Kitchen</span>Flow</span>
                </div>
            </Link>
            <div className={styles.hamburger} onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
            <div className={`${styles.navContainer} ${isMenuOpen ? styles.open : ''}`}>
                <nav className={styles.mainNav}>
                    <Link to="/dashboard">Student</Link>
                    <Link to="/today-team">Today's Kitchen Team</Link>
                    <Link to="/coordinator">Admin</Link>
                    {isCoordinator && (
                        <Link to="/user-management">Manage Users</Link>
                    )}
                </nav>

                {showRegister && <Link to="/register" className={styles.registerBtn}>Register</Link>}
                {showSkipRequest && <Link to="/skip-request" className={styles.skipRequestBtn}><FaRegPaperPlane /> Skip Request</Link>}

                <div className={styles.authSection}>
                    {loggedInUser ? (
                        <>
                            <span className={styles.welcomeMessage}><FaUserCircle /> {loggedInUser.name}</span>
                            <button onClick={handleLogout} className={styles.authButton}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className={styles.authButton}>Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
