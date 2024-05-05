import { useEffect, useState } from 'react';
import axios from 'axios';

export function useTokenValidation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      axios.post('/validateToken', { token })
        .then(response => {
          if (response.data.valid) {
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
          }
        })
        .catch(error => {
          console.error('Token validation error:', error);
        });
    }
  }, []);

  return isLoggedIn;
}

export function handleLogout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.reload();
}