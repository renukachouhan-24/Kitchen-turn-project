// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // axios ko import karein
// import { FaUpload, FaStar, FaPlusCircle, FaTimesCircle, FaUtensils, FaUsers } from 'react-icons/fa';
// import Navbar from './Navbar';
// import styles from './TodayKitchenTeam.module.css';

// const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

// const TodayKitchenTeam = () => {
//     const [todayMenu, setTodayMenu] = useState(() => {
//         const savedMenu = localStorage.getItem('todayMenu');
//         if (savedMenu) {
//             return JSON.parse(savedMenu);
//         } else {
//             return {
//                 breakfast: [],
//                 lunch: [],
//                 snacks: [],
//                 dinner: [],
//             };
//         }
//     });
    
//     // **NEW STATE** - Aaj ki kitchen team ko store karne ke liye
//     const [todayTeam, setTodayTeam] = useState([]);
    
//     // **NEW EFFECT HOOK** - Jab component load ho tab aaj ki team fetch karein
//     useEffect(() => {
//         const fetchTodayTeam = async () => {
//             try {
//                 // Backend se active students ka data fetch karein
//                 const response = await axios.get('http://localhost:5000/students/active');
//                 // Active students mein se pehle 5 students ko today's team manenge
//                 setTodayTeam(response.data.slice(0, 5));
//             } catch (error) {
//                 console.error("Error fetching today's team:", error);
//             }
//         };

//         fetchTodayTeam();
        
//         // **Frontend timer** - Frontend ko har 24 ghante refresh karne ke liye
//         const refreshInterval = setInterval(() => {
//             fetchTodayTeam();
//         }, 86400000); // 24 hours = 86400000ms

//         return () => clearInterval(refreshInterval);
//     }, []);

//     // ... (existing code for menu, ratings, photos) ...
//     useEffect(() => {
//         localStorage.setItem('todayMenu', JSON.stringify(todayMenu));
//     }, [todayMenu]);
    
//     const [ratings, setRatings] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
//     const totalRatings = Object.values(ratings).reduce((sum, count) => sum + count, 0);

//     const [selectedRating, setSelectedRating] = useState(0);
//     const [hoveredRating, setHoveredRating] = useState(0);

//     const [uploadedPhotos, setUploadedPhotos] = useState([]);

//     const handleAddMealItem = (e) => {
//         e.preventDefault();
//         const mealType = e.target.elements.mealType.value;
//         const foodName = e.target.elements.foodName.value;
//         const nutrients = e.target.elements.nutrients.value;

//         if (!foodName || !nutrients) return;

//         const newMenuItem = { _id: Date.now(), foodName, nutrients };
//         setTodayMenu(prevMenu => ({
//             ...prevMenu,
//             [mealType]: [...prevMenu[mealType], newMenuItem],
//         }));
//         e.target.reset();
//     };

//     const handleRemoveMealItem = (mealType, itemId) => {
//         setTodayMenu(prevMenu => ({
//             ...prevMenu,
//             [mealType]: prevMenu[mealType].filter(item => item._id !== itemId),
//         }));
//     };

//     const handleRatingSubmit = (starValue) => {
//         setRatings(prevRatings => {
//             const newRatings = { ...prevRatings };
//             if (selectedRating !== 0) {
//                 newRatings[selectedRating] -= 1;
//             }
//             newRatings[starValue] += 1;
//             return newRatings;
//         });
//         setSelectedRating(starValue);
//     };

//     const calculateAverageRating = () => {
//         if (totalRatings === 0) return 0;
//         let sum = 0;
//         for (let i = 1; i <= 5; i++) {
//             sum += i * ratings[i];
//         }
//         return sum / totalRatings; 
//     };

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         const totalFiles = uploadedPhotos.length + files.length;
    
//         if (totalFiles > 5) {
//             alert(`You can only upload a maximum of 5 photos. You have already selected ${uploadedPhotos.length} photos.`);
//             return;
//         }    
//         const newPhotos = files.map(file => {
//             return {
//                 name: file.name,
//                 url: URL.createObjectURL(file)
//             };
//         });
        
//         setUploadedPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
//     };

//     const handleRemovePhoto = (photoUrl) => {
//         setUploadedPhotos(prevPhotos => prevPhotos.filter(photo => photo.url !== photoUrl));
//     };

//     const averageRating = calculateAverageRating();

//     return (
//         <div className={styles.pageContainer}>
//              <Navbar showRegister={false} />

//             <div className={styles.contentWrapper}>
//                 <div className={styles.welcomeHeader}>
//                     <h1>Welcome to Kitchen Management System</h1>
//                     <p>Streamline your daily kitchen operations</p>
//                 </div>

//                 <section className={styles.managementSection}>
//                     <div className={styles.sectionHeader}>
//                         <FaPlusCircle className={styles.sectionIcon} />
//                         <h2>Manage Today's Kitchen Team & Menu</h2>
//                     </div>
                    
