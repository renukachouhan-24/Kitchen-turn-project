import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload, FaStar, FaPlusCircle, FaTimesCircle, FaUtensils, FaUsers, FaCommentDots, FaRegSmile } from 'react-icons/fa';
import Navbar from './Navbar';
import styles from './TodayKitchenTeam.module.css';
import Picker from 'emoji-picker-react';

const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

const TodayKitchenTeam = () => {
    // 1. Menu state ab localStorage se load hota hai
    const [todayMenu, setTodayMenu] = useState(() => {
        const savedMenu = localStorage.getItem('todayMenu');
        return savedMenu ? JSON.parse(savedMenu) : {
            breakfast: [],
            lunch: [],
            snacks: [],
            dinner: [],
        };
    });

    // 2. Ratings state ab localStorage se load hota hai
    const [ratings, setRatings] = useState(() => {
        const savedRatings = localStorage.getItem('ratings');
        return savedRatings ? JSON.parse(savedRatings) : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    });

    const totalRatings = Object.values(ratings).reduce((sum, count) => sum + count, 0);

    // 3. Feedback list state ab localStorage se load hota hai
    const [feedbackList, setFeedbackList] = useState(() => {
        const savedFeedback = localStorage.getItem('feedbackList');
        return savedFeedback ? JSON.parse(savedFeedback) : [];
    });
    
    // ... (baaki ke states)
    const [todayTeam, setTodayTeam] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

     const [hasRatedToday, setHasRatedToday] = useState(false);
    const [hasGivenFeedbackToday, setHasGivenFeedbackToday] = useState(false); // NEW STATE for feedback
    const [starTeam, setStarTeam] = useState(null);
    const [topTeams, setTopTeams] = useState([]);
    const [isStarTeamsModalOpen, setIsStarTeamsModalOpen] = useState(false);
    const [currentTeamVotes, setCurrentTeamVotes] = useState(0);

     const [userRole, setUserRole] = useState('');

    const isCoordinator = userRole === 'coordinator';

     useEffect(() => {
        try {
            const userData = localStorage.getItem('user');  
            if (userData) {
                const user = JSON.parse(userData);
                if (user && user.role) {
                    setUserRole(user.role);
                }
            }
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
        }
    }, []);  

     const fetchData = async () => {
        try {
            const [menuRes, studentsRes, feedbackRes, topTeamsRes, photosRes] = await axios.all([
                axios.get('https://kitchen-turn-project-1-j2n3.onrender.com/menu/today'),
                axios.get('https://kitchen-turn-project-1-j2n3.onrender.com/students/active'),
                axios.get('https://kitchen-turn-project-1-j2n3.onrender.com/api/feedback'),
                axios.get('https://kitchen-turn-project-1-j2n3.onrender.com/api/ratings/top-teams'),
                axios.get('https://kitchen-turn-project-1-j2n3.onrender.com/api/photos')
            ]);
            
            setTodayMenu(menuRes.data);
            setFeedbackList(feedbackRes.data);
            setTopTeams(topTeamsRes.data);
            setUploadedPhotos(photosRes.data);

            const activeStudents = studentsRes.data;
            let currentKitchenTeam = [];

            if (menuRes.data.kitchenTeam && menuRes.data.kitchenTeam.length > 0) {
                currentKitchenTeam = menuRes.data.kitchenTeam;
            } else {
                currentKitchenTeam = activeStudents.slice(0, 5);
            }
            setTodayTeam(currentKitchenTeam);

            if (topTeamsRes.data && topTeamsRes.data.length > 0) {
                setStarTeam(topTeamsRes.data[0]);
            }

            const currentTeamNames = currentKitchenTeam.map(member => member.name).sort();
            
             const votedForTeam = JSON.parse(localStorage.getItem('votedForTeam') || '[]');
            if (JSON.stringify(votedForTeam) === JSON.stringify(currentTeamNames)) {
                setHasRatedToday(true);
            } else {
                setHasRatedToday(false);
            }

             const feedbackForTeam = JSON.parse(localStorage.getItem('feedbackForTeam') || '[]');
            if (JSON.stringify(feedbackForTeam) === JSON.stringify(currentTeamNames)) {
                setHasGivenFeedbackToday(true);
            } else {
                setHasGivenFeedbackToday(false);
            }

            const teamRating = topTeamsRes.data.find(team =>
                JSON.stringify(team.teamMembers.sort()) === JSON.stringify(currentTeamNames)
            );
            
            if (teamRating) {
                setCurrentTeamVotes(teamRating.voteCount);
            } else {
                setCurrentTeamVotes(0);
            }

        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };

    useEffect(() => {
        localStorage.setItem('uploadedPhotos', JSON.stringify(uploadedPhotos));
    }, [uploadedPhotos]);

    // ... (existing functions)

    const handleAddMealItem = (e) => {
        e.preventDefault();
        const mealType = e.target.elements.mealType.value;
        const foodName = e.target.elements.foodName.value;
        const nutrients = e.target.elements.nutrients.value;
        if (!foodName || !nutrients) return;
        axios.patch(`https://kitchen-turn-project-1-j2n3.onrender.com/menu/update-meal/${mealType}`, { foodName, nutrients })
            .then(() => fetchData())
            .catch(err => console.error("Error adding meal:", err));
        e.target.reset();
    };

    const handleRemoveMealItem = (mealType, itemId) => {
        axios.patch(`https://kitchen-turn-project-1-j2n3.onrender.com/menu/remove-meal/${mealType}/${itemId}`)
            .then(() => fetchData())
            .catch(err => console.error("Error removing meal:", err));
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (hasGivenFeedbackToday) {
            alert("You have already submitted feedback for today's team.");
            return;
        }
        if (feedback.trim() === '') return;
        const newFeedback = { comment: feedback };
        axios.post('https://kitchen-turn-project-1-j2n3.onrender.com/api/feedback/add', newFeedback)
            .then(() => {
                const teamMembers = todayTeam.map(member => member.name).sort();
                localStorage.setItem('feedbackForTeam', JSON.stringify(teamMembers));
                setHasGivenFeedbackToday(true);
                setFeedback('');
                alert('Feedback submitted successfully!');
                fetchData();
            })
            .catch(() => alert('Could not submit feedback.'));
    };
    
    const handleRateFood = (starValue) => {
        if (hasRatedToday) {
            alert("You have already rated today's meal.");
            return;
        }
        
        const teamMembers = todayTeam.map(member => member.name);

        if (teamMembers.length === 0) {
            alert("Cannot rate. No kitchen team assigned today.");
            return;
        }

        axios.post('https://kitchen-turn-project-1-j2n3.onrender.com/api/ratings/add', { teamMembers, starValue })
            .then(() => {
                alert('Rating submitted successfully!');
                setSelectedRating(starValue);
                setHasRatedToday(true);
                localStorage.setItem('votedForTeam', JSON.stringify(teamMembers.sort())); 
                fetchData();
            })
            .catch(err => {
                console.error("Error submitting rating:", err);
                alert('Could not submit rating. Please try again.');
            });
    };

    const handleResetStars = () => {
        if (window.confirm("Are you sure you want to reset all team ratings to zero? This action cannot be undone.")) {
            axios.post('https://kitchen-turn-project-1-j2n3.onrender.com/api/ratings/reset')
                .then(() => {
                    alert('All ratings have been reset!');
                    setHasRatedToday(false);
                    setHasGivenFeedbackToday(false);  
                    setSelectedRating(0);
                    localStorage.removeItem('votedForTeam'); 
                    localStorage.removeItem('feedbackForTeam');  
                    fetchData();
                })
                .catch(err => {
                    console.error("Error resetting ratings:", err);
                    alert('Could not reset ratings.');
                });
        }
    };
    
    const onEmojiClick = (emojiObject) => { setFeedback(prev => prev + emojiObject.emoji); setShowEmojiPicker(false); };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        if (uploadedPhotos.length + files.length > 5) {
            alert(`You can only upload a maximum of 5 photos.`);
            return;
        }

        setIsUploading(true);
        try {
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                const response = await axios.post('https://kitchen-turn-project-1-j2n3.onrender.com/api/upload-photo', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                return response.data;
            });
            await Promise.all(uploadPromises);
            await fetchData();
            alert('Photos uploaded successfully!');
        } catch (error) {
            console.error("Error uploading photos:", error);
            alert('Could not upload photos. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };
    
    const handleRemovePhoto = async (photoId) => {
        try {
            await axios.delete(`https://kitchen-turn-project-1-j2n3.onrender.com/api/photos/${photoId}`);
            await fetchData();
            alert('Photo removed successfully!');
        } catch (error) {
            console.error("Error removing photo:", error);
            alert('Could not remove photo. Please try again.');
        }
    };
    
    return (
        <div className={styles.pageContainer}>
             <Navbar showRegister={false} />

            <div className={styles.contentWrapper}>
                <div className={styles.welcomeHeader}>
                    <h1>Welcome to Kitchen Management System</h1>
                    <p>Streamline your daily kitchen operations</p>
                </div>

                <section className={styles.managementSection}>
                    <div className={styles.sectionHeader}>
                        {/* <FaPlusCircle className={styles.sectionIcon} /> */}
                        <h2>Manage Today's Kitchen Team & Menu</h2>
                    </div>
                    
                    <form onSubmit={handleAddMealItem} className={styles.mealInputFormGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="mealType">Meal type</label>
                            <select 
                                id="mealType" 
                                name="mealType"
                                className={styles.selectInput}
                            >
                                {mealTypes.map(type => (
                                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="foodName">Food Name</label>
                            <input 
                                type="text" 
                                id="foodName" 
                                name="foodName"
                                placeholder="Enter food"
                                className={styles.textInput}
                                autoComplete='off'
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="nutrients">Nutrients</label>
                            <input 
                                type="text" 
                                id="nutrients" 
                                name="nutrients"
                                placeholder="Enter Nutrients"
                                className={styles.textInput}
                                autoComplete='off'
                            />
                        </div>
                        <button type="submit" className={styles.addMealButton}>
                            <FaPlusCircle /> Add New Item
                        </button>
                    </form>

                    <div className={styles.currentMenuGrid}>
                        {mealTypes.map(type => (
                            <div key={type} className={styles.mealCard}>
                                <div className={styles.mealCardHeader}>
                                    {/* <FaUtensils className={styles.mealIcon} /> */}
                                    <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                                    <span className={styles.itemCount}>{todayMenu[type] ? todayMenu[type].length : 0} item(s)</span>
                                </div>
                                <ul className={styles.menuList}>
                                    {todayMenu[type] && todayMenu[type].length > 0 ? todayMenu[type].map((item, idx) => (
                                        <li key={item._id || idx} className={styles.menuItem}>
                                            <strong>{item.foodName}</strong>
                                            <span className={styles.nutrients}>({item.nutrients})</span>
                                            <button 
                                                onClick={() => handleRemoveMealItem(type, item._id)} 
                                                className={styles.removeMealButton}
                                                title="Remove item"
                                            >
                                                <FaTimesCircle />
                                            </button>
                                        </li>
                                    )) : <li className={styles.emptyMenuItem}>No {type} items added.</li>}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
                
                <div className={`${styles.managementSection} ${styles.rosterAndPollContainer}`}>
                    <div className={styles.rosterSectionContent}>
                        <div className={styles.sectionHeader}>
                            <FaUsers className={styles.sectionIcon} />
                            <h2>Kitchen Roster</h2>
                        </div>
                        <div className={styles.rosterDisplay}>
                            <h3>Current Team: <span className={styles.itemCount}>{todayTeam.length} members</span></h3>
                            <ul className={styles.teamList}>
                                {todayTeam.length > 0 ? todayTeam.map((member) => (
                                    <li key={member._id} className={styles.teamMemberItem}>
                                        {member.name}
                                    </li>
                                )) : <li className={styles.emptyTeamItem}>No team members assigned for today.</li>}
                            </ul>
                        </div>
                    </div>
                    
                    <div className={styles.ratingPollSectionContent}>
                        <div className={styles.sectionHeader}>
                            <FaStar className={styles.sectionIcon} />
                            <h2>Food Feedback Poll</h2>
                        </div>
                        <div className={styles.ratingPollContainer}>
                            <p className={styles.pollQuestion}>How would you rate today's meal?</p>
                            <div className={styles.starSelection} onMouseLeave={() => setHoveredRating(0)}>
                                {[1, 2, 3, 4, 5].map((starValue) => (
                                    <FaStar 
                                        key={starValue} 
                                        className={`${styles.pollStar} ${
                                            (starValue <= selectedRating) || (starValue <= hoveredRating) ? styles.selected : ''
                                        }`} 
                                        onClick={() => handleRatingSubmit(starValue)}
                                        onMouseEnter={() => setHoveredRating(starValue)}
                                    />
                                ))}
                            </div>
                            <div className={styles.pollResults}>
                                {totalRatings > 0 ? (
                                    <>
                                        <div className={styles.overallRatingSummary}>
                                            <span className={styles.overallRatingLabel}>
                                                Overall Rating: {averageRating.toFixed(1)} / 5 ({(averageRating / 5 * 100).toFixed(0)}%)
                                            </span>
                                        </div>
                                        <p className={styles.totalVotes}>Total Votes: {totalRatings}</p>
                                    </>
                                ) : (
                                    <p className={styles.noVotes}>No ratings yet. Be the first to rate!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <section className={styles.managementSection}>
                    <div className={styles.sectionHeader}>
                        {/* <FaCommentDots className={styles.sectionIcon} /> */}
                        <h2>Meal Feedback & Comments</h2>
                    </div>
                    <form onSubmit={handleFeedbackSubmit} className={styles.feedbackForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="feedback">Share your thoughts on today's meal:</label>
                            <div className={styles.feedbackInputContainer}>
                                <textarea
                                    id="feedback"
                                    name="feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    rows="4"
                                    placeholder="e.g., The poha was great! But the lunch could have had more spice."
                                    className={styles.feedbackTextarea}
                                />
                                <FaRegSmile 
                                    className={styles.emojiButton} 
                                    onClick={() => setShowEmojiPicker(prev => !prev)} 
                                />
                                {showEmojiPicker && (
                                    <div className={styles.emojiPicker}>
                                        <Picker onEmojiClick={onEmojiClick} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <button type="submit" className={styles.submitButton}>
                            Submit Feedback
                        </button>
                    </form>
                    <div className={styles.feedbackListContainer}>
                        {feedbackList.length > 0 ? (
                            <ul className={styles.feedbackList}>
                                {feedbackList.map((comment, index) => (
                                    <li key={index} className={styles.feedbackItem}>
                                        <p className={styles.feedbackComment}>{comment}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className={styles.noFeedback}>No feedback submitted yet. Be the first!</p>
                        )}
                    </div>
                </section>

                <section className={styles.managementSection}>
                    <div className={styles.sectionHeader}>
                        {/* <FaUpload className={styles.sectionIcon} /> */}
                        <h2>Upload Today's Meal Photo</h2>
                    </div>
                    <div className={styles.photoUploadBox}>
                        <input 
                            type="file" 
                            id="meal-photo-upload" 
                            className={styles.fileInput} 
                            multiple
                            onChange={handleFileChange}
                            disabled={uploadedPhotos.length >= 5}
                        />
                        <label htmlFor="meal-photo-upload" className={styles.uploadLabel}>
                            <FaUpload /> Click to upload photos or drag and drop your meal photos here
                        </label>
                        <button 
                            className={styles.choosePhotoButton}
                            onClick={() => document.getElementById('meal-photo-upload').click()}
                            disabled={uploadedPhotos.length >= 5}
                        >
                            Choose Photos ({uploadedPhotos.length}/5)
                        </button>
                        
                        {uploadedPhotos.length > 0 && (
                            <div className={styles.uploadedPhotosContainer}>
                                {uploadedPhotos.map((photo, index) => (
                                    <div key={index} className={styles.uploadedPhotoItem}>
                                        <img src={photo.url} alt={photo.name} className={styles.thumbnail} />
                                        <button 
                                            onClick={() => handleRemovePhoto(photo.url)} 
                                            className={styles.removePhotoButton}
                                        >
                                            <FaTimesCircle />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TodayKitchenTeam;