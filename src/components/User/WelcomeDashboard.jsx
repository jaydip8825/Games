import React from 'react';
import './WelcomeDashboard.css';

const WelcomeDashboard = ({ user }) => {
  return (
    <div className="user-dashboard-container">
      <div className="user-dashboard-card">
        <h1>Welcome to User Dashboard</h1>
        {user && (
          <h2>
            Hello, <span className="user-highlight">{user.name || user.email}</span>!
          </h2>
        )}
        <p className="user-dashboard-message">
          You have successfully logged in. Enjoy your personalized dashboard experience!
        </p>
      </div>
    </div>
  );
};

export default WelcomeDashboard;
