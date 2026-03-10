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

      <div className='app-container'>
        <Routes>
          <Route path='/' element={
            <DiscoverProvider>
              <HomePage />
            </DiscoverProvider>
            } />
          <Route path = '/discover' element={
            <DiscoverProvider>
              <DiscoverPage />
            </DiscoverProvider>} />
          <Route path='/records' element={ 
            <CurrentUserProvider>
              <MyRecords />
            </CurrentUserProvider>} />

            <Route path ='/individuals/:individualId'
              element={<CurrentUserProvider>
              <AnimalProfilePage />
             </CurrentUserProvider> } />

        </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
