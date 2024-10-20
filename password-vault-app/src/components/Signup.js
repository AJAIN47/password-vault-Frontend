import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';  // Optional: For improved styling

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the hook for navigation

  const handleSignup = (e) => {
    e.preventDefault();
  
    // Send signup request to backend
    fetch('http://localhost:5001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from server:', data); // Log the response for debugging
        if (data.success) {
          navigate('/');  // Redirect to login page on successful signup
        } else {
          // Handle failed signup here if needed
          console.error('Signup failed:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
