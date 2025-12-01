import React from 'react';
import { useQuery, gql } from '@apollo/client';
import '../styles/Dashboard.css';

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      username
      email
      points
      level
      achievements {
        id
        name
        icon
      }
      enrolledCourses {
        id
        title
      }
    }
  }
`;

export default function Dashboard() {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const user = data?.currentUser;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.username}!</h1>
      
      <div className="dashboard-grid">
        <div className="card">
          <h2>Profile Stats</h2>
          <div className="stats">
            <div className="stat">
              <span className="label">Level</span>
              <span className="value">{user?.level}</span>
            </div>
            <div className="stat">
              <span className="label">Points</span>
              <span className="value">{user?.points}</span>
            </div>
            <div className="stat">
              <span className="label">Enrolled Courses</span>
              <span className="value">{user?.enrolledCourses?.length || 0}</span>
            </div>
            <div className="stat">
              <span className="label">Achievements</span>
              <span className="value">{user?.achievements?.length || 0}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Recent Achievements</h2>
          <div className="achievements">
            {user?.achievements?.slice(0, 5).map(achievement => (
              <div key={achievement.id} className="achievement-item">
                <div className="achievement-icon">{achievement.icon || '🏆'}</div>
                <div className="achievement-name">{achievement.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Quick Actions</h2>
          <div className="actions">
            <a href="/courses" className="btn btn-primary">Browse Courses</a>
            <a href="/rankings" className="btn btn-secondary">View Rankings</a>
            <a href="/forum" className="btn btn-secondary">Go to Forum</a>
            <a href="/chat" className="btn btn-secondary">Open Chat</a>
          </div>
        </div>
      </div>
    </div>
  );
}
