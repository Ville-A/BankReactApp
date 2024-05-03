import React, { useState } from 'react';
import styles from '../css/home.module.css';

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.homebody}>
      <div>
        <h1>Welcome to BankApp</h1>
      </div>
      <div>
        <p>This is the main page.</p>
      </div>
    </div>
  );
}

export default Home;