// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaUpload, FaStar, FaPlusCircle, FaTimesCircle, FaUsers, FaRegSmile } from 'react-icons/fa';
// import Navbar from './Navbar';
// import styles from './TodayKitchenTeam.module.css';
// import Picker from 'emoji-picker-react';
// import FeedbackModal from './FeedbackModal';
// import StarTeamsModal from './StarTeamsModal';

// const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

// const TodayKitchenTeam = () => {
//     // States for various features
//     const [todayMenu, setTodayMenu] = useState({ breakfast: [], lunch: [], snacks: [], dinner: [] });
//     // Ratings state ko ab backend se fetch kiya jayega, localstorage se nahi
//     const [feedbackList, setFeedbackList] = useState([]);
//     const [todayTeam, setTodayTeam] = useState([]);
//     const [tomorrowTeam, setTomorrowTeam] = useState([]);
//     const [feedback, setFeedback] = useState('');
//     const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedRating, setSelectedRating] = useState(0);
//     const [hoveredRating, setHoveredRating] = useState(0);
//     const [uploadedPhotos, setUploadedPhotos] = useState([]);

//     // NEW STATES
//     const [hasRatedToday, setHasRatedToday] = useState(false);
//     const [starTeam, setStarTeam] = useState(null);
//     const [topTeams, setTopTeams] = useState([]);
//     const [isStarTeamsModalOpen, setIsStarTeamsModalOpen] = useState(false);
//     const [currentTeamVotes, setCurrentTeamVotes] = useState(0); // नया स्टेट: आज की टीम के वोट्स

//     // Data fetching logic
//     const fetchData = async () => {
//         try {
//             const [menuRes, studentsRes, feedbackRes, topTeamsRes] = await axios.all([
//                 axios.get('http://localhost:5000/menu/today'),
//                 axios.get('http://localhost:5000/students/active'),
//                 axios.get('http://localhost:5000/api/feedback'),
//                 axios.get('http://localhost:5000/api/ratings/top-teams')
//             ]);
            
//             setTodayMenu(menuRes.data);
//             setFeedbackList(feedbackRes.data);
//             setTopTeams(topTeamsRes.data);

//             const activeStudents = studentsRes.data;
//             let currentKitchenTeam = [];

//             if (menuRes.data.kitchenTeam && menuRes.data.kitchenTeam.length > 0) {
//                 currentKitchenTeam = menuRes.data.kitchenTeam;
//             } else {
//                 currentKitchenTeam = activeStudents.slice(0, 5);
//             }
//             setTodayTeam(currentKitchenTeam);

//             const todayTeamIds = currentKitchenTeam.map(member => member._id);
//             const tomorrowCandidates = activeStudents.filter(s => !todayTeamIds.includes(s._id));
//             setTomorrowTeam(tomorrowCandidates.slice(0, 5));

//             if (topTeamsRes.data && topTeamsRes.data.length > 0) {
//                 setStarTeam(topTeamsRes.data[0]);
//             }

//             // आज की टीम के लिए वोट्स और रेटिंग स्टेटस चेक करें
//             const currentTeamNames = currentKitchenTeam.map(member => member.name);
//             const teamRating = topTeamsRes.data.find(team =>
//                 JSON.stringify(team.teamMembers.sort()) === JSON.stringify(currentTeamNames.sort())
//             );
            
//             if (teamRating) {
//                 setCurrentTeamVotes(teamRating.voteCount);
//                 // मान लें कि एक सेशन में एक ही बार रेटिंग दे सकते हैं
//                 // यह लॉजिक ऑथेंटिकेशन के बिना एक सरल समाधान है।
//                 const votedForTeam = localStorage.getItem('votedForTeam');
//                 if (votedForTeam === JSON.stringify(currentTeamNames)) {
//                     setHasRatedToday(true);
//                 } else {
//                     setHasRatedToday(false);
//                 }
//             } else {
//                 setCurrentTeamVotes(0);
//                 setHasRatedToday(false);
//             }

