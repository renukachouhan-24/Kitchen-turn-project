// src/components/RoleSelection.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Naya Navbar component import karein
import styles from './RoleSelection.module.css';
import { FaCheckCircle } from 'react-icons/fa';
import { MdOutlineFoodBank } from "react-icons/md";

const RoleSelection = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar /> {/* Navbar ko yahan use karein */}
      
      {/* Main Content Section */}
      <main className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <h1>Welcome to Kitchen Turn</h1>
          <p className={styles.description}>
            "Kitchen Turn is a smart way to manage and organize daily kitchen duties in student hostels and communities. It helps track who is responsible, ensures fairness, and improves coordination."
          </p>
          
          <div className={styles.howItWorksCard}>
            <h3>How it works:</h3>
            <ul>
              <li><FaCheckCircle className={styles.checkIcon} /> Students are assigned to kitchen turns fairly.</li>
              <li><FaCheckCircle className={styles.checkIcon} /> Daily team list is automatically updated.</li>
              <li><FaCheckCircle className={styles.checkIcon} /> Coordinator can manage and monitor turns.</li>
            </ul>
          </div>
          
          <Link to="/today-team" className={styles.outlineBtn}>
            View Today's Team
          </Link>
        </div>
        
        <div className={styles.rightColumn}>
          <div className={styles.mainIconContainer}>
            <MdOutlineFoodBank />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoleSelection;