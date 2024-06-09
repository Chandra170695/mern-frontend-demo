import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const Signup = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [backendError, setBackendError] = useState(null); // To store backend errors
  const [successMessage, setSuccessMessage] = useState(null); // To store success message
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fullNameValid = formData.fullName.length > 0;
    const emailValid = formData.email && /\S+@\S+\.\S+/.test(formData.email);
    const passwordValid = formData.password.length >= 6;
    const passwordsMatch = formData.password === formData.confirmPassword;
    setIsFormValid(fullNameValid && emailValid && passwordValid && passwordsMatch);
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
    } else if (name === 'confirmPassword') {
      error = value === formData.password ? '' : 'Passwords do not match';
    } else if (name === 'fullName') {
      error = value.length > 0 ? '' : 'Full name is required';
    }
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    const { fullName, email, password } = formData; // Extract only the necessary fields

    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, { fullName, email, password });
      setSuccessMessage('User created successfully! Please go to the sigin page.');
      setBackendError(null);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setBackendError(err.response.data.errors[0].msg); // Show the first backend error
        setSuccessMessage(null);
      } else {
        setBackendError('An error occurred. Please try again.');
        setSuccessMessage(null);
      }
    }
  };

  return (
    <div className="container ">
      <div className="signup-card">
        <h2 className="header">Sign up with MobileFirst Applications</h2>
        <p className="header-desc">Welcome, please enter the below details to create your account with MobileFirst Applications.</p>
        {backendError && <div className="error">{backendError}</div>} {/* Show backend error */}
        {successMessage && <div className="success">{successMessage}</div>} {/* Show success message */}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Enter your full name"
              className="input-label"
            />
            {errors.fullName && <small className="error">{errors.fullName}</small>}
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
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
            <label className="form-label">Choose Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Choose password"
              className="input-label"
            />
            {errors.password && <small className="error">{errors.password}</small>}
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Confirm password"
              className="input-label"
            />
            {errors.confirmPassword && <small className="error">{errors.confirmPassword}</small>}
          </div>
          <button type="submit" className="signup-button" disabled={!isFormValid}>Continue</button>
        </form>
        <p className="signin-link">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