//         } catch (error) {
//             console.error("Error fetching initial data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//         // हर 1 मिनट में डेटा को फिर से फ़ेच करें, ताकि टीम अपडेट होने पर दिखे
//         const interval = setInterval(fetchData, 60000); 
//         return () => clearInterval(interval);
//     }, []);

//     // Handler Functions
//     const handleAddMealItem = (e) => {
//         e.preventDefault();
//         const mealType = e.target.elements.mealType.value;
//         const foodName = e.target.elements.foodName.value;
//         const nutrients = e.target.elements.nutrients.value;
//         if (!foodName || !nutrients) return;
//         axios.patch(`http://localhost:5000/menu/update-meal/${mealType}`, { foodName, nutrients })
//             .then(res => fetchData())
//             .catch(err => console.error("Error adding meal:", err));
//         e.target.reset();
//     };

//     const handleRemoveMealItem = (mealType, itemId) => {
//         axios.patch(`http://localhost:5000/menu/remove-meal/${mealType}/${itemId}`)
//             .then(res => fetchData())
//             .catch(err => console.error("Error removing meal:", err));
//     };

//     const handleFeedbackSubmit = (e) => {
//         e.preventDefault();
//         if (feedback.trim() === '') return;
//         const newFeedback = { comment: feedback };
//         axios.post('http://localhost:5000/api/feedback/add', newFeedback)
//             .then(res => {
//                 fetchData();
//                 setFeedback('');
//                 alert('Feedback submitted successfully!');
//             })
//             .catch(err => alert('Could not submit feedback.'));
//     };
    
//     // NEW RATING FUNCTIONS
//     const handleRateFood = (starValue) => {
//         if (hasRatedToday) {
//             alert("You have already rated today's meal.");
//             return;
//         }
        
//         const teamMembers = todayTeam.map(member => member.name);

//         if (teamMembers.length === 0) {
//             alert("Cannot rate. No kitchen team assigned today.");
//             return;
//         }

//         axios.post('http://localhost:5000/api/ratings/add', { teamMembers, starValue })
//             .then(res => {
//                 alert('Rating submitted successfully!');
//                 setSelectedRating(starValue);
//                 setHasRatedToday(true);
//                 localStorage.setItem('votedForTeam', JSON.stringify(teamMembers)); // लोकल स्टोरेज में सेव करें
//                 fetchData();
//             })
//             .catch(err => {
//                 console.error("Error submitting rating:", err);
//                 alert('Could not submit rating. Please try again.');
//             });
//     };

//     const handleResetStars = () => {
//         if (window.confirm("Are you sure you want to reset all team ratings to zero? This action cannot be undone.")) {
//             axios.post('http://localhost:5000/api/ratings/reset')
//                 .then(res => {
//                     alert('All ratings have been reset!');
//                     setHasRatedToday(false);
//                     setSelectedRating(0);
//                     localStorage.removeItem('votedForTeam'); // लोकल स्टोरेज से हटा दें
//                     fetchData();
//                 })
//                 .catch(err => {
//                     console.error("Error resetting ratings:", err);
//                     alert('Could not reset ratings.');
//                 });
//         }
//     };
    
//     const onEmojiClick = (emojiObject) => { setFeedback(prev => prev + emojiObject.emoji); setShowEmojiPicker(false); };
//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         if (uploadedPhotos.length + files.length > 5) {
//             alert(`You can only upload a maximum of 5 photos.`);
//             return;
//         } 
//         const newPhotos = files.map(file => ({ name: file.name, url: URL.createObjectURL(file) }));
//         setUploadedPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
//     };
//     const handleRemovePhoto = (photoUrl) => {
//         setUploadedPhotos(prevPhotos => prevPhotos.filter(photo => photo.url !== photoUrl));
//     };
    
//     return (
//         <div className={styles.pageContainer}>
//             <Navbar />
//             <div className={styles.contentWrapper}>
//                 <div className={styles.welcomeHeader}>
//                     <h1>Welcome to Kitchen Management System</h1>
//                     <p>Streamline your daily kitchen operations</p>
//                 </div>

