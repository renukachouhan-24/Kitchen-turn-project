import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; 
import styles from './RoleSelection.module.css';
import { FaCheckCircle } from 'react-icons/fa';
import { MdOutlineFoodBank } from "react-icons/md";
import navgurukulLogo from '../assets/ngLogo.png';

const RoleSelection = () => {
    return (
        <div className={styles.pageWrapper}>
            <Navbar showRegister={true} showSkipRequest={false} />
            
            <main className={styles.mainContent}>
                <div className={styles.leftColumn}>
                    <h1 className={styles.mainHeading}>
                        <h2 className={styles.subHeading}>Welcome to </h2>
                        <img src={navgurukulLogo} alt="Navgurukul Logo" className={styles.navgurukulLogo} />
                    </h1>
                    <h2 className={styles.subHeading}>Kitchen </h2>
                    
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
                        <video
                            src="/homepageVideo.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={styles.bgVideo}
                        />
                        <MdOutlineFoodBank className={styles.foodIcon} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RoleSelection;