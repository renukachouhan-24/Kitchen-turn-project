import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('https://kitchen-turn-project-3.onrender.com/api/auth/login', { email, password });

            localStorage.setItem('token', response.data.token);

             const me = await axios.get('https://kitchen-turn-project-3.onrender.com/api/auth/me', {

                headers: { Authorization: `Bearer ${response.data.token}` }
            });

            localStorage.setItem('user', JSON.stringify(me.data));

            navigate('/dashboard');
            window.location.reload();
        } catch (err) {
            console.error("Login error:", err); // 'err' is now used here
            setError('Login failed. Please check credentials.');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h2>Kitchen App Login</h2>
                <form onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <button type="submit" className={styles.loginButton}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