//                 <section className={styles.managementSection}>
//                     <div className={styles.sectionHeader}><h2>Manage Today's Kitchen Team & Menu</h2></div>
//                     <form onSubmit={handleAddMealItem} className={styles.mealInputFormGrid}>
//                         <div className={styles.formGroup}><label htmlFor="mealType">Meal type</label><select id="mealType" name="mealType" className={styles.selectInput}>{mealTypes.map(type => <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>)}</select></div>
//                         <div className={styles.formGroup}><label htmlFor="foodName">Food Name</label><input type="text" id="foodName" name="foodName" placeholder="Enter Food" className={styles.textInput} autoComplete='off'/></div>
//                         <div className={styles.formGroup}><label htmlFor="nutrients">Nutrients</label><input type="text" id="nutrients" name="nutrients" placeholder="Enter Nutrients" className={styles.textInput} autoComplete='off'/></div>
//                         <button type="submit" className={styles.addMealButton}><FaPlusCircle /> Add New Item</button>
//                     </form>
//                     <div className={styles.currentMenuGrid}>
//                         {mealTypes.map(type => (
//                             <div key={type} className={styles.mealCard}>
//                                 <div className={styles.mealCardHeader}><h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3><span className={styles.itemCount}>{todayMenu[type]?.length || 0} item(s)</span></div>
//                                 <ul className={styles.menuList}>
//                                     {todayMenu[type]?.length > 0 ? todayMenu[type].map(item => (
//                                         <li key={item._id} className={styles.menuItem}><strong>{item.foodName}</strong><span className={styles.nutrients}>({item.nutrients})</span><button onClick={() => handleRemoveMealItem(type, item._id)} className={styles.removeMealButton} title="Remove item"><FaTimesCircle /></button></li>
//                                     )) : <li className={styles.emptyMenuItem}>No {type} items added.</li>}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
                
//                 <div className={`${styles.managementSection} ${styles.rosterAndPollContainer}`}>
//                     <div className={styles.rosterSectionContent}>
//                         <div className={styles.sectionHeader}><FaUsers /> <h2>Kitchen Roster</h2></div>
//                         <div className={styles.rosterDisplay}>
//                             <h3>Current Team:</h3>
//                             <ul className={styles.teamList}>
//                                 {todayTeam.length > 0 ? todayTeam.map(member => (<li key={member._id} className={styles.teamMemberItem}>{member.name}</li>)) : <li>No team members assigned.</li>}
//                             </ul>
//                         </div>
//                     </div>
//                     <div className={styles.ratingPollSectionContent}>
//                         <div className={styles.sectionHeader}><FaStar /> <h2>Food Feedback Poll</h2></div>
//                         <div className={styles.ratingPollContainer}>
//                             <p className={styles.pollQuestion}>How would you rate today's meal?</p>
//                             <div className={styles.starSelection} onMouseLeave={() => setHoveredRating(0)}>
//                                 {[1, 2, 3, 4, 5].map((starValue) => (
//                                     <FaStar
//                                         key={starValue}
//                                         className={`${styles.pollStar} ${(starValue <= selectedRating) || (starValue <= hoveredRating) ? styles.selected : ''}`}
//                                         onClick={() => setSelectedRating(starValue)}
//                                         onMouseEnter={() => setHoveredRating(starValue)}
//                                     />
//                                 ))}
//                             </div>
//                             {selectedRating > 0 && !hasRatedToday && (
//                                 <button className={styles.rateButton} onClick={() => handleRateFood(selectedRating)}>
//                                     Rate Today's Food
//                                 </button>
//                             )}
//                             {hasRatedToday && (
//                                 <p className={styles.ratedMessage}>Thanks! You've already rated today.</p>
//                             )}
//                             {todayTeam.length > 0 && (
//                                 <p className={styles.totalVotes}>Total Votes for this team: {currentTeamVotes}</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 <section className={styles.managementSection}>
//                     <div className={styles.sectionHeader}>
//                         <h2>Meal Feedback & Comments</h2>
//                     </div>
//                     <div className={styles.feedbackContentGrid}>
//                         {/* LEFT COLUMN: FEEDBACK FORM */}
//                         <div className={styles.feedbackFormContainer}>
//                             <form onSubmit={handleFeedbackSubmit} className={styles.feedbackForm}>
//                                 <div className={styles.formGroup}>
//                                     <label htmlFor="feedback">Share your thoughts:</label>
//                                     <div className={styles.feedbackInputContainer}>
//                                         <textarea id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} rows="4" placeholder="Enter you feedback" className={styles.feedbackTextarea} autoComplete='off'/>
//                                         <FaRegSmile className={styles.emojiButton} onClick={() => setShowEmojiPicker(prev => !prev)} />
//                                         {showEmojiPicker && ( <div className={styles.emojiPicker}><Picker onEmojiClick={onEmojiClick} /></div> )}
//                                     </div>
//                                 </div>
//                                 <div className={styles.feedbackActions}>
//                                     <button type="submit" className={styles.submitButton}>Submit Feedback</button>
//                                     <button type="button" className={styles.viewFeedbackButton} onClick={() => setIsModalOpen(true)}>View All Feedback</button>
//                                     <button type="button" className={styles.viewTeamsButton} onClick={() => setIsStarTeamsModalOpen(true)}>View Star Teams</button>
//                                 </div>
//                             </form>
//                         </div>

