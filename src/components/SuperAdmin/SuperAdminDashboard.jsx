import React from 'react';
import './SuperAdminDashboard.css';

const SuperAdminDashboard = ({ user }) => {
    console.log(user,"user");
  return (
    <div className="superadmin-dashboard-container">
      <div className="superadmin-dashboard-card">
        <h1>Welcome to Super Admin Dashboard</h1>
        {user && (
          <h2>
            Hello, <span className="superadmin-highlight">{user.name || user.email}</span>!
          </h2>
        )}
        <p className="superadmin-dashboard-message">
          You have super admin privileges. Here you can manage users, view analytics, and perform advanced operations.
        </p>
        welcome superadmin
        {/* Add more super admin features here */}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
