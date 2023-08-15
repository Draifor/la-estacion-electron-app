import React from 'react'
import ReactDOM from 'react-dom/client'
import SessionProvider from './context/SessionContext'
import App from './App'
import './assets/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </React.StrictMode>
)
