// import React from 'react';
// import styles from './TodayKitchenTeam.module.css';
// import { FaTimesCircle, FaTrophy } from 'react-icons/fa';
// 

// const StarTeamsModal = ({ topTeams, onClose }) => {
//  return (
//   <div className={styles.modalOverlay}>
//   <div className={styles.modalContent}>
//   <button className={styles.modalCloseButton} onClick={onClose}>
//   <FaTimesCircle />
// </button>
// m <div className={styles.modalHeader}>
//  <FaTrophy className={styles.modalIcon} />
//  <h2>Top 5 Star Teams</h2>
//  </div>
// <div className={styles.modalBody}>
//  <ul className={styles.modalList}>
// {topTeams.length > 0 ? (
//  topTeams.map((team, index) => (
// <li key={team._id} className={styles.modalListItem}>
// <span className={styles.modalRank}>{index + 1}.</span>
// <span className={styles.modalTeamName}>{team.teamMembers.join(', ')}</span> {/* Yahan change kiya hai */}
//  <span className={styles.modalTeamStars}>{team.totalStars} Stars</span>
//  </li>
//  ))
//  ) : (
//   <li className={styles.emptyListMessage}>No teams have been rated yet.</li>
//  )}
//  </ul>
//  </div>
//</div>
//  </div>
//  );
// };

// export default StarTeamsModal;

import React from 'react';
import styles from './TodayKitchenTeam.module.css';
import { FaTimesCircle, FaTrophy } from 'react-icons/fa';

const StarTeamsModal = ({ topTeams, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.modalCloseButton} onClick={onClose}>
                    <FaTimesCircle />
                </button>
                <div className={styles.modalHeader}>
                    <FaTrophy className={styles.modalIcon} />
                    <h2>Top 5 Star Teams</h2>
                </div>
                <div className={styles.modalBody}>
                    <ul className={styles.modalList}>
                        {topTeams.length > 0 ? (
                            topTeams.map((team, index) => (
                                <li key={team._id} className={styles.modalListItem}>
                                    <span className={styles.modalRank}>{index + 1}.</span>
                                    <span className={styles.modalTeamName}>{team.teamMembers.join(', ')}</span> {/* This line was changed to fix the whitespace issue */}
                                    <span className={styles.modalTeamStars}>{team.totalStars} Stars</span>
                                </li>
                            ))
                        ) : (
                            <li className={styles.emptyListMessage}>No teams have been rated yet.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StarTeamsModal;