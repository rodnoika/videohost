import React, { useState, useEffect } from 'react';
import Header from '../jsx/Header';
import Hero from './hero_section';
import Cookies from 'js-cookie';
import '../App.css';

function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [username, setUsername] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('access_token');
      const response = await fetch('http://127.0.0.1:8000/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        // Assuming photoUrl is part of the user data
        setPhotoUrl(data.photoUrl || 'default-avatar.png');
      } else {
        console.error('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Hero username={username} photoUrl={photoUrl} videos={videos} setVideos={setVideos} />
    </div>
  );
}

export default Dashboard;
