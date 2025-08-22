import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Leaderboard endpoint:', endpoint);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div className="card shadow p-4">
      <h2 className="card-title mb-4 text-success">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.user?.username || 'Unknown'}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
