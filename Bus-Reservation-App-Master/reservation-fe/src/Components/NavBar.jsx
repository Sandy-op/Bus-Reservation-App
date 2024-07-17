// src/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/LandingPage.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Bus10</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/userlogin">User Login</Link></li>
        <li><Link to="/adminlogin">Admin Login</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
