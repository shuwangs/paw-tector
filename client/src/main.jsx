import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CurrentUserProvider } from './context/CurrentUserContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <CurrentUserProvider>
    <StrictMode>
      <App />
    </StrictMode>

  </CurrentUserProvider>

)