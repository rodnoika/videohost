import React from 'react';
import VideoCard from './VideoCard.jsx';
import './VideoList.css';

function VideoList({ videos }){
  return (
    <div className="video-list">
      {videos.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