//                         {/* RIGHT COLUMN: STAR TEAM */}
//                         {starTeam && (
//                             <div className={styles.starTeamInfo}>
//                                 <h3>⭐️ Star Kitchen Team:</h3>
//                                 <p className={styles.starTeamName}>{starTeam.teamMembers.join(', ')}</p>
//                                 <button className={styles.resetButton} onClick={handleResetStars}>
//                                     Reset Star Count
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </section>
                
//                 <section className={styles.managementSection}>
//                     <div className={styles.sectionHeader}><h2>Upload Today's Meal Photo</h2></div>
//                     <div className={styles.photoUploadBox}>
//                         <input type="file" id="meal-photo-upload" className={styles.fileInput} multiple onChange={handleFileChange} disabled={uploadedPhotos.length >= 5}/>
//                         <label htmlFor="meal-photo-upload" className={styles.uploadLabel}><FaUpload /> Click to upload or drag and drop</label>
//                         <button className={styles.choosePhotoButton} onClick={() => document.getElementById('meal-photo-upload').click()} disabled={uploadedPhotos.length >= 5}>
//                             Choose Photos ({uploadedPhotos.length}/5)
//                         </button>
//                         {uploadedPhotos.length > 0 && (
//                             <div className={styles.uploadedPhotosContainer}>
//                                 {uploadedPhotos.map((photo, index) => (<div key={index} className={styles.uploadedPhotoItem}><img src={photo.url} alt={photo.name} className={styles.thumbnail} /><button onClick={() => handleRemovePhoto(photo.url)} className={styles.removePhotoButton}><FaTimesCircle /></button></div>))}
//                             </div>
//                         )}
//                     </div>
//                 </section>
//             </div>
//             {isModalOpen && <FeedbackModal feedbackList={feedbackList} onClose={() => setIsModalOpen(false)} />}
//             {isStarTeamsModalOpen && <StarTeamsModal topTeams={topTeams} onClose={() => setIsStarTeamsModalOpen(false)} />}
//         </div>
//     );
// };
// export default TodayKitchenTeam;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload, FaStar, FaPlusCircle, FaTimesCircle, FaUsers, FaRegSmile } from 'react-icons/fa';
import Navbar from './Navbar';
import styles from './TodayKitchenTeam.module.css';
import Picker from 'emoji-picker-react';
import FeedbackModal from './FeedbackModal';
import StarTeamsModal from './StarTeamsModal';

const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

