import React, { useState } from 'react';
import '../pagesstyle/login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    //make sure the informations are entered all
    if (username === '' || password === '') {
      setError('Both fields are required.');
      return;
    }
    // Save login inputs to localStorage
    localStorage.setItem("loginData", JSON.stringify({ user_name: username, password }));

    axios.post('http://localhost:5000/api/login', {
      user_name: username,
      password: password
    })
    .then((response) => {
      const { user,  packages } = response.data;

      // Save data in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('packages', JSON.stringify(packages));
      setUser(user); 
      navigate('/'); 
    })
    .catch((error) => {
      console.error('login error', error);
      setError('Invalid username or password.');
    });
  }

  return (
    <div className="log">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input
            type="text"
            className="inputuser"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input
            type="password"
            className="inputuser"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className='remember'>
          <label><input type="checkbox" />Remember me</label>
          <p><Link to="/signup">Forgot password?</Link></p>
        </div>
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
        <div className='Registerlink'>
          <p>Don't have an account? <Link to="/signup">Sign up now</Link></p>
        </div> 
      </form>
      <h2>TO Delivery</h2>
    </div>
  );
}
export default Login;