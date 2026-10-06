import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// The HTML is prerendered at build time (see scripts/prerender.js), so React
// attaches to the existing markup instead of rendering from scratch.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>,
)
