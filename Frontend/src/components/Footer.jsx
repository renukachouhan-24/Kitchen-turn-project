import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import navgurukulLogo from '../assets/navgurukul.png'; 
import anishJadhavLogo from '../assets/AJMF.png'; 
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.kitchenflowFooter}>
            <div className={styles.footerContentWrapper}>
                {/* Left Section: Navgurukul Info */}
                <div className={styles.footerSection}>
                    <img src={navgurukulLogo} alt="Navgurukul Logo" className={styles.navgurukulLogo} />
                    <p className={styles.projectDescription}>
                        KitchenFlow is a project by Navgurukul students, designed to manage kitchen duties efficiently and fairly.
                    </p>
                    <div className={styles.socialIcons}>
                        <a href="https://www.facebook.com/navgurukul" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                        <a href="https://www.linkedin.com/company/navgurukul" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                        <a href="https://twitter.com/navgurukul" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    </div>
                </div>
                 
                    <div className={styles.footerColumn}>
                        <ul>
                            <li><a href="#about-us-section">About Us</a></li>
                            <li><a href="#featuresSection">Features</a></li>
                            <li><a href="#imageCarouselWrapper">User Experience</a></li>
                        </ul>
                    </div>
                {/* Right Section: Anish Jadhav Memorial Logo */}
                <div className={styles.footerMemorialLogo}>
                    <img src={anishJadhavLogo} alt="Anish Jadhav Memorial Foundation Logo" className={styles.memorialLogo} />
                </div>
            </div>

            {/* Bottom Section: Crafted by... */}
            <div className={styles.footerCraftedBy}>
                <p>Crafted with ❤️ by Renuka | Nikita | Prachi</p>
            </div>
        </footer>
    );
};

export default Footer;