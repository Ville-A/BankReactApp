import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMoneyBillTransfer, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';

function Navbar({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/'); 
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? styles.active : ""}>
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </li>
        {isLoggedIn ? (
          <>
          <li>
            <Link to="/profile" className={location.pathname === "/profile" ? styles.active : ""}>
              <FontAwesomeIcon icon={faUserAlt} /> Profile
            </Link>
          </li>
          <li>
            <Link to="/transfer" className={location.pathname === "/transfer" ? styles.active : ""}>
              <FontAwesomeIcon icon={faMoneyBillTransfer} color='black'/> Transfer
            </Link>
          </li>
          <li>
           <button className={styles.logoutButton} onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} color='black' /> Logout
            </button>
          </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={location.pathname === "/login" ? styles.active : ""}>Login</Link>
            </li>
            <li>
              <Link to="/register" className={location.pathname === "/register" ? styles.active : ""}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
