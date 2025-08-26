import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegPaperPlane } from 'react-icons/fa'; 
import styles from './Navbar.module.css';
import ladyChefIcon from '../assets/chef.png';  

const Navbar = ({ showRegister, showSkipRequest }) => {
    return (
        <header className={styles.header}>
            {/* ====== CHANGE IS HERE ====== */}
            {/* Is Link tag par className add kiya gaya hai */}
            <Link to="/" className={styles.logoLink}>
                <div className={styles.logoContainer}>
                    <img src={ladyChefIcon} alt="Lady Chef Icon" className={styles.chefIcon} />
                    <span>KitchenFlow</span>
                </div>
            </Link>
            {/* =========================== */}

            <nav className={styles.mainNav}>
                <Link to="/dashboard">Student</Link>
                <Link to="/today-team">Today's Kitchen Team</Link>
                <Link to="/coordinator">Coordinator</Link>
                
                {showRegister && (
                    <Link to="/register" className={styles.registerBtn}>Register</Link>
                )}
                
                {showSkipRequest && (
                    <Link to="/skip-request" className={styles.skipRequestBtn}>
                        <FaRegPaperPlane /> Skip Request
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Navbar;