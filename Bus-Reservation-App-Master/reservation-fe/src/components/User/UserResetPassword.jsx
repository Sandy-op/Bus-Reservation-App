import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Styles/ResetPassword.css'

const UserResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.put(`http://deepmindstech.in:8080/api/users/reset-password/${email}`, {
        password: newPassword,
      });

      if (response.status === 202) { 
        setMessage('Password has been successfully reset.');
        setTimeout(() => navigate('/userlogin'), 2000); 
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ResetPassword">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleResetPassword}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <label>New Password</label>
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserResetPassword;
