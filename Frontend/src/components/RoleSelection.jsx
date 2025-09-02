
// import React, { useState, useRef } from 'react'; 
// import { Link } from 'react-router-dom';
// import Navbar from './Navbar'; 
// import Footer from './Footer';
// import styles from './RoleSelection.module.css';
// import { FaCheckCircle, FaUsers, FaClock, FaShieldAlt, FaCalendarAlt, FaChartBar, FaCogs, FaBell, FaChevronLeft, FaChevronRight, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
// import navgurukulLogo from '../assets/navgurukul.png';
// import ajmfLogo from "../assets/AJMF.png";


// import carousel_image1 from '../assets/cooking1.jpeg'; 
// import carousel_image2 from '../assets/cooking2.jpeg'; 
// import carousel_image3 from '../assets/cooking3.jpeg'; 
// import carousel_image4 from '../assets/cooking4.jpeg'; 
// import carousel_image5 from '../assets/cooking5.jpeg'; 
// import carousel_image6 from '../assets/cooking6.jpeg'; 
// import carousel_image7 from '../assets/cooking7.jpeg'; 

// const carouselImages = [
//     carousel_image5,
//     carousel_image6,
//     carousel_image7,
//     carousel_image4,
//     carousel_image1,
//     carousel_image2,
//     carousel_image3,
// ];

// const RoleSelection = () => {
//     const carouselRef = useRef(null);

    

//     const nextSlideManual = () => {
//         if (carouselRef.current) {
//             const scrollAmount = carouselRef.current.offsetWidth / 3;
//             carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//         }
//     };

//     const prevSlideManual = () => {
//         if (carouselRef.current) {
//             const scrollAmount = carouselRef.current.offsetWidth / 3;
//             carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//         }
//     };
    
//     return (
//         <div className={styles.pageWrapper}>
//             <Navbar showRegister={true} showSkipRequest={false} />

//             <main className={styles.mainContent}>
//                 <div className={styles.mainTitleContainer}>
//                     <h1 className={styles.welcomeHeading}>Welcome to</h1>
//                     <img src={navgurukulLogo} alt="Navgurukul Logo" className={styles.navgurukulLogo} />
                     
//                         <img src={ajmfLogo} alt="AJMF-Logo" className={styles.ajmfLogo}/>
                  
//                 </div>

                
//                 <p className={styles.description}>
//                     Kitchen Turn is a smart way to manage and organize daily kitchen duties in student hostels and communities. It helps track who is responsible, ensures fairness, and improves coordination.
//                 </p>
                
//                 <div id="imageCarouselWrapper" className={styles.imageCarouselWrapper}>
//                     <button onClick={prevSlideManual} className={styles.carouselArrowLeft}>
//                         <FaChevronLeft />
//                     </button>
//                     <div className={styles.imageCarousel} ref={carouselRef}>
//                         {carouselImages.map((image, index) => (
//                             <img 
//                                 key={index} 
//                                 src={image} 
//                                 alt={`Kitchen Turn ${index + 1}`} 
//                                 className={styles.carouselImage} 
//                             />
//                         ))}
//                     </div>
//                     <button onClick={nextSlideManual} className={styles.carouselArrowRight}>
//                         <FaChevronRight />
//                     </button>
//                 </div>

//                 <div className={styles.howItWorksContainer}>
//                     <div className={styles.howItWorksCard}>
//                         <div className={styles.howItWorksIconCircle}>
//                             <FaCheckCircle />
//                         </div>
//                         <div className={styles.howItWorksText}>
//                             <h4 className={styles.howItWorksTitle}>
//                                 <FaUsers className={styles.howItWorksTitleIcon} /> Fair Assignment
//                             </h4>
//                             <p>Students are assigned to kitchen turns fairly.</p>
//                         </div>
//                     </div>
//                     <div className={styles.howItWorksCard}>
//                         <div className={styles.howItWorksIconCircle}>
//                             <FaCheckCircle />
//                         </div>
//                         <div className={styles.howItWorksText}>
//                             <h4 className={styles.howItWorksTitle}>
//                                 <FaClock className={styles.howItWorksTitleIcon} /> Auto Updates
//                             </h4>
//                             <p>Daily team list is automatically updated.</p>
//                         </div>
//                     </div>
//                     <div className={styles.howItWorksCard}>
//                         <div className={styles.howItWorksIconCircle}>
//                             <FaCheckCircle />
//                         </div>
//                         <div className={styles.howItWorksText}>
//                             <h4 className={styles.howItWorksTitle}>
//                                 <FaShieldAlt className={styles.howItWorksTitleIcon} /> Smart Monitoring
//                             </h4>
//                             <p>Coordinator can manage and monitor turns.</p>
//                         </div>
//                     </div>
//                 </div>
                
