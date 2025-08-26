// import React from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from './Navbar'; 
// import styles from './RoleSelection.module.css';
// import { FaCheckCircle } from 'react-icons/fa';
// import { MdOutlineFoodBank } from "react-icons/md";
// import navgurukulLogo from '../assets/ngLogo.png';

// const RoleSelection = () => {
//     return (
//         <div className={styles.pageWrapper}>
//             <Navbar showRegister={true} showSkipRequest={false} />
            
//             <main className={styles.mainContent}>
//                 <div className={styles.leftColumn}>
//                     {/* Yahan par heading ko do alag lines me split kiya gaya hai */}
//                     <div className={styles.mainTitleContainer}>
//                         <h1 className={styles.welcomeHeading}>Welcome to</h1>
//                         <img src={navgurukulLogo} alt="Navgurukul Logo" className={styles.navgurukulLogo} />
//                     </div>
//                      {/* <h2 className={styles.subHeading}>Kitchen</h2>  */}
                    
//                     <p className={styles.description}>
//                         "Kitchen Turn is a smart way to manage and organize daily kitchen duties in student hostels and communities. It helps track who is responsible, ensures fairness, and improves coordination."
//                     </p>
                    
//                     <div className={styles.howItWorksCard}>
//                         <h3>How it works:</h3>
//                         <ul>
//                             <li><FaCheckCircle className={styles.checkIcon} /> Students are assigned to kitchen turns fairly.</li>
//                             <li><FaCheckCircle className={styles.checkIcon} /> Daily team list is automatically updated.</li>
//                             <li><FaCheckCircle className={styles.checkIcon} /> Coordinator can manage and monitor turns.</li>
//                         </ul>
//                     </div>
                    
//                     <Link to="/today-team" className={styles.outlineBtn}>
//                         View Today's Team
//                     </Link>
//                 </div>
                
//                 <div className={styles.rightColumn}>
//                     <div className={styles.mainIconContainer}>
//                         <video
//                             src="/homepageVideo.mp4"
//                             autoPlay
//                             loop
//                             muted
//                             playsInline
//                             className={styles.bgVideo}
//                         />
//                         {/* <MdOutlineFoodBank className={styles.foodIcon} /> */}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default RoleSelection;










import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; 
import styles from './RoleSelection.module.css';
// FaCheckCircle ko yahan se hata kar naye icons add kiye hain
import { FaCheckCircle, FaUsers, FaClock, FaShieldAlt } from 'react-icons/fa'; 
import { MdOutlineFoodBank } from "react-icons/md";
import navgurukulLogo from '../assets/ngLogo.png';
import { FaCalendarAlt, FaChartBar, FaCogs, FaBell } from 'react-icons/fa';

const RoleSelection = () => {
    return (
        <div className={styles.pageWrapper}>
            <Navbar showRegister={true} showSkipRequest={false} />
            
            <main className={styles.mainContent}>
                <div className={styles.leftColumn}>
                    <div className={styles.mainTitleContainer}>
                        <h1 className={styles.welcomeHeading}>Welcome to</h1>
                        <img src={navgurukulLogo} alt="Navgurukul Logo" className={styles.navgurukulLogo} />
                    </div>
                    
                    <p className={styles.description}>
                        "Kitchen Turn is a smart way to manage and organize daily kitchen duties in student hostels and communities. It helps track who is responsible, ensures fairness, and improves coordination."
                    </p>
                    
                    {/* ===== YEH PURANA 'HOW IT WORKS' SECTION HATAKAR NAYA CODE ADD KIYA GAYA HAI ===== */}
                    <div className={styles.featuresContainer}>
                        {/* Card 1 */}
                        <div className={styles.featureCard}>
                            <div className={styles.featureIconCircle}>
                                <FaCheckCircle />
                            </div>
                            <div className={styles.featureText}>
                                <h4 className={styles.featureTitle}>
                                    <FaUsers className={styles.titleIcon} /> Fair Assignment
                                </h4>
                                <p>Students are assigned to kitchen turns fairly.</p>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className={styles.featureCard}>
                            <div className={styles.featureIconCircle}>
                                <FaCheckCircle />
                            </div>
                            <div className={styles.featureText}>
                                <h4 className={styles.featureTitle}>
                                    <FaClock className={styles.titleIcon} /> Auto Updates
                                </h4>
                                <p>Daily team list is automatically updated.</p>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className={styles.featureCard}>
                            <div className={styles.featureIconCircle}>
                                <FaCheckCircle />
                            </div>
                            <div className={styles.featureText}>
                                <h4 className={styles.featureTitle}>
                                    <FaShieldAlt className={styles.titleIcon} /> Smart Monitoring
                                </h4>
                                <p>Coordinator can manage and monitor turns.</p>
                            </div>
                        </div>
                    </div>
                    {/* ============================================================================== */}
                    
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
                    </div>
                </div>
            </main>

            {/* NAYA: Why Choose KitchenFlow Section, ab main content ke niche hai */}
            <section className={styles.featuresSection}>
                <div className={styles.featuresHeader}>
                    <h2>Why Choose <span className={styles.brandName}>KitchenFlow</span>?</h2>
                    <p>Experience seamless kitchen management with our comprehensive suite of features designed for student communities.</p>
                </div>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={`${styles.featureIconBox} ${styles.iconBlue}`}>
                            <FaCalendarAlt />
                        </div>
                        <h3>Smart Scheduling</h3>
                        <p>Automatically assign kitchen duties based on fair rotation and student availability.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={`${styles.featureIconBox} ${styles.iconGreen}`}>
                            <FaChartBar />
                        </div>
                        <h3>Analytics Dashboard</h3>
                        <p>Track participation, monitor completion rates, and generate detailed reports.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={`${styles.featureIconBox} ${styles.iconPurple}`}>
                            <FaCogs />
                        </div>
                        <h3>Easy Management</h3>
                        <p>Coordinators can easily manage teams, adjust schedules, and handle exceptions.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={`${styles.featureIconBox} ${styles.iconOrange}`}>
                            <FaBell />
                        </div>
                        <h3>Smart Notifications</h3>
                        <p>Automated reminders ensure everyone knows their kitchen responsibilities.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RoleSelection;
 
                  