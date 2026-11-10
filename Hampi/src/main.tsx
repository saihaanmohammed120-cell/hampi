import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Theme } from '@astryxdesign/core/theme'
import { chocolateTheme } from '@astryxdesign/theme-chocolate/built'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme theme={chocolateTheme} mode="dark">
      <App />
    </Theme>
  </StrictMode>,
)
