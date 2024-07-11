import React from 'react';
import './VideoCards.css';

function VideoCard({ video }){
  return (
    <div className="video-cards">
      <img src={video.thumbnail} alt={video.title} />
      <div className="video-card-title">{video.title}</div>
    </div>
  );
};

export default VideoCard;
