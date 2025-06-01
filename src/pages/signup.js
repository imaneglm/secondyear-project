import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../pagesstyle/signup.css";
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Signup() {
  const [user_name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone_Number, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    //vlaid that they filled 
    if (!user_name || !email || !password || !confirmPassword || !phone_Number) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      // Send signup request to the backend
      const response = await axios.post('http://localhost:5000/api/signup/signup', {
        user_name,
        email,
        password,
        phone_number: phone_Number,
      });
      setSuccess(response.data.message);
      const userData = response.data.user;
      if (userData) {
        // Store user data in localStorage 
        localStorage.setItem("user", JSON.stringify({
          user_id: userData.user_id,
          user_name: userData.user_name,
          email: userData.email,
          phone_Number: userData.phone_Number,
          role: userData.role
        }));
      }
      // Redirect to homepage after delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      // Handle  errors
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };
  return (
    <div className="form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {/* Username input */}
        <div className="input-box">
          <FaUser className="icon" />
          <input 
            type="text" 
            placeholder="Username" 
            value={user_name} 
            onChange={e => setUsername(e.target.value)} 
            required 
          />
        </div>
        {/* Email input */}
        <div className="input-box">
          <MdEmail className="icon" />
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required 
          />
        </div>
        {/* Password input */}
        <div className="input-box">
          <FaLock className="icon" />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
        </div>
        {/* Confirm Password input */}
        <div className="input-box">
          <FaLock className="icon" />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required 
          />
        </div>
        {/* Phone number input */}
        <div className="input-box">
          <FaPhoneAlt className="icon" />
          <input 
            type="tel" 
            placeholder="Enter Phone number used with company" 
            value={phone_Number}
            onChange={e => setPhoneNumber(e.target.value)}
            required 
          />
        </div>
        <button type="submit">Sign Up</button>
        {/* Display success or error messages */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        {/*redirect to login page if they already have account */}
        <div className="register-link">
          <p>I already have an account <Link to="/login">Log in</Link></p>
        </div>
      </form>
    </div>
  );
}
export default Signup;