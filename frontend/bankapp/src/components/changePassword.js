import React, { useState } from 'react';
import axios from 'axios';
import styles from '../css/forgotPin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function ChangePassword({ onClose, username, phonenumber }) {
    const [CODE, setSMS] = useState('');
    const [newpin, setNewPin] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChangePassword = (event) => {
        event.preventDefault();
        
        axios.post('/verifySMS', { phonenumber, CODE })
            .then(response => { 
                if (response.data.message === 'SMS verified successfully') {
                    setError('');
                    return axios.post('/changePassword', { username, newpin });
                } else {
                    setError('Invalid SMS code');
                }
            })
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('Error changing password:', error);
                setError('Failed to change password');
        });
    };
    
    return (
        <div className={styles.forgotPinBox}>
            <button className={styles.closeButton} onClick={onClose}>
                <span className={styles.icon}><FontAwesomeIcon icon={faTimes} /></span>
            </button>
            <form onSubmit={handleChangePassword}>
                <h1>Syötä PIN-koodi ja uusi salasana</h1>
                <div className={styles.inputBox}>
                    <span className={styles.icon}><FontAwesomeIcon icon={faLock} /></span>
                    <input type="text" placeholder="SMS-koodi" value={CODE} onChange={(e) => setSMS(e.target.value)} />
                </div>
                <div className={styles.inputBox}>
                    <span className={styles.icon}><FontAwesomeIcon icon={faLock} /></span>
                    <input type="password" placeholder="Uusi PIN-koodi" value={newpin} onChange={(e) => setNewPin(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Vahvista</button>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    {message && <p className={styles.successMessage}>{message}</p>}
                </div>
            </form>
        </div>
    );
}
