import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegPaperPlane, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import styles from './Navbar.module.css';
 

const Navbar = ({ showRegister, showSkipRequest }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await axios.get("https://kitchen-turn-project-1-yl2f.onrender.com/api/auth/me", {
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
                    localStorage.setItem("user", JSON.stringify(res.data)); // update local user
                }
            } catch (err) {
                console.error("Session check failed:", err);
                handleLogout();
            }
        };

        checkUser();
    }, [navigate]);

    const isCoordinator = loggedInUser?.role === "coordinator";

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setLoggedInUser(null);
        navigate('/login');
    };

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
