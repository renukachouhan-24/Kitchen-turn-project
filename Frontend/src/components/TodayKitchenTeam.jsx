import React, { useState, useEffect } from 'react'; // 1. useEffect ko import kiya gaya hai
import { FaUpload, FaStar, FaPlusCircle, FaTimesCircle, FaUtensils, FaUsers } from 'react-icons/fa';
import Navbar from './Navbar';
import styles from './TodayKitchenTeam.module.css';

const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

// Ye aapke naye code ke anusaar ek constant hai, isme koi badlav nahi kiya gaya hai
const kitchenTeam = [
    { _id: 'st1', name: 'Nikita Panwar' },
    { _id: 'st2', name: 'Prachi Kurwale' },
    { _id: 'st3', name: 'Renuka Chouhan' },
    { _id: 'st4', name: 'Khushi Kumari' },
    { _id: 'st5', name: 'Pammi' },
];

const TodayKitchenTeam = () => {
    // 2. UPDATED: useState ab shuruaat me localStorage se data load karega
    const [todayMenu, setTodayMenu] = useState(() => {
        const savedMenu = localStorage.getItem('todayMenu');
        if (savedMenu) {
            return JSON.parse(savedMenu);
        } else {
            return {
                breakfast: [],
                lunch: [],
                snacks: [],
                dinner: [],
            };
        }
    });

    // 3. NEW: useEffect hook menu me badlav hone par use localStorage me save karega
    useEffect(() => {
        localStorage.setItem('todayMenu', JSON.stringify(todayMenu));
    }, [todayMenu]);
    
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

                <section className={styles.managementSection}>
                    <div className={styles.sectionHeader}>
                        <FaPlusCircle className={styles.sectionIcon} />
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
                
                <div className={`${styles.managementSection} ${styles.rosterAndPollContainer}`}>
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