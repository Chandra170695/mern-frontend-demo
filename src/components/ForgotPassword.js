import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../styles/styles.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // To store success or error message
  const [resetLink, setResetLink] = useState(''); // To store reset link
  const [isFormValid, setIsFormValid] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const emailValid = email && /\S+@\S+\.\S+/.test(email);
    setIsFormValid(emailValid);
  }, [email]);

  const handleBlur = (e) => {
    const { value } = e.target;
    let error = '';
    error = /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email address';
    setError(error);
  };

  const handleClick = () => {
    let emailAddress = "contact@mobilefirst.com";
    let subject = "Assistance Required: Password Reset"
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, { email });
      if (res.data.resetToken) {
        const resetUrl = `/reset-password/${res.data.resetToken}`;
        setResetLink(resetUrl);
        setMessage('A reset link has been generated. Click the link below to reset your password.()');
      } else {
        setMessage('User does not exist');
      }
    } catch (err) {
      console.error(err);
      setMessage('User does not exist or try after some time');
    }
  };

  return (
    <div className="container ">
      <div className="forgot-password-card">
        <button className="back-button" onClick={() => history.push('/signin')}>←</button>
        <h2 className="header">Forgot Password</h2>
        <p className="header-desc">
          Please enter your email registered with MobileFirst Applications and we will send you an email to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              required
              placeholder="Enter your email address"
              className="input-label"
            />
            {error && <small className="error">{error}</small>}
          </div>
          <button type="submit" className="reset-password-button" disabled={!isFormValid}>Reset Password</button>
        </form>
        {message && <p className="message">{message}</p>}
        {resetLink && <a href={resetLink}>Reset your password</a>}
        <p className="help-link">
          Trouble resetting your password? <a onClick={handleClick}>Need help</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
