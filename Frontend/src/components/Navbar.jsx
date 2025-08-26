 import React from 'react';
import { Link } from 'react-router-dom';
// FaUserChef को हटा दिया गया है क्योंकि अब हम image का उपयोग करेंगे
import { FaRegPaperPlane } from 'react-icons/fa'; 
import styles from './Navbar.module.css';
import ladyChefIcon from '../assets/chef-hat.png'; // Image ko import kiya gaya hai

const Navbar = ({ showRegister, showSkipRequest }) => {
    return (
        <header className={styles.header}>
            <Link to="/"><div className={styles.logoContainer}>
                {/* FaUserChef की जगह image का उपयोग किया गया है */}
                <img src={ladyChefIcon} alt="Lady Chef Icon" className={styles.chefIcon} />
                <span>KitchenFlow</span>
            </div></Link>
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