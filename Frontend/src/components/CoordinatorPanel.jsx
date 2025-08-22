// // src/components/CoordinatorPanel.jsx

// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './CoordinatorPanel.module.css';
// import { FaUserShield, FaUsers, FaClock, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaBullhorn } from 'react-icons/fa';

// const CoordinatorPanel = () => {
//   return (
//     <div className={styles.pageWrapper}>
//       {/* Coordinator ka alag Navbar */}
//       <header className={styles.header}>
//         <div className={styles.logoContainer}>
//           <FaUserShield />
//           <span>KitchenFlow</span>
//         </div>
//         <nav className={styles.mainNav}>
//           <Link to="/coordinator" className={styles.active}>
//             <span>Coordinator Panel</span>
//           </Link>
//           <Link to="/request-responses"> 
//             <span>Request Response</span>
//           </Link>
//         </nav>
//         <div className={styles.userProfileNav}>
//           Coordinator
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className={styles.mainContent}>
//         <div className={styles.titleSection}>
//           <FaUserShield className={styles.titleIcon} />
//           <h1>Coordinator Panel</h1>
//           <p>manage skip requests and kitchen assignments</p>
//         </div>

//         {/* Stat Cards */}
//         <div className={styles.statCardsContainer}>
//           <div className={styles.statCard}>
//             <FaUsers className={`${styles.statIcon} ${styles.total}`} />
//             <div>
//               <span className={styles.statCount}>0</span>
//               <span className={styles.statTitle}>Total Requests</span>
//             </div>
//           </div>
//           <div className={styles.statCard}>
//             <FaClock className={`${styles.statIcon} ${styles.pending}`} />
//             <div>
//               <span className={styles.statCount}>0</span>
//               <span className={styles.statTitle}>Pending</span>
//             </div>
//           </div>
//           <div className={styles.statCard}>
//             <FaCheckCircle className={`${styles.statIcon} ${styles.approved}`} />
//             <div>
//               <span className={styles.statCount}>0</span>
//               <span className={styles.statTitle}>Approved</span>
//             </div>
//           </div>
//           <div className={styles.statCard}>
//             <FaTimesCircle className={`${styles.statIcon} ${styles.rejected}`} />
//             <div>
//               <span className={styles.statCount}>0</span>
//               <span className={styles.statTitle}>Rejected</span>
//             </div>
//           </div>
//         </div>

//         {/* Filter Tabs */}
//         <div className={styles.filterTabs}>
//           <button className={`${styles.tab} ${styles.activeTab}`}>Pending <span>0</span></button>
//           <button className={styles.tab}>Approved <span>0</span></button>
//           <button className={styles.tab}>Rejected <span>0</span></button>
//           <button className={styles.tab}>All <span>0</span></button>
//         </div>

//         {/* Requests List */}
//         <div className={styles.requestsList}>
//           <div className={styles.emptyState}>
//             <FaExclamationCircle />
//             <p>No requests found</p>
//             <span>All requests have been processed</span>
//           </div>
//         </div>

//         {/* Guidelines Card */}
//         <div className={styles.guidelinesCard}>
//             <FaBullhorn className={styles.guidelinesIcon} />
//             <div>
//                 <h3>Coordinator Guidelines</h3>
//                 <ul>
//                     <li>Review skip requests promptly to ensure smooth kitchen operations</li>
//                     <li>Approved skips automatically adjust the duty schedule</li>
//                     <li>Students can request up to 3 consecutive skip days maximum</li>
//                 </ul>
//             </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CoordinatorPanel;

// src/components/CoordinatorPanel.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CoordinatorPanel.module.css';

import { FaUserShield, FaUsers, FaClock, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaBullhorn } from 'react-icons/fa';

const CoordinatorPanel = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* Coordinator ka alag Navbar */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <FaUserShield />
          <span>KitchenFlow</span>
        </div>
        <nav className={styles.mainNav}>
          <Link to="/coordinator" className={styles.active}>
            <span>Coordinator Panel</span>
          </Link>
          {/* Yahan 'to' prop ko change karein */}
          <Link to="/coordinator-requests"> 
            <span>Request Response</span>
          </Link>
        </nav>
        <div className={styles.userProfileNav}>
          Coordinator
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.titleSection}>
          <FaUserShield className={styles.titleIcon} />
          <h1>Coordinator Panel</h1>
          <p>manage skip requests and kitchen assignments</p>
        </div>

        {/* Stat Cards */}
        <div className={styles.statCardsContainer}>
          <div className={styles.statCard}>
            <FaUsers className={`${styles.statIcon} ${styles.total}`} />
            <div>
              <span className={styles.statCount}>0</span>
              <span className={styles.statTitle}>Total Requests</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <FaClock className={`${styles.statIcon} ${styles.pending}`} />
            <div>
              <span className={styles.statCount}>0</span>
              <span className={styles.statTitle}>Pending</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <FaCheckCircle className={`${styles.statIcon} ${styles.approved}`} />
            <div>
              <span className={styles.statCount}>0</span>
              <span className={styles.statTitle}>Approved</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <FaTimesCircle className={`${styles.statIcon} ${styles.rejected}`} />
            <div>
              <span className={styles.statCount}>0</span>
              <span className={styles.statTitle}>Rejected</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          <button className={`${styles.tab} ${styles.activeTab}`}>Pending <span>0</span></button>
          <button className={styles.tab}>Approved <span>0</span></button>
          <button className={styles.tab}>Rejected <span>0</span></button>
          <button className={styles.tab}>All <span>0</span></button>
        </div>

        {/* Requests List */}
        <div className={styles.requestsList}>
          <div className={styles.emptyState}>
            <FaExclamationCircle />
            <p>No requests found</p>
            <span>All requests have been processed</span>
          </div>
        </div>

        {/* Guidelines Card */}
        <div className={styles.guidelinesCard}>
            <FaBullhorn className={styles.guidelinesIcon} />
            <div>
                <h3>Coordinator Guidelines</h3>
                <ul>
                    <li>Review skip requests promptly to ensure smooth kitchen operations</li>
                    <li>Approved skips automatically adjust the duty schedule</li>
                    <li>Students can request up to 3 consecutive skip days maximum</li>
                </ul>
            </div>
        </div>
      </main>
    </div>
  );
};

export default CoordinatorPanel;