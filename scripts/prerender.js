// Renders the app to HTML after `vite build`, so crawlers and link previews
// get the whole CV without running JavaScript. The browser then hydrates it.
import { readFile, rm, writeFile } from 'node:fs/promises'

const origin = 'https://sebastiaantenpas.nl'
const server = new URL('../dist-server/', import.meta.url)
const page = new URL('../dist/index.html', import.meta.url)

const { render, structuredData } = await import(new URL('entry-server.js', server).href)

const json = JSON.stringify(structuredData(origin)).replaceAll('<', '\\u003c')
const html = (await readFile(page, 'utf8'))
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  .replace('</head>', `  <script type="application/ld+json">${json}</script>\n  </head>`)

if (!html.includes('<div id="root"><')) throw new Error('Prerender did not fill #root')
await writeFile(page, html)
await rm(server, { recursive: true })
console.log('Prerendered dist/index.html')
