// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'; // Isko import karein

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  {/* Yahan add karein */}
      <App />
    </BrowserRouter> {/* Yahan close karein */}
  </React.StrictMode>,
)


