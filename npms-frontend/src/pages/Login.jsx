import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { checkLogin } from '../data/mockData';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(''); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = checkLogin(credentials.email, credentials.password);

    if (user) {
      onLogin(user); 
      navigate('/dashboard');
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Layout onBack={() => navigate('/')}>
      <h2 className="desktop-page-title">Welcome Back</h2>
      <p className="form-subtitle">Please enter your details to sign in.</p>

      <form onSubmit={handleSubmit}>
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
          <span onClick={() => navigate('/register')}> Create account</span>
        </p>
      </form>
    </Layout>
  );
};

export default Login;