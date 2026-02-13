import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { addRegistration } from '../data/mockData'; // Import the "backend" function

const Register = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    role: 'Teacher',
    fullName: '',
    email: '',
    password: '',
    room: '',
    contact: ''
  });

  // Clear room if not teacher
  useEffect(() => {
    if (formData.role !== 'Teacher') {
      setFormData(prev => ({ ...prev, room: '' }));
    }
  }, [formData.role]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Save data to our "mock database"
    addRegistration({
      name: formData.fullName,
      role: formData.role,
      room: formData.room || 'Unassigned',
      email: formData.email,
      password: formData.password
    });

    // 2. Show alert (Optional)
    alert("Registration successful! Please wait for Admin approval.");

    // 3. Navigate back to Login
    onNavigate('login');
  };

  return (
    <Layout onBack={() => onNavigate('welcome')}>
      <h2 className="desktop-page-title">Create Account</h2>
      <p className="form-subtitle">Join NPMS to manage noise levels.</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="input-group">
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <input type="email" name="email" placeholder="School Email" onChange={handleChange} required />
        </div>
        
        <div className="input-group">
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <select 
            name="room" 
            value={formData.room} 
            onChange={handleChange}
            disabled={formData.role !== 'Teacher'}
            style={{ 
              color: formData.room ? '#1f2937' : '#9ca3af',
              backgroundColor: formData.role !== 'Teacher' ? '#e5e7eb' : '#f9fafb'
            }}
          >
            <option value="" disabled>
              {formData.role === 'Teacher' ? "Select Available Room" : "Not applicable for Admins"}
            </option>
            <option value="Room 1">Room 1</option>
            <option value="Room 2">Room 2</option>
          </select>
        </div>

        <div className="input-group">
          <input type="tel" name="contact" placeholder="Contact Number" onChange={handleChange} required />
        </div>

        <button type="submit" className="btn-primary">Register</button>

        <p className="switch-auth">
          Already have an account? 
          <span onClick={() => onNavigate('login')}> Log In</span>
        </p>
      </form>
    </Layout>
  );
};

export default Register;