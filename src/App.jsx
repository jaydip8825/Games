import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import LoginDashboard from './components/Login/LoginDashboard';
import SignUpDashboard from './components/SignUp/SignUpDashboard';
import WelcomeDashboard from './components/User/WelcomeDashboard.jsx';
import SuperAdminDashboard from './components/SuperAdmin/SuperAdminDashboard.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import './App.css';

// Loading component
const LoadingScreen = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  }}>
    Loading...
  </div>
);

// App Routes component
const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<LoginDashboard />} />
      <Route path="/signup" element={<SignUpDashboard />} />
      <Route path="/WelcomeDashboard" element={<WelcomeDashboard />} />
      <Route path="/SuperAdminDashboard" element={<SuperAdminDashboard />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
