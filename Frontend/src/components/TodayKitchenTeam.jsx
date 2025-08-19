// // src/components/TodayKitchenTeam.jsx

// import React from 'react';
// import { FaUpload, FaStar } from 'react-icons/fa';
// import styles from './TodayKitchenTeam.module.css';

// const TodayKitchenTeam = () => {
//   // Placeholder data - later this will come from a backend
//   const todayMenu = [
//     { name: 'Aloo Paratha', nutrients: 'Carbs, Protein, Fiber' },
//     { name: 'Dal Makhani', nutrients: 'Protein, Iron, Fiber' },
//     { name: 'Jeera Rice', nutrients: 'Carbs' },
//     { name: 'Mixed Veg Curry', nutrients: 'Vitamins, Minerals' },
//   ];

//   const kitchenTeam = ['Rohan Sharma', 'Priya Singh', 'Amit Kumar'];

//   return (
//     <div className={styles.pageContainer}>
//       <div className={styles.contentWrapper}>
//         <h1 className={styles.pageTitle}>Today's Kitchen Team</h1>

//         {/* --- Menu and Nutrients Section --- */}
//         <section className={styles.section}>
//           <h2>🍽️ Today's Menu</h2>
//           <ul className={styles.menuList}>
//             {todayMenu.map((item, index) => (
//               <li key={index} className={styles.menuItem}>
//                 <strong>{item.name}</strong>
//                 <span className={styles.nutrients}>({item.nutrients})</span>
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* --- Kitchen Team Roster Section --- */}
//         <section className={styles.section}>
//           <h2>🧑‍🍳 Kitchen Roster</h2>
//           <ul className={styles.teamList}>
//             {kitchenTeam.map((member, index) => (
//               <li key={index}>{member}</li>
//             ))}
//           </ul>
//         </section>

//         {/* --- Photo Upload Section --- */}
//         <section className={styles.section}>
//           <h2>📸 Upload Today's Meal Photo</h2>
//           <div className={styles.photoUploadBox}>
//             <input type="file" id="meal-photo-upload" className={styles.fileInput} />
//             <label htmlFor="meal-photo-upload" className={styles.uploadLabel}>
//               <FaUpload /> Click to upload photo
//             </label>
//           </div>
//         </section>

//         {/* --- Feedback Section --- */}
//         <section className={styles.section}>
//           <h2>✍️ Give Feedback</h2>
//           <form className={styles.feedbackForm}>
//             <div className={styles.ratingSection}>
//               <p>Rate the food:</p>
//               <div className={styles.stars}>
//                 <FaStar className={styles.star} />
//                 <FaStar className={styles.star} />
//                 <FaStar className={styles.star} />
//                 <FaStar className={styles.star} />
//                 <FaStar className={styles.star} />
//               </div>
//             </div>
//             <textarea
//               placeholder="Share your thoughts on the meal..."
//               className={styles.feedbackTextarea}
//             ></textarea>
//             <button type="submit" className={styles.submitButton}>
//               Submit Feedback
//             </button>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default TodayKitchenTeam;

// src/components/TodayKitchenTeam.jsx

import React from 'react';
import { FaUpload, FaStar } from 'react-icons/fa';
import styles from './TodayKitchenTeam.module.css';

const TodayKitchenTeam = () => {
  // Placeholder data - later this will come from a backend
  const todayMenu = [
    { name: 'Aloo Paratha', nutrients: 'Carbs, Protein, Fiber' },
    { name: 'Dal Makhani', nutrients: 'Protein, Iron, Fiber' },
    { name: 'Jeera Rice', nutrients: 'Carbs' },
    { name: 'Mixed Veg Curry', nutrients: 'Vitamins, Minerals' },
  ];

  const kitchenTeam = ['Rohan Sharma', 'Priya Singh', 'Amit Kumar'];

  return (
    
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.pageTitle}>Today's Kitchen Team</h1>

        {/* This is the new wrapper for the horizontal layout */}
        <div className={styles.topSectionFlex}>
          {/* --- Menu and Nutrients Section --- */}
          <section className={styles.section}>
            <h2>🍽️ Today's Menu</h2>
            <ul className={styles.menuList}>
              {todayMenu.map((item, index) => (
                <li key={index} className={styles.menuItem}>
                  <strong>{item.name}</strong>
                  <span className={styles.nutrients}>({item.nutrients})</span>
                </li>
              ))}
            </ul>
          </section>

          {/* --- Kitchen Team Roster Section --- */}
          <section className={styles.section}>
            <h2>🧑‍🍳 Kitchen Roster</h2>
            <ul className={styles.teamList}>
              {kitchenTeam.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* --- Photo Upload Section --- */}
        <section className={styles.section}>
          <h2>📸 Upload Today's Meal Photo</h2>
          <div className={styles.photoUploadBox}>
            <input type="file" id="meal-photo-upload" className={styles.fileInput} />
            <label htmlFor="meal-photo-upload" className={styles.uploadLabel}>
              <FaUpload /> Click to upload photo
            </label>
          </div>
        </section>

        {/* --- Feedback Section --- */}
        <section className={styles.section}>
          <h2>✍️ Give Feedback</h2>
          <form className={styles.feedbackForm}>
            <div className={styles.ratingSection}>
              <p>Rate the food:</p>
              <div className={styles.stars}>
                <FaStar className={styles.star} />
                <FaStar className={styles.star} />
                <FaStar className={styles.star} />
                <FaStar className={styles.star} />
                <FaStar className={styles.star} />
              </div>
            </div>
            <textarea
              placeholder="Share your thoughts on the meal..."
              className={styles.feedbackTextarea}
            ></textarea>
            <button type="submit" className={styles.submitButton}>
              Submit Feedback
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default TodayKitchenTeam;