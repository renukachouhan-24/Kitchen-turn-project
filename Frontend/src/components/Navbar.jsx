import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegPaperPlane } from 'react-icons/fa'; 
import styles from './Navbar.module.css';
import chefIcon from '../assets/chef.png';  
const Navbar = ({ showRegister, showSkipRequest }) => {
    return (
        <header className={styles.header}>
            <Link to="/"><div className={styles.logoContainer}>
                
                <img src={chefIcon} alt="Chef Icon" className={styles.chefIcon} />
                <span className='logoName'>KitchenFlow</span>
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