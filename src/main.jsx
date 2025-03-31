import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CityProvider } from './citycontex.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CityProvider>  {/* 👈 Envolver toda la app con el provider */}
      <App />
    </CityProvider>
  </StrictMode>,
)
