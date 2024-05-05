import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtToken } from '../utils/jwtToken';
import styles from '../css/login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import RememberMeCheckbox from '../utils/rememberMeUtil';
import ForgotPin from './forgotPin';


export default function Login() {
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [showForgotPin, setShowForgotPin] = useState(false);
    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();

        if (!username || !pin) {
            setError('Täytä kaikki kentät');
            return;
        }

        axios.post('/login', { username, pin })
            .then(response => {
                if (response.data.jwtToken) {
                    const token = response.data.jwtToken;
                    jwtToken.value = token;
                    const rememberMeChecked = document.getElementById('rememberMeCheckbox').checked;
                    if (rememberMeChecked) {
                        localStorage.setItem('token', token);
                    }
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
            {showForgotPin ? (
                <ForgotPin onClose={()=> setShowForgotPin(false)}/>
            ) : (
                <form>
                    <h1>Kirjaudu</h1>
                    <div className={styles.inputBox}>
                        <span className={styles.icon}><FontAwesomeIcon icon={faUser} /></span>
                        <input type="text" placeholder="Käyttäjänimi" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.icon}><FontAwesomeIcon icon={faLock} /></span>
                        <input type="password" placeholder="PIN" onChange={(e) => setPin(e.target.value)} />
                    </div>
                    <div className={styles.rememberForgotBox}>
                        <RememberMeCheckbox />
                        <a href="#" onClick={() => setShowForgotPin(true)}>Unohditko PIN?</a>
                    </div>
                    <div>
                        <button type="submit" onClick={handleLogin}>Kirjaudu</button>
                        {error && <p className={styles.errorMessage}>{error}</p>}
                    </div>
                    <div className={styles.registerLink}>
                        <p>Eikö ole tunnuksia? <a href="/register">Rekisteröidy</a></p>
                    </div>
                </form>
            )}
        </div>
    );
}
