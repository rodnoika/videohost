import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Modal from './Modal';
import Cookies from 'js-cookie';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLog, setIsLog] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = Cookies.get('access_token');
        if (token) {
          const response = await fetch('http://localhost:8000/users/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (response.ok) {
            const data = await response.json();
            setUsername(data.username);
            setIsLog(true);
          } else {
            setIsLog(false); // Clear logged-in state if the request fails
          }
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setIsLog(false);
      }
    };
  
    fetchCurrentUser();
  }, []); 
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onLoginSuccess = (username, token) => {
    Cookies.set('access_token', token);
    Cookies.set('username', username);

    setUsername(username);
    setIsLog(true);
    console.log('Logged in as:', username);
    console.log('Token:', token);
    closeModal();
  };

  const handleLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('username');

    setUsername('');
    setIsLog(false);
    closeModal();
  };

  return (
    <header className="header">
      <div className="header-logo">Video Hosting</div>
      {isLog ? (
        <div>
          <Link to="/dashboard">{username}</Link> {'   '}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={openModal}>Sign In</button>
      )}
      {isModalOpen && <Modal closeModal={closeModal} onLoginSuccess={onLoginSuccess} />}
    </header>
  );
}

export default Header;