//                 <Link to="/today-team" className={styles.outlineBtn}>
//                     View Today's Team
//                 </Link>
//             </main>

//             <section id="about-us-section" className={styles.aboutUsSection}>
//                 <div className={styles.aboutUsContent}>
//                     <h2>About Us</h2>
//                     <p>
//                         Our project <strong>KitchenFlow</strong> was born out of a common challenge faced by students at Navgurukul: managing daily kitchen duties efficiently and fairly. We saw that unorganized schedules and a lack of transparency often led to confusion and conflicts.
//                     </p>
//                     <p>
//                         To solve this, our team developed KitchenFlow. Our mission is to create a seamless and transparent system for managing kitchen responsibilities in student communities. We believe that with the right tools, everyone can contribute equally, ensuring a harmonious and clean living environment.
//                     </p>
//                     <p>
//                         This project is a testament to our learning at Navgurukul. We've used our skills to build a solution that not only solves a real-world problem but also promotes better coordination and fairness among students.
//                     </p>
//                 </div>
//             </section>
            
//             <section id="featuresSection" className={styles.featuresSection}>
//                 <div className={styles.featuresHeader}>
//                     <h2>Why Choose <span className={styles.brandName}>KitchenFlow</span>?</h2>
//                     <p>Experience seamless kitchen management with our comprehensive suite of features designed for student communities.</p>
//                 </div>
//                 <div className={styles.featuresGrid}>
//                     <div className={styles.featureCard}>
//                         <div className={`${styles.featureIconBox} ${styles.iconBlue}`}>
//                             <FaCalendarAlt />
//                         </div>
//                         <h3>Smart Scheduling</h3>
//                         <p>Automatically assign kitchen duties based on fair rotation and student availability.</p>
//                     </div>
//                     <div className={styles.featureCard}>
//                         <div className={`${styles.featureIconBox} ${styles.iconGreen}`}>
//                             <FaChartBar />
//                         </div>
//                         <h3>Analytics Dashboard</h3>
//                         <p>Track participation, monitor completion rates, and generate detailed reports.</p>
//                     </div>
//                     <div className={styles.featureCard}>
//                         <div className={`${styles.featureIconBox} ${styles.iconPurple}`}>
//                             <FaCogs />
//                         </div>
//                         <h3>Easy Management</h3>
//                         <p>Coordinators can easily manage teams, adjust schedules, and handle exceptions.</p>
//                     </div>
//                     <div className={styles.featureCard}>
//                         <div className={`${styles.featureIconBox} ${styles.iconOrange}`}>
//                             <FaBell />
//                         </div>
//                         <h3>Smart Notifications</h3>
//                         <p>Automated reminders ensure everyone knows their kitchen responsibilities.</p>
//                     </div>
//                 </div>
//             </section>
            
//             <Footer />
//         </div>
//     );
// };

// export default RoleSelection;




