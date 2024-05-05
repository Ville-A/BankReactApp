import React from 'react';
import styles from '../css/footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2024 Ville-A. Kaikki oikeudet pidätetään.</p>
        <ul className={styles.links}>
          <li><a href="#">Tietosuojakäytäntö</a></li>
          <li><a href="#">Käyttöehdot</a></li>
          <li><a href="#">Ota yhteyttä</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;