import React from 'react';
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DiscoverPage from './pages/DiscoverPage';
import HomePage from './pages/HomePage';
import TopNav from './pages/TopNav';
import MyRecords from './pages/MyRecords';
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <TopNav />

      <div className='app-container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path = '/discover' element={<DiscoverPage />} />
          <Route path='/records' element={<MyRecords />} />
          
        </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