import React, { useRef } from 'react'; 
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; 
import Footer from './Footer';
import styles from './RoleSelection.module.css';
import { FaCheckCircle, FaUsers, FaClock, FaShieldAlt, FaCalendarAlt, FaChartBar, FaCogs, FaBell, FaChevronLeft, FaChevronRight, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import navgurukulLogo from '../assets/navgurukul.png';
import ajmfLogo from "../assets/AJMF.png";


import carousel_image1 from '../assets/cooking1.jpeg'; 
import carousel_image2 from '../assets/cooking2.jpeg'; 
import carousel_image3 from '../assets/cooking3.jpeg'; 
import carousel_image4 from '../assets/cooking4.jpeg'; 
import carousel_image5 from '../assets/cooking5.jpeg'; 
import carousel_image6 from '../assets/cooking6.jpeg'; 
import carousel_image7 from '../assets/cooking7.jpeg'; 

const carouselImages = [
    carousel_image5,
    carousel_image6,
    carousel_image7,
    carousel_image4,
    carousel_image1,
    carousel_image2,
    carousel_image3,
];

const RoleSelection = () => {
    const carouselRef = useRef(null);

    const nextSlideManual = () => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.offsetWidth / 3;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const prevSlideManual = () => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.offsetWidth / 3;
            carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };
    
    return (
        <div className={styles.pageWrapper}>
            <Navbar showRegister={true} showSkipRequest={false} />

            <main className={styles.mainContent}>
                <div className={styles.mainTitleContainer}>
                    <h1 className={styles.welcomeHeading}>Welcome to</h1>
                    <img src={navgurukulLogo} alt="Navgurukul Logo" className={styles.navgurukulLogo} />
                     
                        <img src={ajmfLogo} alt="AJMF-Logo" className={styles.ajmfLogo}/>
                  
                </div>

                
                <p className={styles.description}>
                    Kitchen Turn is a smart way to manage and organize daily kitchen duties in student hostels and communities. It helps track who is responsible, ensures fairness, and improves coordination.
                </p>
                
                <div id="imageCarouselWrapper" className={styles.imageCarouselWrapper}>
                    <button onClick={prevSlideManual} className={styles.carouselArrowLeft}>
                        <FaChevronLeft />
                    </button>
                    <div className={styles.imageCarousel} ref={carouselRef}>
                        {carouselImages.map((image, index) => (
                            <img 
                                key={index} 
                                src={image} 
                                alt={`Kitchen Turn ${index + 1}`} 
                                className={styles.carouselImage} 
                            />
                        ))}
                    </div>
                    <button onClick={nextSlideManual} className={styles.carouselArrowRight}>
                        <FaChevronRight />
                    </button>
                </div>

                <div className={styles.howItWorksContainer}>
                    <div className={styles.howItWorksCard}>
                        <div className={styles.howItWorksIconCircle}>
                            <FaCheckCircle />
                        </div>
                        <div className={styles.howItWorksText}>
                            <h4 className={styles.howItWorksTitle}>
                                <FaUsers className={styles.howItWorksTitleIcon} /> Fair Assignment
                            </h4>
                            <p>Students are assigned to kitchen turns fairly.</p>
                        </div>
                    </div>
                    <div className={styles.howItWorksCard}>
                        <div className={styles.howItWorksIconCircle}>
                            <FaCheckCircle />
                        </div>
                        <div className={styles.howItWorksText}>
                            <h4 className={styles.howItWorksTitle}>
                                <FaClock className={styles.howItWorksTitleIcon} /> Auto Updates
                            </h4>
                            <p>Daily team list is automatically updated.</p>
                        </div>
                    </div>
                    <div className={styles.howItWorksCard}>
                        <div className={styles.howItWorksIconCircle}>
                            <FaCheckCircle />
                        </div>
                        <div className={styles.howItWorksText}>
                            <h4 className={styles.howItWorksTitle}>
                                <FaShieldAlt className={styles.howItWorksTitleIcon} /> Smart Monitoring
                            </h4>
                            <p>Coordinator can manage and monitor turns.</p>
                        </div>
                    </div>
                </div>
                
                <Link to="/today-team" className={styles.outlineBtn}>
                    View Today's Team
                </Link>
            </main>

            <section id="about-us-section" className={styles.aboutUsSection}>
                <div className={styles.aboutUsContent}>
                    <h2>About Us</h2>
                    <p>
                        Our project <strong>KitchenFlow</strong> was born out of a common challenge faced by students at Navgurukul: managing daily kitchen duties efficiently and fairly. We saw that unorganized schedules and a lack of transparency often led to confusion and conflicts.
                    </p>
                    <p>
                        To solve this, our team developed KitchenFlow. Our mission is to create a seamless and transparent system for managing kitchen responsibilities in student communities. We believe that with the right tools, everyone can contribute equally, ensuring a harmonious and clean living environment.
                    </p>
                    <p>
                        This project is a testament to our learning at Navgurukul. We've used our skills to build a solution that not only solves a real-world problem but also promotes better coordination and fairness among students.
                    </p>
                </div>
            </section>
            
            <section id="featuresSection" className={styles.featuresSection}>
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
            
            <Footer />
        </div>
    );
};

export default RoleSelection;

