import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = ({ user }) => (
  <div className="admin-dashboard-container">
    <div className="admin-dashboard-card">
      <h1>Welcome to Admin Dashboard</h1>
      {user && (
        <h2>
          Hello, <span className="admin-highlight">{user.name || user.email}</span>!
        </h2>
      )}
      <p className="admin-dashboard-message">
        You have admin privileges. Here you can manage users, view reports, and perform admin operations.
      </p>
      {/* Add more admin features here */}
    </div>
  </div>
);

export default AdminDashboard;
