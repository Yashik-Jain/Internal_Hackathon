import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // Predefined users for testing
  const USERS = {
    'admin123': { password: 'admin123', name: 'Admin User', role: 'admin' },
    'doctor123': { password: 'doctor123', name: 'Dr. Smith', role: 'doctor' },
    'patient123': { password: 'patient123', name: 'John Doe', role: 'patient' }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if user exists and password matches
    const user = USERS[userId];
    if (user && user.password === password) {
      login({ userId, ...user });
      toast.success('Login successful!');
      navigate('/');
    } else {
      toast.error('Invalid credentials! Try: admin123/admin123, doctor123/doctor123, or patient123/patient123');
    }
  };

  return (
    <div className="container form-component login-form">
      <h2>Login</h2>
      <p>Please login to continue</p>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <div className="demo-credentials">
        <h3>Demo Credentials:</h3>
        <p><strong>Admin:</strong> admin123 / admin123</p>
        <p><strong>Doctor:</strong> doctor123 / doctor123</p>
        <p><strong>Patient:</strong> patient123 / patient123</p>
      </div>

      <div className="register-link">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
