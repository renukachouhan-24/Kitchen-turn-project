// Footer.jsx


import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaTwitter ,   FaPhone, FaGithub} from 'react-icons/fa'; 
import anishJadhavLogo from '../assets/AJMF.png'; 
import styles from './Footer.module.css';

const Footer = () => {
     
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className={styles.kitchenflowFooter}>
            <div className={styles.footerContentWrapper}>  
              
                <div className={styles.footerSection}>
            
                    <Link to="#" className={styles.logoLink} onClick={handleScrollToTop}>
                        <div className={styles.logoContainer}>
                    <span className={styles.samarkanText}>
                                          <span className={styles.redText}>nav</span>
                                          <span className={styles.blackText}>gurukul</span>
                                          </span>
                                           <span className={styles.all} > <span className={styles.logo}>Kitchen</span>Flow</span>
                        </div>
                    </Link>
                    
                    <p className={styles.projectDescription}>
                        KitchenFlow is a project by Navgurukul students, designed to manage kitchen duties efficiently and fairly.
                    </p>
                    <div className={styles.socialIconsNg}>
                        <a href="https://www.facebook.com/navgurukul" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                        <a href="https://www.linkedin.com/company/navgurukul" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                        <a href="https://twitter.com/navgurukul" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    </div>
                </div>
                
                <div className={styles.footerColumn}>
                    <h4>Links</h4>
                    <ul>
                        <li><a href="#about-us-section">About Us</a></li>
                        <li><a href="#featuresSection">Features</a></li>
                        <li><a href="#imageCarouselWrapper">User Experience</a></li>
                    </ul>
                </div>
                
               
                <div className={styles.footerMemorialLogo}>
                    <img src={anishJadhavLogo} alt="Anish Jadhav Memorial Foundation Logo" className={styles.memorialLogo} />
                </div>
            </div>


 
              <div className={styles.teamSection}>
              
              
                <div className={styles.memberCard}>
                    <h4 className={styles.memberName}>Prachi</h4>
                    <div className={styles.socialIcons}>
                        <a href="https://www.linkedin.com/in/prachi-kurwale-9545422bb/" className={`${styles.iconLink} ${styles.linkedin}`}><FaLinkedinIn /></a>
                        <a href="https://github.com/Prachikurwale" className={`${styles.iconLink} ${styles.github}`}><FaGithub /></a>
                        <a href="tel:+918208704528" className={`${styles.iconLink} ${styles.phone}`}><FaPhone /></a>
                       
                    </div>
                </div>

                {/* Member 2: Renuka */}
                <div className={styles.memberCard}>
                    <h4 className={styles.memberName}>Renuka</h4>
                    <div className={styles.socialIcons}>
                        <a href="https://www.linkedin.com/in/renuka-chouhan-05320432a/" className={`${styles.iconLink} ${styles.linkedin}`}><FaLinkedinIn /></a>
                        <a href=" https://github.com/renukachouhan-24" className={`${styles.iconLink} ${styles.github}`}><FaGithub /></a>
                        <a href="tel:+918305319363 " className={`${styles.iconLink} ${styles.phone}`}><FaPhone /></a>
                         
                    </div>
                </div>

                {/* Member 3: Nikita */}
                <div className={styles.memberCard}>
                    <h4 className={styles.memberName}>Nikita</h4>
                    <div className={styles.socialIcons}>
                        <a href="https://www.linkedin.com/in/nikitapanwar24/" className={`${styles.iconLink} ${styles.linkedin}`}><FaLinkedinIn /></a>
                        <a href="https://github.com/panwarnikita" className={`${styles.iconLink} ${styles.github}`}><FaGithub /></a>
                        <a href="tel:+919340194046" className={`${styles.iconLink} ${styles.phone}`}><FaPhone /></a>
                         
                    </div>
                </div>
            </div>

            <hr className={styles.separator} />

            <div className={styles.copyrightSection}>
                <p>&copy; {new Date().getFullYear()} Navgurukul. All rights reserved.</p>
                {/* <p>Crafted with ❤️ by Renuka | Nikita | Prachi</p> */}
            </div>
        


   
        </footer>
    );
};

export default Footer;