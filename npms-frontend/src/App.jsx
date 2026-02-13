import React, { useState } from 'react';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './styles/index.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentUser, setCurrentUser] = useState(null); // STORE LOGGED IN USER

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('welcome');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <Welcome onNavigate={setCurrentScreen} />;
      case 'login':
        // Pass handleLogin to save user data
        return <Login onNavigate={setCurrentScreen} onLogin={handleLogin} />;
      case 'register':
        return <Register onNavigate={setCurrentScreen} />;
      case 'dashboard':
        // Pass the currentUser to the Dashboard
        return <Dashboard user={currentUser} onNavigate={handleLogout} />;
      default:
        return <Welcome />;
    }
  };

  return renderScreen();
}

export default App;