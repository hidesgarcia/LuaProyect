import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

export default function Navigation({ onLogout }) {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>🎓 Khan Academy Pro</h2>
        </div>
        <ul className="nav-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/rankings">Rankings</Link></li>
          <li><Link to="/forum">Forum</Link></li>
          <li><Link to="/chat">Chat</Link></li>
        </ul>
        <div className="nav-actions">
          <button className="btn btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
