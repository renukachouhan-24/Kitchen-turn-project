import React from 'react';
import styles from './FeedbackModal.module.css';
import { FaTimes } from 'react-icons/fa';

const FeedbackModal = ({ feedbackList, onClose }) => {
    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Today's Feedback</h2>
                    <button className={styles.closeButton} onClick={onClose}><FaTimes /></button>
                </div>
                <div className={styles.modalBody}>
                    {feedbackList.length > 0 ? (
                        <ul className={styles.feedbackList}>
                            {feedbackList.map((item) => (
                                <li key={item._id} className={styles.feedbackItem}>
                                    <p className={styles.feedbackComment}>{item.comment}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.noFeedback}>No feedback submitted yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;