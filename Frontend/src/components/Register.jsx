import React, { useState, useEffect } from 'react'; // 💡 useEffect added
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    joiningDate: '',
  });
  const [isCoordinator, setIsCoordinator] = useState(false); // 💡 New state for role check
  const navigate = useNavigate();

  const { name, email, password, joiningDate } = formData;

  // 🔹 Check user role on component mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Assuming 'coordinator' is the role that allows registration
        if (user.role === 'coordinator') {
          setIsCoordinator(true);
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (!isCoordinator) { // Double check before proceeding
        alert('Access Denied. Only a Kitchen Coordinator can register new students.');
        return;
    }

    try {
      const res = await axios.post('https://kitchen-turn-project-4.onrender.com/api/auth/register', formData);
      console.log(res.data);
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (err) {
      console.error(err.response.data);
      alert('Error: ' + err.response.data.msg);
    }
  };

   const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.pageWrapper}>
       <button onClick={handleGoBack} className={styles.backButton} title="Go back to main page">
        <FaArrowLeft />
      </button>
      
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h2>Create Your Account</h2>
          <p>Register to join KitchenFlow</p>
        </div>
        
        {/* 💡 Conditional rendering based on role */}
        {!isCoordinator ? (
            <div className={styles.accessDeniedMessage}>
                <p>⚠️ **Access Denied:** Only the **Kitchen Coordinator** is authorized to register new students.</p>
                <button onClick={handleGoBack} className={styles.submitButton}>Go Back</button>
            </div>
        ) : (
             <form className={styles.formBody} onSubmit={onSubmit}>
                <div className={styles.formGroup}>
                    <label>Full Name *</label>
                    <input type="text" name="name" value={name} onChange={onChange} autoComplete='off' required />
                </div>
                <div className={styles.formGroup}>
                    <label>Email Address *</label>
                    <input type="email" name="email" value={email} onChange={onChange} autoComplete='off' required />
                </div>
                <div className={styles.formGroup}>
                    <label>Password *</label>
                    <input type="password" name="password" value={password} onChange={onChange} autoComplete='off' required minLength="6" />
                </div>
                <div className={styles.formGroup}>
                    <label>Joining Date *</label>
                    <input type="date" name="joiningDate" value={joiningDate} onChange={onChange} autoComplete='off' required />
                </div>
                <button type="submit" className={styles.submitButton}>Register</button>
            </form>
        )}
      </div>
    </div>
  );
};

export default Register;