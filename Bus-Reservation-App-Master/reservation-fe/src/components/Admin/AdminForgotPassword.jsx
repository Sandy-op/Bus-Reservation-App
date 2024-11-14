import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Styles/ForgotPassword.css';

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`http://deepmindstech.in:8080/api/admins/forgot-password?email=${email}`, null, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response);

      if (response.status === 200) {
        setMessage('Password reset link has been sent to your email.');
        setTimeout(() => {
          navigate('/reset-confirmation');
          setTimeout(() => navigate('/adminlogin'), 2000); 
        }, 2000);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('An error occurred. Please check your email and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ForgotPassword">
      <form onSubmit={handleForgotPassword}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button className="btn btn-primary" type="submit">
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
