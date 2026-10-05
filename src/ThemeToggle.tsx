import { useEffect, useState, type ReactNode } from 'react'

// Cycles between following the system, light and dark. The choice is kept in
// localStorage and applied as data-theme on <html>; index.html applies it
// before first paint so the page doesn't flash the wrong colours.

type Theme = 'auto' | 'light' | 'dark'

const next: Record<Theme, Theme> = { auto: 'light', light: 'dark', dark: 'auto' }
const labels: Record<Theme, string> = {
  auto: 'Theme: automatic. Switch to light',
  light: 'Theme: light. Switch to dark',
  dark: 'Theme: dark. Switch to automatic',
}

function stored(): Theme {
  try {
    const value = localStorage.getItem('theme')
    return value === 'light' || value === 'dark' ? value : 'auto'
  } catch {
    return 'auto'
  }
}

const icons: Record<Theme, ReactNode> = {
  // Half sun, half moon
  auto: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path className="filled" d="M12 4a8 8 0 0 1 0 16z" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  dark: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(stored)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'auto') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
    try {
      if (theme === 'auto') localStorage.removeItem('theme')
      else localStorage.setItem('theme', theme)
    } catch {
      // Storage can be unavailable (private mode); the toggle still works.
    }
  }, [theme])

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={labels[theme]}
      title={labels[theme]}
      onClick={() => setTheme(next[theme])}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {icons[theme]}
      </svg>
    </button>
  )
}

export default ThemeToggle
