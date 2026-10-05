// Streamlines of potential flow around a cylinder, with the portrait as the
// cylinder: a hint of the fluid dynamics background. Some streamlines are
// lines of code drifting past, because these days it's mostly code.
//
// The stream function for a uniform flow past a cylinder of radius R is
// psi = y (1 - R^2 / (x^2 + y^2)); each streamline is where psi is constant.

import { profile } from './content.ts'

const R = 1
const WIDTH = 7
const HEIGHT = 2.4
const STEP = 0.05

function psi(x: number, y: number) {
  return y * (1 - (R * R) / (x * x + y * y))
}

// psi increases with y above the cylinder, so bisection finds the streamline.
function streamlineY(x: number, c: number) {
  let low = Math.sqrt(Math.max(0, R * R - x * x))
  let high = c + R
  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2
    if (psi(x, mid) < c) low = mid
    else high = mid
  }
  return (low + high) / 2
}

type Streamline = { d: string; length: number }

function streamline(c: number, sign: 1 | -1): Streamline {
  const points: [number, number][] = []
  for (let x = -WIDTH; x <= WIDTH + 1e-9; x += STEP) {
    points.push([x, sign * streamlineY(x, c)])
  }
  let length = 0
  for (let i = 1; i < points.length; i++) {
    length += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1])
  }
  const d = `M${points.map(([x, y]) => `${x.toFixed(3)},${y.toFixed(3)}`).join('L')}`
  return { d, length }
}

// One snippet per line of code, top to bottom.
const snippets = [
  'resource "google_cloud_run_v2_service" "webapp" { name = "webapp" }',
  "const cv = await fetch('/experience').then((r) => r.json())",
  'def deploy(env): return pipeline.run(env, checks=True)',
  "git commit -m 'Make the site a bit more playful'",
]

// Monospace characters are about 0.6em wide, at the 0.15 font size in index.css.
const CHAR_WIDTH = 0.09

// The text is two copies of a snippet stretched to exactly twice the path
// length, so sliding it back by one path length loops seamlessly.
function codeLine(snippet: string, length: number) {
  const copies = Math.max(1, Math.round(length / CHAR_WIDTH / (snippet.length + 4)))
  const text = `${snippet}    `.repeat(copies)
  return text + text
}

const values = [0.12, 0.35, 0.65, 1.0, 1.4, 1.85]
const CODE_LINES = new Set([0, 3])
const lines = values.flatMap((c) => [streamline(c, 1), streamline(c, -1)])
const codeLines = lines.map((_, i) => i).filter((i) => CODE_LINES.has(Math.floor(i / 2)))

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Flow() {
  return (
    <svg
      className="flow"
      viewBox={`${-WIDTH} ${-HEIGHT} ${2 * WIDTH} ${2 * HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {lines.map((line, i) => (
          <path key={line.d} id={`streamline-${i}`} d={line.d} />
        ))}
        <clipPath id="portrait-clip">
          <circle r={R * 0.96} />
        </clipPath>
      </defs>
      {lines.map((line, i) =>
        // Two pairs of streamlines carry code, the rest are plain flow lines.
        CODE_LINES.has(Math.floor(i / 2)) ? (
          <text key={line.d} className="code-line">
            <textPath
              href={`#streamline-${i}`}
              textLength={2 * line.length}
              lengthAdjust="spacing"
              startOffset={0}
            >
              {codeLine(snippets[codeLines.indexOf(i) % snippets.length], line.length)}
              {!reduceMotion && (
                <animate
                  attributeName="startOffset"
                  from={0}
                  to={-line.length}
                  dur={`${60 + (i % 3) * 15}s`}
                  repeatCount="indefinite"
                />
              )}
            </textPath>
          </text>
        ) : (
          <use
            key={line.d}
            href={`#streamline-${i}`}
            className="flow-line"
            style={{ animationDelay: `${-(i % 6) * 0.7}s` }}
          />
        ),
      )}
      <circle className="cylinder" r={R} />
      <image
        href={profile.portrait}
        x={-R}
        y={-R}
        width={2 * R}
        height={2 * R}
        clipPath="url(#portrait-clip)"
      />
    </svg>
  )
}

export default Flow
