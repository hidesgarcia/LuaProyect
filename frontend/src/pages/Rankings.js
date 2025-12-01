import React from 'react';
import { useQuery, gql } from '@apollo/client';
import '../styles/Rankings.css';

const RANKINGS_QUERY = gql`
  query Rankings {
    rankings {
      position
      points
      level
      coursesCompleted
      user {
        id
        username
      }
    }
  }
`;

export default function Rankings() {
  const { loading, error, data } = useQuery(RANKINGS_QUERY);

  if (loading) return <div className="loading">Loading rankings...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const rankings = data?.rankings || [];

  return (
    <div className="rankings-container">
      <h1>Global Rankings</h1>
      
      <div className="rankings-table">
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Username</th>
              <th>Level</th>
              <th>Points</th>
              <th>Courses</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((ranking) => (
              <tr key={ranking.user.id} className={ranking.position <= 3 ? 'top-ranking' : ''}>
                <td className="position">
                  {ranking.position <= 3 ? ['🥇', '🥈', '🥉'][ranking.position - 1] : ranking.position}
                </td>
                <td>{ranking.user.username}</td>
                <td>{ranking.level}</td>
                <td>{ranking.points}</td>
                <td>{ranking.coursesCompleted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
