import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    try { window.dispatchEvent(new Event('authChanged')); } catch (e) {}
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          🎓 College Platform
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-link">Projects</Link>
          </li>
          <li className="nav-item">
            <Link to="/interviews" className="nav-link">Interviews</Link>
          </li>
          <li className="nav-item">
            <Link to="/notes" className="nav-link">Notes</Link>
          </li>
          <li className="nav-item">
            <Link to="/placements" className="nav-link">Placements</Link>
          </li>
          <li className="nav-item user-info">
            <span>{user?.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
