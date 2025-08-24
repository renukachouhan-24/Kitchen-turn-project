// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaKey } from 'react-icons/fa';
// import styles from './Navbar.module.css';

// const Navbar = ({ showRegister, showSkipRequest }) => {
//     return (
//         <header className={styles.header}>
//             <Link to="/"><div className={styles.logoContainer}>
//                 <FaKey />
//                 <span>KitchenFlow</span>
//             </div></Link>
//             <nav className={styles.mainNav}>
//                 <Link to="/dashboard">Student</Link>
//                 <Link to="/today-team">Today's Kitchen Team</Link>
//                 <Link to="/coordinator">Coordinator</Link>
//                 {/* Yahan par conditional rendering ka sahi istemal kiya gaya hai */}
//                 {showRegister && (
//                     <Link to="/register" className={styles.registerBtn}>Register</Link>
//                 )}
//             </nav>
//         </header>
//     );
// };

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';
// Yahan FaKey aur FaRegPaperPlane icons import kiye gaye hain
import { FaKey, FaRegPaperPlane } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = ({ showRegister, showSkipRequest }) => {
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
                
                {showRegister && (
                    <Link to="/register" className={styles.registerBtn}>Register</Link>
                )}
                
                {/* Yahan par showSkipRequest prop ka sahi istemal kiya gaya hai */}
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