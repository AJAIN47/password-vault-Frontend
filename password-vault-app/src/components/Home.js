import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Assume this CSS file contains styling

const Home = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    // Fetch the applications from the backend API
    fetch('http://localhost:5001/applications')
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
        setError('Failed to load applications. Please try again.');
        setLoading(false); // Stop loading in case of an error
      });
  }, []);

  if (loading) {
    return <div className="loader">Loading applications...</div>; // Loader while data is being fetched
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Show error message if fetch fails
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Saved Applications</h1>
      {applications.length > 0 ? (
        <table className="home-table">
          <thead>
            <tr>
              <th>Application Name</th>
              <th>Username</th>
              <th>Password (Encrypted)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{app.username}</td>
                <td>{app.password}</td> {/* Display encrypted password */}
                <td>
                  <Link to={`/application/${app.id}`} className="view-link">
                    <button className="view-button">View Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications found.</p>  // Display a message if no applications exist
      )}
    </div>
  );
};

export default Home;
