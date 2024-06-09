import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook from react-router-dom
import '../styles/styles.css';

const Signin = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const history = useHistory(); // Initialize useHistory hook

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [backendError, setBackendError] = useState(null); // To store backend errors
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const emailValid = formData.email && /\S+@\S+\.\S+/.test(formData.email);
    const passwordValid = formData.password && formData.password.length >= 6;
    setIsFormValid(emailValid && passwordValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    let error = '';
    if (name === 'email') {
      error = /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email address';
    } else if (name === 'password') {
      error = value.length >= 6 ? '' : 'Password must be at least 6 characters';
    }
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      const res = await axios.post(`${API_URL}/api/auth/signin`, formData);
      localStorage.setItem('token', res.data.token); // Store the token in local storage
      setBackendError(null);
      history.push('/characters'); // Redirect to /characters page
      console.log('User authenticated successfully:', res.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setBackendError(err.response.data.errors[0].msg); // Show the first backend error
      } else {
        setBackendError('An error occurred. Please try again.');
      }
      console.error('Error authenticating user:', err);
    }
  };

  return (
    <div className="container ">
      <div className="signin-card">
        <h2 className="header">Login to MobileFirst Applications</h2>
        <p className="header-desc">
          Welcome, enter your login credentials to get started.
        </p>
        {backendError && <div className="error">{backendError}</div>} {/* Show backend error */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Enter your email address"
              className="input-label"
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Enter password"
            />
            {errors.password && <small className="error">{errors.password}</small>}
          </div>
          <div className="form-group">
            <a href="/forgot-password" className="forgot-password">Forgot Password</a>
          </div>
          <button type="submit" className="signin-button" disabled={!isFormValid}>Login</button>
        </form>
        <p className="signup-link">
          New to MobileFirst? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
