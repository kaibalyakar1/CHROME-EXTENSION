// Components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../Components/Navbar.css"; // Optional: Create a CSS file for styling the navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">AutoJobFill</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/login">Login</Link> / <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
