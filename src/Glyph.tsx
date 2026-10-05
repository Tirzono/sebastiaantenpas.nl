import type { ReactNode } from 'react'
import type { GlyphKind } from './content.ts'

// Small line drawings, one per entry in the timeline. Their animations live in
// index.css under .glyph-<kind> and only run while the entry is on screen.

const glyphs: Record<GlyphKind, ReactNode> = {
  // An application form being ticked off: undergraduate admissions.
  form: (
    <>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4" />
      <path className="draw" d="m8.5 11 1.5 1.5 3-3" />
      <path d="M8.5 16.5h7" />
    </>
  ),
  // A key with a pulse in its bow: identity and access management.
  key: (
    <>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h9M18 12v3M15 12v2" />
      <circle className="ping" cx="8" cy="12" r="1" />
    </>
  ),
  // An aerofoil with air moving over it.
  airfoil: (
    <>
      <path d="M3 13c3-4 11-4.5 18-1-7 1.5-14 2-18 1z" />
      <path className="stream" d="M2 8c6-3 13-3 20 1" />
      <path className="stream" d="M2 18c6 1 13 0 20-3" />
    </>
  ),
  // A shield with a tick: patching vulnerabilities.
  shield: (
    <>
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" />
      <path className="draw" d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  // A browser window with lines of content being typed.
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 8.5h18" />
      <path className="line" d="M6.5 12.5h11" />
      <path className="line" d="M6.5 16h7" />
    </>
  ),
  // A wind turbine.
  turbine: (
    <>
      <path d="M12 11v10M9 21h6" />
      <g className="rotor">
        <path d="M12 9.5V3.5M12 9.5l5.2 3M12 9.5l-5.2 3" />
        <circle cx="12" cy="9.5" r="1.2" />
      </g>
    </>
  ),
  // A boat bobbing on the waves.
  boat: (
    <>
      <g className="hull">
        <path d="M5 14h14l-2 3.5H7z" />
        <path d="M12 14V5l5 7.5h-5" />
      </g>
      <path className="waves" d="M-4 20.5q2-1.6 4 0t4 0 4 0 4 0 4 0 4 0 4 0 4 0" />
    </>
  ),
  // A slice of pizza, still steaming.
  pizza: (
    <>
      <path d="M5 8q7-4 14 0l-7 13z" />
      <path d="M6.3 10.4q5.7-3 11.4 0" />
      <circle cx="10.4" cy="11.6" r="0.7" />
      <circle cx="13.4" cy="12.4" r="0.7" />
      <path className="steam" d="M10 5c-1-1 1-1.6 0-3M14 5c-1-1 1-1.6 0-3" />
    </>
  ),
  // A graduation cap with a swinging tassel.
  cap: (
    <>
      <path d="M2.5 9 12 5l9.5 4L12 13z" />
      <path d="M6.5 11v4c0 2 11 2 11 0v-4" />
      <path className="tassel" d="M21.5 9v5.5" />
    </>
  ),
  // A sum sign being written: the minor in applied mathematics.
  sigma: <path className="draw" d="M17 5H7l5.5 7L7 19h10" />,
}

function Glyph({ kind }: { kind: GlyphKind }) {
  return (
    <span className={`glyph glyph-${kind}`} aria-hidden="true">
      <svg viewBox="0 0 24 24">{glyphs[kind]}</svg>
    </span>
  )
}

export default Glyph
