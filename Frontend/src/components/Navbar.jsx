// src/components/Navbar.jsx
import React, { useState } from 'react'; // NAYA: useState import karein
import { Link } from 'react-router-dom';
import { FaRegPaperPlane, FaBars, FaTimes } from 'react-icons/fa'; // NAYA: FaBars aur FaTimes icons import karein
import styles from './Navbar.module.css';
import ladyChefIcon from '../assets/chef.png'; 

const Navbar = ({ showRegister, showSkipRequest }) => {
    // NAYA: State to manage mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // NAYA: Function to toggle the menu state
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            {/* Logo Section */}
            <Link to="/" className={styles.logoLink}>
                <div className={styles.logoContainer}>
                    <img src={ladyChefIcon} alt="Lady Chef Icon" className={styles.chefIcon} />
                    <span>KitchenFlow</span>
                </div>
            </Link>

            {/* NAYA: Hamburger Toggle Button */}
            <div className={styles.hamburger} onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* NAYA: Navigation Container, whose visibility is controlled by the state */}
            <div className={`${styles.navContainer} ${isMenuOpen ? styles.open : ''}`}>
                <nav className={styles.mainNav}>
                    <Link to="/dashboard">Student</Link>
                    <Link to="/today-team">Today's Kitchen Team</Link>
                    <Link to="/coordinator">Coordinator</Link>
                </nav>
                
                {showRegister && (
                    <Link to="/register" className={styles.registerBtn}>Register</Link>
                )}
                
                {showSkipRequest && (
                    <Link to="/skip-request" className={styles.skipRequestBtn}>
                        <FaRegPaperPlane /> Skip Request
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;