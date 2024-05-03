import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtToken } from '../utils/jwtToken';
import styles from '../css/login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();

        if (!username || !pin) {
            setError('Täytä kaikki kentät');
            return;
        }

        axios.post('/login', { username, pin })
            .then(response => {
                const token = response.data.jwtToken;
                if (token) {
                    jwtToken.value = token;
                    navigate("/");
                    window.location.reload();
                } else {
                    setError('Invalid login');
                }
            })
            .catch(error => {
                
                console.error('Login error:', error);
                setError(error.response.data.error);
            });
    }

    return (
        <div className={styles.loginBody}>
            <form>
                <h1>Login</h1>
                <div className={styles.inputBox}>
                    <span className={styles.icon}><FontAwesomeIcon icon={faUser} /></span>
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={styles.inputBox}>
                    <span className={styles.icon}><FontAwesomeIcon icon={faLock} /></span>
                    <input type="password" placeholder="PIN" onChange={(e) => setPin(e.target.value)} />
                </div>
                <div className={styles.rememberForgotBox}>
                    <label>
                        <input type="checkbox" />Remember me
                    </label>
                    <a href="#">Forgot PIN?</a>
                </div>
                <div>
                    <button type="submit" onClick={handleLogin}>Login</button>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </div>
                <div className={styles.registerLink}>
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </form>
        </div>
    );
}
