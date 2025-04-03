import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './contexts/UserContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
  <Router>
    <StrictMode>
      <App />
    </StrictMode>
  </Router>
  </UserProvider>
);