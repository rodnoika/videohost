import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Modal.css';

function Modal({ closeModal, onLoginSuccess }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await axios.post('http://127.0.0.1:8000/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.status === 200) {
            const data = response.data;
            Cookies.set('access_token', data.access_token);
            onLoginSuccess(username, data.access_token);
            alert('Login successful');
        }
    } catch (error) {
        console.error('Login error', error);
        alert('Invalid username or password');
    }
};





  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/register', {
        username,
        password,
      });
      if (response.status === 200) {
        const data = response.data;
        console.log('Registration successful:', data);
        setErrorMessage('');
        toggleForm(); // Automatically switch to login form after successful registration
      }
    } catch (error) {
      console.error('Registration error', error);
      setErrorMessage(error.response?.data?.detail || 'Registration error');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isSignIn ? (
          <>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
              <input 
                type="text" 
                placeholder="Username"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
              <input
                 type="password" 
                 placeholder="Password"
                 value={password} 
                 onChange={(e) => setPassword(e.target.value)} 
                 required 
              />
              <button type="submit">Sign In</button>
            </form>
            <p>
              Don't have an account?{' '}
              <span className="modal-link" onClick={toggleForm}>
                Register here
              </span>
            </p>
          </>
        ) : (
          <>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit">Register</button>
            </form>
            <p>
              Already have an account?{' '}
              <span className="modal-link" onClick={toggleForm}>
                Sign in here
              </span>
            </p>
          </>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="close-button" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
