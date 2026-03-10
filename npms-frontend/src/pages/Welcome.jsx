import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={{ textAlign: 'center' }}>
        <h2 className="desktop-page-title">Get Started</h2>
        <p className="form-subtitle">Select an option to continue</p>
        
        <button 
          className="btn-primary" 
          onClick={() => navigate('/login')}
          style={{ marginBottom: '15px' }}
        >
          Log In to Dashboard
        </button>
        
        <button 
          className="btn-primary" 
          onClick={() => navigate('/register')}
          style={{ backgroundColor: 'white', color: '#008055', border: '2px solid #008055' }}
        >
          Register New Account
        </button>
      </div>
    </Layout>
  );
};

export default Welcome;