import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './assets/fonts/montserrat/montserrat.css'
import './assets/fonts/nura/nura.css'

createRoot(document.getElementById('root')).render(
    <App />
)
