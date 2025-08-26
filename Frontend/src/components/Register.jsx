// frontend/src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Redirect karne ke liye
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    joiningDate: '',
  });
  const navigate = useNavigate(); // Hook for navigation

  const { name, email, password, joiningDate } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(res.data);
      alert('Registration successful! Please log in.');
      navigate('/'); 
    } catch (err) {
      console.error(err.response.data);
      alert('Error: ' + err.response.data.msg);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h2>Create Your Account</h2>
          <p>Register to join KitchenFlow</p>
        </div>
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
      </div>
    </div>
  );
};

export default Register;