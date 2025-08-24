import React, { useState } from 'react';
import { FaUpload, FaStar, FaPlusCircle, FaTimesCircle, FaUtensils, FaUsers } from 'react-icons/fa';
import Navbar from './Navbar';
import styles from './TodayKitchenTeam.module.css';

const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

const TodayKitchenTeam = () => {
    // Hardcoded data for demonstration without backend
    const [todayMenu, setTodayMenu] = useState({
        breakfast: [{ _id: 'b1', foodName: 'Poha', nutrients: 'Carbs, Fiber' }],
        lunch: [{ _id: 'l1', foodName: 'Dal Roti, Rice', nutrients: 'Protein, Carbs' }],
        snacks: [{ _id: 's1', foodName: 'Samosa', nutrients: 'Carbs, Fat' }],
        dinner: [{ _id: 'd1', foodName: 'Paneer Sabzi, Roti', nutrients: 'Protein, Carbs, Vitamins' }],
    });
    
    const [kitchenTeam, setKitchenTeam] = useState([
        { _id: 'st1', name: 'Nikita Panwar' },
        { _id: 'st2', name: 'Prachi Kurwale' },
        { _id: 'st3', name: 'Renuka Chouhan' },
        { _id: 'st4', name: 'Khushi Kumari' },
        { _id: 'st5', name: 'Pammi' },
    ]);

    const [ratings, setRatings] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    const totalRatings = Object.values(ratings).reduce((sum, count) => sum + count, 0);

    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    const [uploadedPhotos, setUploadedPhotos] = useState([]);

    const handleAddMealItem = (e) => {
        e.preventDefault();
        const mealType = e.target.elements.mealType.value;
        const foodName = e.target.elements.foodName.value;
        const nutrients = e.target.elements.nutrients.value;

        if (!foodName || !nutrients) return;

        const newMenuItem = { _id: Date.now(), foodName, nutrients };
        setTodayMenu(prevMenu => ({
            ...prevMenu,
            [mealType]: [...prevMenu[mealType], newMenuItem],
        }));
        e.target.reset();
    };

    const handleRemoveMealItem = (mealType, itemId) => {
        setTodayMenu(prevMenu => ({
            ...prevMenu,
            [mealType]: prevMenu[mealType].filter(item => item._id !== itemId),
        }));
    };

    // NAYA: Rating Submission function jisse rating ko badal sakte hain
    const handleRatingSubmit = (starValue) => {
        setRatings(prevRatings => {
            const newRatings = { ...prevRatings };
            if (selectedRating !== 0) {
                newRatings[selectedRating] -= 1; // Purani rating ko hatao
            }
            newRatings[starValue] += 1; // Nayi rating ko jodo
            return newRatings;
        });
        setSelectedRating(starValue);
    };

    const calculateAverageRating = () => {
        if (totalRatings === 0) return 0;
        let sum = 0;
        for (let i = 1; i <= 5; i++) {
            sum += i * ratings[i];
        }
        return sum / totalRatings; 
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const totalFiles = uploadedPhotos.length + files.length;
    
        if (totalFiles > 5) {
            alert(`You can only upload a maximum of 5 photos. You have already selected ${uploadedPhotos.length} photos.`);
            return;
        }
    
        const newPhotos = files.map(file => {
            return {
                name: file.name,
                url: URL.createObjectURL(file)
            };
        });
        
        setUploadedPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    };

    const handleRemovePhoto = (photoUrl) => {
        setUploadedPhotos(prevPhotos => prevPhotos.filter(photo => photo.url !== photoUrl));
    };

    const averageRating = calculateAverageRating();

    return (
        <div className={styles.pageContainer}>
             <Navbar showRegister={false} />

            <div className={styles.contentWrapper}>
                <div className={styles.welcomeHeader}>
                    <h1>Welcome to Kitchen Management System</h1>
                    <p>Streamline your daily kitchen operations</p>
                </div>

                {/* Manage Today's Kitchen Team & Menu */}
                <section className={styles.managementSection}>
                    <div className={styles.sectionHeader}>
                        <FaPlusCircle className={styles.sectionIcon} />
                        <h2>Manage Today's Kitchen Team & Menu</h2>
                    </div>
                    
                    {/* Meal Input Form */}
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

                    {/* Display Current Menu */}
                    <div className={styles.currentMenuGrid}>
                        {mealTypes.map(type => (
                            <div key={type} className={styles.mealCard}>
                                <div className={styles.mealCardHeader}>
                                    <FaUtensils className={styles.mealIcon} />
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
                
                {/* Roster and Poll in one row */}
                <div className={`${styles.managementSection} ${styles.rosterAndPollContainer}`}>
                    {/* Kitchen Roster Section */}
                    <div className={styles.rosterSectionContent}>
                        <div className={styles.sectionHeader}>
                            <FaUsers className={styles.sectionIcon} />
                            <h2>Kitchen Roster</h2>
                        </div>
                        <div className={styles.rosterDisplay}>
                            <h3>Current Team: <span className={styles.itemCount}>{kitchenTeam.length} members</span></h3>
                            <ul className={styles.teamList}>
                                {kitchenTeam.length > 0 ? kitchenTeam.map((member) => (
                                    <li key={member._id} className={styles.teamMemberItem}>
                                        {member.name}
                                    </li>
                                )) : <li className={styles.emptyTeamItem}>No team members assigned for today.</li>}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Food Feedback Poll Section */}
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

                {/* Photo Upload Section moved to the bottom */}
                <section className={styles.managementSection}>
                    <div className={styles.sectionHeader}>
                        <FaUpload className={styles.sectionIcon} />
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
                        
                        {/* Display uploaded photos */}
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