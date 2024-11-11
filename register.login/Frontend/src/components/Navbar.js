// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/home" className="nav-link">Home</Link>
      {/* <Link to="/transaction" className="nav-link">Make a Transaction</Link> */}
      <Link to="/" className="nav-link">Logout</Link>
    </nav>
  );
};

export default Navbar;
