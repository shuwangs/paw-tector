import React from 'react';
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DiscoverPage from './pages/DiscoverPage';
import HomePage from './pages/HomePage';
import TopNav from './components/TopNav';
import MyRecords from './pages/MyRecordsPage';
import AnimalProfilePage from './pages/AnimalProfilePage';
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
              <Route path='/' element={<HomePage />  } />
              <Route path = '/discover' element={<DiscoverPage />}  />
              <Route path='/records' element={  <MyRecords /> }/>
              <Route path ='/individuals/:individualId' element={<AnimalProfilePage /> } />
            </Routes>
        </div>
        </CurrentUserProvider>
      </DiscoverProvider>

    </BrowserRouter>
  )
}

export default App;
