import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    if (confirmLogout) {
      logout();
      alert("Logout successful");
      navigate('/');
    } else {
      alert("Logout cancelled");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
    setUpdateMessage('');
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || 'dummy-token'}`
        },
        body: JSON.stringify({
          name: editForm.name,
          email: editForm.email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUpdateMessage('Profile updated successfully!');
        // Update the user in localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, name: editForm.name, email: editForm.email };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // Reload the page to reflect changes
        window.location.reload();
      } else {
        setUpdateMessage(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update error:', error);
      setUpdateMessage('Network error. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-square"></div>
          <span>ADMIN PANEL</span>
        </div>
        <ul className="sidebar-menu">
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            <i className="fas fa-user"></i> View Profile
          </li>
          <li
            className={activeTab === "edit" ? "active" : ""}
            onClick={() => setActiveTab("edit")}
          >
            <i className="fas fa-user-edit"></i> Edit Profile
          </li>
        </ul>
        <button className="sidebar-signout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Sign Out
        </button>
      </aside>
      <main className="dashboard-main">
        <h1 className="dashboard-welcome">Welcome to Admin Dashboard</h1>
        {activeTab === "profile" && user && (
          <div className="profile-section">
            <h2>Your Profile</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
        {activeTab === "edit" && user && (
          <form className="edit-profile-form" onSubmit={handleProfileUpdate}>
            <h2>Edit Profile</h2>
            {updateMessage && (
              <div className={`message ${updateMessage.includes('successfully') ? 'success' : 'error'}`}>
                {updateMessage}
              </div>
            )}
            <label>
              Name:
              <input 
                type="text" 
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input 
                type="email" 
                name="email"
                value={editForm.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Save Changes"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
