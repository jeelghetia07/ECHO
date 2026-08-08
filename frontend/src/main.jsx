import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider>
      <App />             {/*This means we can use any component of the clerk provider here*/}
    </ClerkProvider>
  </StrictMode>,
)
