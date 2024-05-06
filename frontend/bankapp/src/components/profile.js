import React, { useState } from 'react';
import styles from '../css/profile.module.css';

function Profile() {
  return (
    <div className={styles.profilebody}>
      <div>
        <h1>Welcome to Profile</h1>
      </div>
      <div>
        <p>This is the main page.</p>
      </div>
    </div>
  );
}

export default Profile;