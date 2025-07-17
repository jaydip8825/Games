import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginDashboard from './components/Login/LoginDashboard';
import SignUpDashboard from './components/SignUp/SignUpDashboard';
import WelcomeDashboard from './components/User/WelcomeDashboard.jsx';
import SuperAdminDashboard from './components/SuperAdmin/SuperAdminDashboard.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import './App.css';



function App() {
  const [user, setUser] = useState(null);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginDashboard setUser={setUser} />} />
        <Route path="/signup" element={<SignUpDashboard />} />
        <Route path="/WelcomeDashboard" element={<WelcomeDashboard user={user} />} />
        <Route path="/SuperAdminDashboard" element={<SuperAdminDashboard user={user} />} />
        <Route path="/AdminDashboard" element={<AdminDashboard user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