const TodayKitchenTeam = () => {
    // States for various features
    const [todayMenu, setTodayMenu] = useState({ breakfast: [], lunch: [], snacks: [], dinner: [] });
    // Ratings state ko ab backend se fetch kiya jayega, localstorage se nahi
    const [feedbackList, setFeedbackList] = useState([]);
    const [todayTeam, setTodayTeam] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);

    // NEW STATES
    const [hasRatedToday, setHasRatedToday] = useState(false);
    const [starTeam, setStarTeam] = useState(null);
    const [topTeams, setTopTeams] = useState([]);
    const [isStarTeamsModalOpen, setIsStarTeamsModalOpen] = useState(false);
    const [currentTeamVotes, setCurrentTeamVotes] = useState(0); // नया स्टेट: आज की टीम के वोट्स

    // Data fetching logic
    const fetchData = async () => {
        try {
            const [menuRes, studentsRes, feedbackRes, topTeamsRes] = await axios.all([
                axios.get('http://localhost:5000/menu/today'),
                axios.get('http://localhost:5000/students/active'),
                axios.get('http://localhost:5000/api/feedback'),
                axios.get('http://localhost:5000/api/ratings/top-teams')
            ]);
            
            setTodayMenu(menuRes.data);
            setFeedbackList(feedbackRes.data);
            setTopTeams(topTeamsRes.data);

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

            // आज की टीम के लिए वोट्स और रेटिंग स्टेटस चेक करें
            const currentTeamNames = currentKitchenTeam.map(member => member.name);
            const teamRating = topTeamsRes.data.find(team =>
                JSON.stringify(team.teamMembers.sort()) === JSON.stringify(currentTeamNames.sort())
            );
            
            if (teamRating) {
                setCurrentTeamVotes(teamRating.voteCount);
                // मान लें कि एक सेशन में एक ही बार रेटिंग दे सकते हैं
                // यह लॉजिक ऑथेंटिकेशन के बिना एक सरल समाधान है।
                const votedForTeam = localStorage.getItem('votedForTeam');
                if (votedForTeam === JSON.stringify(currentTeamNames)) {
                    setHasRatedToday(true);
                } else {
                    setHasRatedToday(false);
                }
            } else {
                setCurrentTeamVotes(0);
                setHasRatedToday(false);
            }

        } catch (error) {
            console.error("Error fetching initial data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        // हर 1 मिनट में डेटा को फिर से फ़ेच करें, ताकि टीम अपडेट होने पर दिखे
        const interval = setInterval(fetchData, 60000); 
        return () => clearInterval(interval);
    }, []);

    // Handler Functions
    const handleAddMealItem = (e) => {
        e.preventDefault();
        const mealType = e.target.elements.mealType.value;
        const foodName = e.target.elements.foodName.value;
        const nutrients = e.target.elements.nutrients.value;
        if (!foodName || !nutrients) return;
        axios.patch(`http://localhost:5000/menu/update-meal/${mealType}`, { foodName, nutrients })
            .then(() => fetchData())
            .catch(err => console.error("Error adding meal:", err));
        e.target.reset();
    };

    const handleRemoveMealItem = (mealType, itemId) => {
        axios.patch(`http://localhost:5000/menu/remove-meal/${mealType}/${itemId}`)
            .then(() => fetchData())
            .catch(err => console.error("Error removing meal:", err));
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (feedback.trim() === '') return;
        const newFeedback = { comment: feedback };
        axios.post('http://localhost:5000/api/feedback/add', newFeedback)
            .then(() => {
                fetchData();
                setFeedback('');
                alert('Feedback submitted successfully!');
            })
            .catch(() => alert('Could not submit feedback.'));
    };
    
    // NEW RATING FUNCTIONS
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

        axios.post('http://localhost:5000/api/ratings/add', { teamMembers, starValue })
            .then(() => {
                alert('Rating submitted successfully!');
                setSelectedRating(starValue);
                setHasRatedToday(true);
                localStorage.setItem('votedForTeam', JSON.stringify(teamMembers)); // लोकल स्टोरेज में सेव करें
                fetchData();
            })
            .catch(err => {
                console.error("Error submitting rating:", err);
                alert('Could not submit rating. Please try again.');
            });
    };

    const handleResetStars = () => {
        if (window.confirm("Are you sure you want to reset all team ratings to zero? This action cannot be undone.")) {
            axios.post('http://localhost:5000/api/ratings/reset')
                .then(() => {
                    alert('All ratings have been reset!');
                    setHasRatedToday(false);
                    setSelectedRating(0);
                    localStorage.removeItem('votedForTeam'); // लोकल स्टोरेज से हटा दें
                    fetchData();
                })
                .catch(err => {
                    console.error("Error resetting ratings:", err);
                    alert('Could not reset ratings.');
                });
        }
    };
    
    const onEmojiClick = (emojiObject) => { setFeedback(prev => prev + emojiObject.emoji); setShowEmojiPicker(false); };
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (uploadedPhotos.length + files.length > 5) {
            alert(`You can only upload a maximum of 5 photos.`);
            return;
        }
        const newPhotos = files.map(file => ({ name: file.name, url: URL.createObjectURL(file) }));
        setUploadedPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    };
    const handleRemovePhoto = (photoUrl) => {
        setUploadedPhotos(prevPhotos => prevPhotos.filter(photo => photo.url !== photoUrl));
    };
    
    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.contentWrapper}>
                <div className={styles.welcomeHeader}>
                    <h1>Welcome to Kitchen Management System</h1>
                    <p>Streamline your daily kitchen operations</p>
                </div>

                <section className={styles.managementSection}>
                    <div className={styles.sectionHeader}><h2>Manage Today's Kitchen Team & Menu</h2></div>
                    <form onSubmit={handleAddMealItem} className={styles.mealInputFormGrid}>
                        <div className={styles.formGroup}><label htmlFor="mealType">Meal type</label><select id="mealType" name="mealType" className={styles.selectInput}>{mealTypes.map(type => <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>)}</select></div>
                        <div className={styles.formGroup}><label htmlFor="foodName">Food Name</label><input type="text" id="foodName" name="foodName" placeholder="Enter Food" className={styles.textInput} autoComplete='off'/></div>
                        <div className={styles.formGroup}><label htmlFor="nutrients">Nutrients</label><input type="text" id="nutrients" name="nutrients" placeholder="Enter Nutrients" className={styles.textInput} autoComplete='off'/></div>
                        <button type="submit" className={styles.addMealButton}><FaPlusCircle /> Add New Item</button>
                    </form>
                    <div className={styles.currentMenuGrid}>
                        {mealTypes.map(type => (
                            <div key={type} className={styles.mealCard}>
                                <div className={styles.mealCardHeader}><h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3><span className={styles.itemCount}>{todayMenu[type]?.length || 0} item(s)</span></div>
                                <ul className={styles.menuList}>
                                    {todayMenu[type]?.length > 0 ? todayMenu[type].map(item => (
                                        <li key={item._id} className={styles.menuItem}><strong>{item.foodName}</strong><span className={styles.nutrients}>({item.nutrients})</span><button onClick={() => handleRemoveMealItem(type, item._id)} className={styles.removeMealButton} title="Remove item"><FaTimesCircle /></button></li>
                                    )) : <li className={styles.emptyMenuItem}>No {type} items added.</li>}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
                
                <div className={`${styles.managementSection} ${styles.rosterAndPollContainer}`}>
                    <div className={styles.rosterSectionContent}>
                        <div className={styles.sectionHeader}><FaUsers /> <h2>Kitchen Roster</h2></div>
                        <div className={styles.rosterDisplay}>
                            <h3>Current Team:</h3>
                            <ul className={styles.teamList}>
                                {todayTeam.length > 0 ? todayTeam.map(member => (<li key={member._id} className={styles.teamMemberItem}>{member.name}</li>)) : <li>No team members assigned.</li>}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.ratingPollSectionContent}>
                        <div className={styles.sectionHeader}><FaStar /> <h2>Food Feedback Poll</h2></div>
                        <div className={styles.ratingPollContainer}>
                            <p className={styles.pollQuestion}>How would you rate today's meal?</p>
                            <div className={styles.starSelection} onMouseLeave={() => setHoveredRating(0)}>
                                {[1, 2, 3, 4, 5].map((starValue) => (
                                    <FaStar
                                        key={starValue}
                                        className={`${styles.pollStar} ${(starValue <= selectedRating) || (starValue <= hoveredRating) ? styles.selected : ''}`}
                                        onClick={() => setSelectedRating(starValue)}
                                        onMouseEnter={() => setHoveredRating(starValue)}
                                    />
                                ))}
                            </div>
                            {selectedRating > 0 && !hasRatedToday && (
                                <button className={styles.rateButton} onClick={() => handleRateFood(selectedRating)}>
                                    Rate Today's Food
                                </button>
                            )}
                            {hasRatedToday && (
                                <p className={styles.ratedMessage}>Thanks! You've already rated today.</p>
                            )}
                            {todayTeam.length > 0 && (
                                <p className={styles.totalVotes}>Total Votes for this team: {currentTeamVotes}</p>
                            )}
                        </div>
                    </div>
                </div>

                <section className={styles.managementSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Meal Feedback & Comments</h2>
                    </div>
                    <div className={styles.feedbackContentGrid}>
                        {/* LEFT COLUMN: FEEDBACK FORM */}
                        <div className={styles.feedbackFormContainer}>
                            <form onSubmit={handleFeedbackSubmit} className={styles.feedbackForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="feedback">Share your thoughts:</label>
                                    <div className={styles.feedbackInputContainer}>
                                        <textarea id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} rows="4" placeholder="Enter you feedback" className={styles.feedbackTextarea} autoComplete='off'/>
                                        <FaRegSmile className={styles.emojiButton} onClick={() => setShowEmojiPicker(prev => !prev)} />
                                        {showEmojiPicker && ( <div className={styles.emojiPicker}><Picker onEmojiClick={onEmojiClick} /></div> )}
                                    </div>
                                </div>
                                <div className={styles.feedbackActions}>
                                    <button type="submit" className={styles.submitButton}>Submit Feedback</button>
                                    <button type="button" className={styles.viewFeedbackButton} onClick={() => setIsModalOpen(true)}>View All Feedback</button>
                                    <button type="button" className={styles.viewTeamsButton} onClick={() => setIsStarTeamsModalOpen(true)}>View Star Teams</button>
                                </div>
                            </form>
                        </div>

                        {/* RIGHT COLUMN: STAR TEAM */}
                        {starTeam && (
                            <div className={styles.starTeamInfo}>
                                <h3>⭐️ Star Kitchen Team:</h3>
                                <p className={styles.starTeamName}>{starTeam.teamMembers.join(', ')}</p>
                                <button className={styles.resetButton} onClick={handleResetStars}>
                                    Reset Star Count
                                </button>
                            </div>
                        )}
                    </div>
                </section>
                
                <section className={styles.managementSection}>
                    <div className={styles.sectionHeader}><h2>Upload Today's Meal Photo</h2></div>
                    <div className={styles.photoUploadBox}>
                        <input type="file" id="meal-photo-upload" className={styles.fileInput} multiple onChange={handleFileChange} disabled={uploadedPhotos.length >= 5}/>
                        <label htmlFor="meal-photo-upload" className={styles.uploadLabel}><FaUpload /> Click to upload or drag and drop</label>
                        <button className={styles.choosePhotoButton} onClick={() => document.getElementById('meal-photo-upload').click()} disabled={uploadedPhotos.length >= 5}>
                            Choose Photos ({uploadedPhotos.length}/5)
                        </button>
                        {uploadedPhotos.length > 0 && (
                            <div className={styles.uploadedPhotosContainer}>
                                {uploadedPhotos.map((photo, index) => (<div key={index} className={styles.uploadedPhotoItem}><img src={photo.url} alt={photo.name} className={styles.thumbnail} /><button onClick={() => handleRemovePhoto(photo.url)} className={styles.removePhotoButton}><FaTimesCircle /></button></div>))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
            {isModalOpen && <FeedbackModal feedbackList={feedbackList} onClose={() => setIsModalOpen(false)} />}
            {isStarTeamsModalOpen && <StarTeamsModal topTeams={topTeams} onClose={() => setIsStarTeamsModalOpen(false)} />}
        </div>
    );
};
export default TodayKitchenTeam;


