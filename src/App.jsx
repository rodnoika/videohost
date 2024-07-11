import React from 'react';
import Header from './jsx/Header';
import VideoList from './jsx/VideoList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

const videos = [
  { title: 'Video 1', thumbnail: 'https://via.placeholder.com/300' },
  { title: 'Video 2', thumbnail: 'https://via.placeholder.com/300' },
  { title: 'Video 3', thumbnail: 'https://via.placeholder.com/300' },
  { title: 'Video 1', thumbnail: 'https://via.placeholder.com/300' },
  { title: 'Video 1', thumbnail: 'https://via.placeholder.com/300' },
  { title: 'Video 1', thumbnail: 'https://via.placeholder.com/300' },
];

function App(){
  return (

    <div className="app">
      <Header />
      <VideoList videos={videos} />
    </div>
  );
};

export default App;
