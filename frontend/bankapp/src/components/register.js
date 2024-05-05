import React, { useState } from 'react';
import axios from 'axios';
import { loginUser } from '../utils/loginUtil';
import { useNavigate } from 'react-router-dom';
import styles from '../css/register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleRegister(event) {
        event.preventDefault();

        if (!username || !pin || !phonenumber) {
            setError('Täytä kaikki kentät');
            return;
        }

        if (pin !== confirmPin) {
            setError('PIN-koodit eivät täsmää');
            return;
        }

        axios.post('/register', { username, pin, phonenumber })
            .then(response => {
                loginUser(username, pin)
                .then(success => {
                    if (success) {
                        navigate("/");
                    } else {
                        setError('Invalid login');
                    }
                })
            })
            .catch(error => {
                setError(error.response.data.error);
            });
    }

    return (
        <div className={styles.registerBox}>
            <form>
            <h1>Rekisteröidy</h1>
            <div className={styles.inputBox}>
            <span className={styles.icon}><FontAwesomeIcon icon={faUser} /></span>
                <input type="text" placeholder="Käyttäjänimi" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className={styles.inputBox}>
                <span className={styles.icon}><FontAwesomeIcon icon={faLock} /></span>
                <input type="password" placeholder="PIN-koodi" onChange={(e) => setPin(e.target.value)} />
            </div>
            <div className={styles.inputBox}>
                <span className={styles.icon}><FontAwesomeIcon icon={faLock} /></span>
                <input type="password" placeholder="Vahvista PIN-koodi" onChange={(e) => setConfirmPin(e.target.value)} />
            </div>
            <div className={styles.inputBox}>
                <span className={styles.icon}><FontAwesomeIcon icon={faPhone} color='black' /></span>
                <input type="text" placeholder="Puhelinnumero (+358)" onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div>
                <button type="submit" onClick={handleRegister}>Rekisteröidy</button>
                {error && <p className={styles.errorMessage}>{error}</p>}
            </div>
            </form>
        </div>
    );
}
