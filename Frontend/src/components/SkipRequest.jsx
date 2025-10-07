import React, { useState, useEffect } from 'react';
import { FaRegCompass, FaRegPaperPlane, FaExclamationCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SkipRequest.module.css';
import Navbar from './Navbar'; 

const SkipRequest = () => {
    const [tomorrowTeam, setTomorrowTeam] = useState([]);

    const [formData, setFormData] = useState({
        studentName: '',
        reason: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTomorrowTeam = async () => {
            try {
                const response = await axios.get('http://localhost:5000/students/active');
                const team = response.data.slice(5, 10);
                setTomorrowTeam(team);
            } catch (error) {
                console.error('Error fetching tomorrow team:', error);
            }
        };
        fetchTomorrowTeam();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/skip-requests/add', formData);
            alert('Skip request submitted successfully!');
            setFormData({ studentName: '', reason: '', startDate: '', numberOfDays: 1 });
            
            navigate('/dashboard'); 
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <Navbar showRegister={false} showSkipRequest={true} /> 
            
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
                            <select id="student-name" name="studentName" value={formData.studentName} onChange={handleChange} required>
                                <option value="">Select a student</option>
                                {tomorrowTeam.map(student => (
                                    <option key={student._id} value={student.name}>{student.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="reason">Reason for Skipping *</label>
                            <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} rows="4" placeholder="Please provide a detailed reason..." required></textarea>
                        </div>
                        <button type="submit" className={styles.submitButton}>Submit Skip Request</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SkipRequest;