//                     <form onSubmit={handleAddMealItem} className={styles.mealInputFormGrid}>
//                         <div className={styles.formGroup}>
//                             <label htmlFor="mealType">Meal type</label>
//                             <select 
//                                 id="mealType" 
//                                 name="mealType"
//                                 className={styles.selectInput}
//                             >
//                                 {mealTypes.map(type => (
//                                     <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className={styles.formGroup}>
//                             <label htmlFor="foodName">Food Name</label>
//                             <input 
//                                 type="text" 
//                                 id="foodName" 
//                                 name="foodName"
//                                 placeholder="e.g., Aloo Paratha"
//                                 className={styles.textInput}
//                             />
//                         </div>
//                         <div className={styles.formGroup}>
//                             <label htmlFor="nutrients">Nutrients</label>
//                             <input 
//                                 type="text" 
//                                 id="nutrients" 
//                                 name="nutrients"
//                                 placeholder="e.g., Carbs, Protein, Fiber"
//                                 className={styles.textInput}
//                             />
//                         </div>
//                         <button type="submit" className={styles.addMealButton}>
//                             <FaPlusCircle /> Add New Item
//                         </button>
//                     </form>

//                     <div className={styles.currentMenuGrid}>
//                         {mealTypes.map(type => (
//                             <div key={type} className={styles.mealCard}>
//                                 <div className={styles.mealCardHeader}>
//                                     <FaUtensils className={styles.mealIcon} />
//                                     <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
//                                     <span className={styles.itemCount}>{todayMenu[type] ? todayMenu[type].length : 0} item(s)</span>
//                                 </div>
//                                 <ul className={styles.menuList}>
//                                     {todayMenu[type] && todayMenu[type].length > 0 ? todayMenu[type].map((item, idx) => (
//                                         <li key={item._id || idx} className={styles.menuItem}>
//                                             <strong>{item.foodName}</strong>
//                                             <span className={styles.nutrients}>({item.nutrients})</span>
//                                             <button 
//                                                 onClick={() => handleRemoveMealItem(type, item._id)} 
//                                                 className={styles.removeMealButton}
//                                                 title="Remove item"
//                                             >
//                                                 <FaTimesCircle />
//                                             </button>
//                                         </li>
//                                     )) : <li className={styles.emptyMenuItem}>No {type} items added.</li>}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
                
//                 <div className={`${styles.managementSection} ${styles.rosterAndPollContainer}`}>
//                     <div className={styles.rosterSectionContent}>
//                         <div className={styles.sectionHeader}>
//                             <FaUsers className={styles.sectionIcon} />
//                             <h2>Kitchen Roster</h2>
//                         </div>
//                         <div className={styles.rosterDisplay}>
//                             <h3>Current Team: <span className={styles.itemCount}>{todayTeam.length} members</span></h3>
//                             <ul className={styles.teamList}>
//                                 {todayTeam.length > 0 ? todayTeam.map((member) => (
//                                     <li key={member._id} className={styles.teamMemberItem}>
//                                         {member.name}
//                                     </li>
//                                 )) : <li className={styles.emptyTeamItem}>No team members assigned for today.</li>}
//                             </ul>
//                         </div>
//                     </div>
                    
//                     <div className={styles.ratingPollSectionContent}>
//                         <div className={styles.sectionHeader}>
//                             <FaStar className={styles.sectionIcon} />
//                             <h2>Food Feedback Poll</h2>
//                         </div>
//                         <div className={styles.ratingPollContainer}>
//                             <p className={styles.pollQuestion}>How would you rate today's meal?</p>
//                             <div className={styles.starSelection} onMouseLeave={() => setHoveredRating(0)}>
//                                 {[1, 2, 3, 4, 5].map((starValue) => (
//                                     <FaStar 
//                                         key={starValue} 
//                                         className={`${styles.pollStar} ${
//                                             (starValue <= selectedRating) || (starValue <= hoveredRating) ? styles.selected : ''
//                                         }`} 
//                                         onClick={() => handleRatingSubmit(starValue)}
//                                         onMouseEnter={() => setHoveredRating(starValue)}
//                                     />
//                                 ))}
//                             </div>
//                             <div className={styles.pollResults}>
//                                 {totalRatings > 0 ? (
//                                     <>
//                                         <div className={styles.overallRatingSummary}>
//                                             <span className={styles.overallRatingLabel}>
//                                                 Overall Rating: {averageRating.toFixed(1)} / 5 ({(averageRating / 5 * 100).toFixed(0)}%)
//                                             </span>
//                                         </div>
//                                         <p className={styles.totalVotes}>Total Votes: {totalRatings}</p>
//                                     </>
//                                 ) : (
//                                     <p className={styles.noVotes}>No ratings yet. Be the first to rate!</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <section className={styles.managementSection}>
//                     <div className={styles.sectionHeader}>
//                         <FaUpload className={styles.sectionIcon} />
//                         <h2>Upload Today's Meal Photo</h2>
//                     </div>
//                     <div className={styles.photoUploadBox}>
//                         <input 
//                             type="file" 
//                             id="meal-photo-upload" 
//                             className={styles.fileInput} 
//                             multiple
//                             onChange={handleFileChange}
//                             disabled={uploadedPhotos.length >= 5}
//                         />
//                         <label htmlFor="meal-photo-upload" className={styles.uploadLabel}>
//                             <FaUpload /> Click to upload photos or drag and drop your meal photos here
//                         </label>
//                         <button 
//                             className={styles.choosePhotoButton}
//                             onClick={() => document.getElementById('meal-photo-upload').click()}
//                             disabled={uploadedPhotos.length >= 5}
//                         >
//                             Choose Photos ({uploadedPhotos.length}/5)
//                         </button>
                        
