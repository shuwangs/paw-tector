import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DiscoverPage from './pages/DiscoverPage';
import HomePage from './pages/HomePage';
import TopNav from './components/TopNav';
import MyRecords from './pages/MyRecordsPage';
import AnimalProfilePage from './pages/AnimalProfilePage';
import AuthPage from './pages/authPage';
import { DiscoverProvider } from "./context/DiscoverContext";
import { CurrentUserProvider } from './context/CurrentUserContext';
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <TopNav />
      <DiscoverProvider>
        <CurrentUserProvider>
          <div className='app-container'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/discover' element={<DiscoverPage />} />
              <Route path='/records' element={<MyRecords />} />
              <Route path='/individuals/:individualId' element={<AnimalProfilePage />} />
              <Route path='/register' element={<AuthPage />} />
              <Route path='/login' element={<AuthPage />} />
            </Routes>
          </div>
        </CurrentUserProvider>
      </DiscoverProvider>

    </BrowserRouter>
  )
}

export default App;
