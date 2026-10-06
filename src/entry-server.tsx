import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { links, profile } from './content.ts'

// Used by scripts/prerender.js at build time to write the page into index.html.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// schema.org description of the person, for search engines.
export function structuredData(origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.headline,
    url: `${origin}/`,
    image: `${origin}${profile.portrait}`,
    email: 'info@sebastiaantenpas.nl',
    sameAs: links.filter((link) => link.url.startsWith('https://')).map((link) => link.url),
  }
}
