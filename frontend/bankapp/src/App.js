import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Footer from './components/footer';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';
import Transfer from './components/transfer';
import { useTokenValidation, handleLogout } from './utils/authUtils'; 


function App() {
  const isLoggedIn = useTokenValidation();

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isLoggedIn && <Route path="/profile" element={<Profile />} />}
          {isLoggedIn && <Route path="/transfer" element={<Transfer />} />}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;