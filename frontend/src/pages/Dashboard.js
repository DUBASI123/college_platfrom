import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        
        if (!userData || !token) {
          window.location.href = '/login';
          return;
        }

        const response = await api.get(`/api/dashboard/${userData.id}`);
        setUser(response.data.user);
        setStats(response.data.stats);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <p>College ID: {user?.collegeId}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>My Projects</h3>
          <p className="stat-number">{stats?.userProjects || 0}</p>
          <a href="/projects">View Projects →</a>
        </div>
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p className="stat-number">{stats?.totalProjects || 0}</p>
          <a href="/projects">Browse →</a>
        </div>
        <div className="stat-card">
          <h3>Interviews</h3>
          <p className="stat-number">{stats?.totalInterviews || 0}</p>
          <a href="/interviews">Start Interview →</a>
        </div>
        <div className="stat-card">
          <h3>Study Notes</h3>
          <p className="stat-number">{stats?.totalNotes || 0}</p>
          <a href="/notes">Read Notes →</a>
        </div>
        <div className="stat-card">
          <h3>Placements</h3>
          <p className="stat-number">{stats?.totalPlacements || 0}</p>
          <a href="/placements">View Opportunities →</a>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <button className="action-btn">Upload Project</button>
          <button className="action-btn">Take Mock Interview</button>
          <button className="action-btn">Add Notes</button>
          <button className="action-btn">View Placements</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
