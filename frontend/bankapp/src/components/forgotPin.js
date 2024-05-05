import React, { useState } from 'react';
import axios from 'axios';
import styles from '../css/forgotPin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faTimes } from '@fortawesome/free-solid-svg-icons';
import ChangePassword from './changePassword';

export default function ForgotPin({ onClose }) {
    const [username, setUsername] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [verified, setVerified] = useState(false);

    const handleResetPin = (event) => {
        event.preventDefault();
        axios.post('/verify', { username, phonenumber })
            .then(response => {
                if (response.data.valid) {
                    setVerified(true);
                    sendSMS();
                } else {
                    setError('Invalid username or phone number');
                }
            })
            .catch(error => {
                console.error('Error validating credentials:', error);
                setError('Failed to validate credentials');
            });
    };

    const sendSMS = () => {
        axios.post('/sendSMS', { phonenumber })
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                setError('Failed to send SMS');
        });
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className={styles.forgotPinBox}>
            <button className={styles.closeButton} onClick={handleClose}>
                <span className={styles.icon}><FontAwesomeIcon icon={faTimes} /></span>
            </button>
            {!verified ? (
                <form>
                    <h1>Unohtuiko PIN?</h1>
                    <div className={styles.inputBox}>
                        <span className={styles.icon}><FontAwesomeIcon icon={faUser} /></span>
                        <input type="text" placeholder="Käyttäjänimi" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.icon}><FontAwesomeIcon icon={faPhone} color='black' /></span>
                        <input type="text" placeholder="Puhelinnumero (+358)" onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit" onClick={handleResetPin}>Lähetä</button>
                        {error && <p className={styles.errorMessage}>{error}</p>}
                        {message && <p className={styles.successMessage}>{message}</p>}
                    </div>
                </form>
            ) : (
                <ChangePassword onClose={handleClose} username={username} phonenumber={phonenumber} />
            )}
        </div>
    );
}
