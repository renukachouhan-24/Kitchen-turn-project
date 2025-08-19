// src/components/RoleSelection.jsx

import React from 'react';
import { FaUserFriends, FaCog, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './RoleSelection.module.css';

const RoleSelection = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <h1>Welcome to KitchenFlow</h1>
        <p className={styles.subtitle}>Select your role to continue</p>
        <div className={styles.cardsContainer}>
          {/* Student Card */}
          <Link to="/dashboard" className={styles.cardLink}>
            <div className={styles.roleCard}>
              <div className={`${styles.iconWrapper} ${styles.studentIcon}`}>
                <FaUserFriends size={28} />
              </div>
              <div className={styles.textContent}>
                <h2>Student</h2>
                <p>View kitchen teams and submit skip requests</p>
              </div>
            </div>
          </Link>
          
          {/* Coordinator Card */}
          <Link to="/coordinator" className={styles.cardLink}>
            <div className={styles.roleCard}>
              <div className={`${styles.iconWrapper} ${styles.coordinatorIcon}`}>
                <FaCog size={28} />
              </div>
              <div className={styles.textContent}>
                <h2>Coordinator</h2>
                <p>Manage skip requests and oversee kitchen duties</p>
              </div>
            </div>
          </Link>

          {/* === GETTING STARTED CARD (Waapas add kar diya hai) === */}
          <div className={styles.infoCard}>
            <div className={`${styles.iconWrapper} ${styles.infoIcon}`}>
              <FaInfoCircle size={24} />
            </div>
            <div className={styles.textContent}>
              <h3>Getting Started</h3>
              <p>
                This is a demo application. Students can view kitchen schedules
                and request skips, while coordinators have additional privileges
                to manage requests and oversee operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;