// // src/components/SkipRequest.jsx

// import React from 'react';
// import { FaRegCompass, FaRegPaperPlane, FaExclamationCircle } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import styles from './SkipRequest.module.css'; // Iska apna CSS

// const SkipRequest = () => {
//   return (
//     <div className={styles.pageWrapper}>
//       <header className={styles.header}>
//         <div className={styles.logoContainer}>
//           <div className={styles.logoIcon}><div className={styles.logoShape}></div></div>
//           <span>KitchenFlow</span>
//         </div>
//         <nav className={styles.mainNav}>
//           <Link to="/dashboard">
//             <FaRegCompass /><span>Kitchen Overview</span>
//           </Link>
//           <Link to="/skip-request" className={styles.active}>
//             <FaRegPaperPlane /><span>Skip Request</span>
//           </Link>
//         </nav>
//         <div className={styles.userProfileNav}>Student</div>
//       </header>
      
//       <main className={styles.mainContent}>
//         <div className={styles.titleSection}>
//           <h1>Skip Kitchen Turn</h1>
//           <p>Request to skip your kitchen duty (maximum 3 days)</p>
//         </div>
//         <div className={styles.formCard}>
//           <div className={styles.formHeader}>
//             <h2>Skip Request Form</h2>
//             <p>Fill out all required fields</p>
//           </div>
//           <form className={styles.formBody}>
//             <div className={styles.formGroup}>
//               <label htmlFor="student-name">Student Name *</label>
//               <select id="student-name">
//                 <option>Select a student</option>
//                 <option>Riya Sharma</option>
//                 <option>Arjun Patel</option>
//               </select>
//             </div>
//             <div className={styles.formGroup}>
//               <label htmlFor="reason">Reason for Skipping *</label>
//               <textarea id="reason" rows="4" placeholder="Please provide a detailed reason..."></textarea>
//             </div>
//             <div className={styles.formRow}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="start-date">Start Date *</label>
//                 <input type="date" id="start-date" />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="days">Number of Days *</label>
//                 <select id="days">
//                   <option>1 day</option>
//                   <option>2 days</option>
//                   <option>3 days</option>
//                 </select>
//               </div>
//             </div>
//             <button type="submit" className={styles.submitButton}>Submit Skip Request</button>
//           </form>
//         </div>
//         <div className={styles.notesCard}>
//           <FaExclamationCircle className={styles.notesIcon} />
//           <div>
//             <h3>Important Notes</h3>
//             <ul>
//               <li>You can skip kitchen duty for a maximum of 3 consecutive days.</li>
//               <li>Your next turn will be rescheduled based on your original assignment date.</li>
//               <li>All requests require coordinator approval before taking effect.</li>
//             </ul>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };
// export default SkipRequest;

// src/components/SkipRequest.jsx

import React, { useState } from 'react';
import { FaRegCompass, FaRegPaperPlane, FaExclamationCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios ko import karein
import styles from './SkipRequest.module.css';

const SkipRequest = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    reason: '',
    startDate: '',
    numberOfDays: 1, // Default value
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Data ko backend ke URL par POST karein
      await axios.post('http://localhost:5000/skip-requests/add', formData);
      alert('Skip request submitted successfully!');
      // Form ko clear karein aur Coordinator Panel page par redirect karein
      setFormData({ studentName: '', reason: '', startDate: '', numberOfDays: 1 });
      navigate('/coordinator'); // Coordinator Panel page ka route
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* ... Header and other static content ... */}
      
      <main className={styles.mainContent}>
        <div className={styles.titleSection}>
          <h1>Skip Kitchen Turn</h1>
          <p>Request to skip your kitchen duty (maximum 3 days)</p>
        </div>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2>Skip Request Form</h2>
            <p>Fill out all required fields</p>
          </div>
          <form className={styles.formBody} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="student-name">Student Name *</label>
              <select id="student-name" name="studentName" value={formData.studentName} onChange={handleChange}>
                <option value="">Select a student</option>
                <option value="Riya Sharma">Riya Sharma</option>
                <option value="Arjun Patel">Arjun Patel</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reason">Reason for Skipping *</label>
              <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} rows="4" placeholder="Please provide a detailed reason..."></textarea>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="start-date">Start Date *</label>
                <input type="date" id="start-date" name="startDate" value={formData.startDate} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="days">Number of Days *</label>
                <select id="days" name="numberOfDays" value={formData.numberOfDays} onChange={handleChange}>
                  <option value="1">1 day</option>
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                </select>
              </div>
            </div>
            <button type="submit" className={styles.submitButton}>Submit Skip Request</button>
          </form>
        </div>
        {/* ... Important Notes section ... */}
      </main>
    </div>
  );
};

export default SkipRequest;