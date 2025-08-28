import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; 
import styles from './RoleSelection.module.css';
import { FaCheckCircle, FaUsers, FaClock, FaShieldAlt, FaCalendarAlt, FaChartBar, FaCogs, FaBell, FaChevronLeft, FaChevronRight, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import navgurukulLogo from '../assets/ngLogo.png';
// import chefHatIcon from '../assets/chef.png';

// Apni images ko yahan import karein (10 images tak)
import carousel_image1 from '../assets/cooking.jpeg'; 
import carousel_image2 from '../assets/cooking1.jpeg'; 
import carousel_image3 from '../assets/cooking2.jpeg'; 
import carousel_image4 from '../assets/cooking3.jpeg'; 
 
const carouselImages = [
    carousel_image1,
    carousel_image2,
    carousel_image3,
    carousel_image4,
];

const RoleSelection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselImages.length) % carouselImages.length);
    };

    const getVisibleImages = () => {
        const images = [];
        for (let i = 0; i < 3; i++) {
            images.push(carouselImages[(currentSlide + i) % carouselImages.length]);
        }
        return images;
    };

    return (
        <div className={styles.pageWrapper}>
            <Navbar showRegister={true} showSkipRequest={false} />

            
            
            
            <main className={styles.mainContent}>
                <div   className={styles.mainTitleContainer}>
                    <h1 className={styles.welcomeHeading}>Welcome to</h1>
                    <img src={navgurukulLogo} alt="Navgurukul Logo" className={styles.navgurukulLogo} />
                </div>
                
                <p className={styles.description}>
                    Kitchen Turn is a smart way to manage and organize daily kitchen duties in student hostels and communities. It helps track who is responsible, ensures fairness, and improves coordination.
                </p>
                
                <div   id="imageCarouselWrapper"   className={styles.imageCarouselWrapper}>
                    <button onClick={prevSlide} className={styles.carouselArrowLeft}>
                        <FaChevronLeft />
                    </button>
                    <div className={styles.imageCarousel}>
                        {getVisibleImages().map((image, index) => (
                            <img 
                                key={index} 
                                src={image} 
                                alt={`Kitchen Turn ${index + 1}`} 
                                className={styles.carouselImage} 
                            />
                        ))}
                    </div>
                    <button onClick={nextSlide} className={styles.carouselArrowRight}>
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

            
            
            <footer className={styles.navgurukulFooter}>
    <div className={styles.footerContainer}>
        <div className={styles.footerLeft}>
            <div className={styles.footerLogoSection}>
                <img src={navgurukulLogo} alt="Navgurukul Logo" className={styles.navgurukulFooterLogo} />
              
            </div>
            <div className={styles.footerContactInfo}>
                <p>KitchenFlow is a project by Navgurukul students, designed to manage kitchen duties efficiently and fairly.</p>
            
            </div>
            <div className={styles.footerSocialIcons}>
                <a href="https://www.facebook.com/navgurukul" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                <a href="https://www.linkedin.com/company/navgurukul" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                <a href="https://twitter.com/navgurukul" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            </div>
        </div>

        <div className={styles.footerRight}>
            <div className={styles.footerColumn}>
                
                <ul>
                    <li><a href="#about-us-section">About Us</a></li>
                    <li><a href="#featuresSection">Features</a></li>
                    <li><a href="#imageCarouselWrapper">User Experience</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div className={styles.footerBottom}>
        <p>© 2025 KitchenFlow. All rights reserved.</p>
    </div>
</footer>
        </div>
    );
};

export default RoleSelection;