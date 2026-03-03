import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import DiscoverPage from './pages/DiscoverPage';

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path = '/discover' element={<DiscoverPage />}></Route>
        
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
