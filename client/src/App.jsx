import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import DiscoverPage from './pages/DiscoverPage';
import HomePage from './pages/HomePage';

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path = '/discover' element={<DiscoverPage />} />
        
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
