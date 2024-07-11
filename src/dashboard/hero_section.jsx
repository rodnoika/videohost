import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './hero.css';

function Hero({ username, photoUrl }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const token = Cookies.get('access_token');
      const response = await fetch('http://127.0.0.1:8000/videos/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      } else {
        console.error('Failed to fetch videos');
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="dashboard">
      <div className="user-info">
        <div className="user-avatar">
          <img src={photoUrl} alt="User Avatar" />
        </div>
        <div className="user-name">{username}</div>
      </div>
      <div className="video-gallery">
        {videos && videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="video-thumbnail" onClick={() => handleVideoClick(video)}>
              <img src={`http://127.0.0.1:8000/uploads/${video.filename}`} alt={`Video ${index}`} />
              <div className="video-title">{video.title}</div>
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
      {selectedVideo && (
        <div className="video-player">
          <video controls>
            <source src={`http://127.0.0.1:8000/uploads/${selectedVideo.filename}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-description">{selectedVideo.description}</div>
        </div>
      )}
      <Link to="/create-video" className="create-video-link">
        <button className="create-video-button">Create Video</button>
      </Link>
    </div>
  );
}

export default Hero;