//                         {uploadedPhotos.length > 0 && (
//                             <div className={styles.uploadedPhotosContainer}>
//                                 {uploadedPhotos.map((photo, index) => (
//                                     <div key={index} className={styles.uploadedPhotoItem}>
//                                         <img src={photo.url} alt={photo.name} className={styles.thumbnail} />
//                                         <button 
//                                             onClick={() => handleRemovePhoto(photo.url)} 
//                                             className={styles.removePhotoButton}
//                                         >
//                                             <FaTimesCircle />
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default TodayKitchenTeam;

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
    const [uploadedPhotos, setUploadedPhotos] = useState(() => {
        const savedPhotos = localStorage.getItem('uploadedPhotos');
        return savedPhotos ? JSON.parse(savedPhotos) : [];
    });
    
    // YAHAN PAR 'LIFECYCLE' LOGIC HAI
    useEffect(() => {
        const fetchTodayTeam = async () => {
            try {
                const response = await axios.get('http://localhost:5000/students/active');
                setTodayTeam(response.data.slice(0, 5));
            } catch (error) {
                console.error("Error fetching today's team:", error);
            }
        };

        fetchTodayTeam();
        
        // Frontend timer jo har 24 ghante page ko refresh karega
        const refreshInterval = setInterval(() => {
            window.location.reload();
            // 24 ghante baad localStorage saaf karein
            localStorage.clear();
        }, 86400000); 

        return () => clearInterval(refreshInterval);
    }, []);

    // Jab bhi menu, ratings, feedback, ya photos badlenge, to unhe localStorage mein save karein
    useEffect(() => {
        localStorage.setItem('todayMenu', JSON.stringify(todayMenu));
    }, [todayMenu]);

    useEffect(() => {
        localStorage.setItem('ratings', JSON.stringify(ratings));
    }, [ratings]);
    
    useEffect(() => {
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
    }, [feedbackList]);

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
        const newMenuItem = { _id: Date.now(), foodName, nutrients };
        setTodayMenu(prevMenu => ({ ...prevMenu, [mealType]: [...prevMenu[mealType], newMenuItem] }));
        e.target.reset();
    };

    const handleRemoveMealItem = (mealType, itemId) => {
        setTodayMenu(prevMenu => ({
            ...prevMenu,
            [mealType]: prevMenu[mealType].filter(item => item._id !== itemId),
        }));
    };

    const handleRatingSubmit = (starValue) => {
        setRatings(prevRatings => {
            const newRatings = { ...prevRatings };
            if (selectedRating !== 0) {
                newRatings[selectedRating] -= 1;
            }
            newRatings[starValue] += 1;
            return newRatings;
        });
        setSelectedRating(starValue);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const totalFiles = uploadedPhotos.length + files.length;
        if (totalFiles > 5) {
            alert(`You can only upload a maximum of 5 photos. You have already selected ${uploadedPhotos.length} photos.`);
            return;
        }    
        const newPhotos = files.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file)
        }));
        setUploadedPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    };

    const handleRemovePhoto = (photoUrl) => {
        setUploadedPhotos(prevPhotos => prevPhotos.filter(photo => photo.url !== photoUrl));
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (feedback.trim() === '') return;
        setFeedbackList(prevList => [...prevList, feedback]);
        setFeedback('');
    };

    const onEmojiClick = (emojiObject) => {
        setFeedback(prevFeedback => prevFeedback + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const averageRating = totalRatings > 0 ? Object.keys(ratings).reduce((sum, star) => sum + star * ratings[star], 0) / totalRatings : 0;

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
                                placeholder="e.g., Aloo Paratha"
                                className={styles.textInput}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="nutrients">Nutrients</label>
                            <input 
                                type="text" 
                                id="nutrients" 
                                name="nutrients"
                                placeholder="e.g., Carbs, Protein, Fiber"
                                className={styles.textInput}
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