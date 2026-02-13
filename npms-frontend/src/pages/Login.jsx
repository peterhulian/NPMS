import React, { useState } from 'react';
import Layout from '../components/Layout';
import { checkLogin } from '../data/mockData'; // Import the login check function

const Login = ({ onNavigate, onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(''); // Clear error when typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Check credentials against mock database
    const user = checkLogin(credentials.email, credentials.password);

    if (user) {
      // 2. If valid, log them in
      onLogin(user); 
    } else {
      // 3. If invalid, show error
      setError("Invalid email or password");
    }
  };

  return (
    <Layout onBack={() => onNavigate('welcome')}>
      <h2 className="desktop-page-title">Welcome Back</h2>
      <p className="form-subtitle">Please enter your details to sign in.</p>

      <form onSubmit={handleSubmit}>
        {/* Error Message Display */}
        {error && <p style={{color: 'red', marginBottom: '15px'}}>{error}</p>}

        <div className="input-group">
          <input 
            type="email" name="email" placeholder="Enter your email" 
            value={credentials.email} onChange={handleChange} required 
          />
        </div>
        <div className="input-group">
          <input 
            type="password" name="password" placeholder="Enter your password" 
            value={credentials.password} onChange={handleChange} required 
          />
        </div>

        <button type="submit" className="btn-primary">Sign In</button>
        
        <p className="switch-auth">
          Don't have an account? 
          <span onClick={() => onNavigate('register')}> Create account</span>
        </p>
      </form>
    </Layout>
  );
};

export default Login;