// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaKey } from 'react-icons/fa';
import styles from './Navbar.module.css'; // Naya CSS file

const Navbar = () => {
  return (
    <header className={styles.header}>
      <Link to="/"><div className={styles.logoContainer}>
        <FaKey />
        <span>KitchenFlow</span>
      </div></Link>
      <nav className={styles.mainNav}>
        <Link to="/dashboard">Student</Link>
        <Link to="/today-team">Today's Kitchen Team</Link>
        <Link to="/coordinator">Coordinator</Link>
        <Link to="/register" className={styles.registerBtn}>Register</Link>
      </nav>
    </header>
  );
};

export default Navbar;