// Potential flow around a cylinder, with the portrait as the cylinder: a nod
// to computational fluid dynamics. The stream function for a uniform flow
// past a cylinder of radius R is psi = y (1 - R^2 / (x^2 + y^2)), so every
// streamline is the set of points where psi equals a constant.

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

function streamline(c: number, sign: 1 | -1) {
  const points: string[] = []
  for (let x = -WIDTH; x <= WIDTH + 1e-9; x += STEP) {
    const y = sign * streamlineY(x, c)
    points.push(`${x.toFixed(3)},${y.toFixed(3)}`)
  }
  return `M${points.join('L')}`
}

const values = [0.12, 0.35, 0.65, 1.0, 1.4, 1.85]
const paths = values.flatMap((c) => [streamline(c, 1), streamline(c, -1)])

function Flow() {
  return (
    <svg
      className="flow"
      viewBox={`${-WIDTH} ${-HEIGHT} ${2 * WIDTH} ${2 * HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="portrait-clip">
          <circle r={R * 0.96} />
        </clipPath>
      </defs>
      <g className="streamlines">
        {paths.map((d, i) => (
          <path key={d} d={d} style={{ animationDelay: `${-(i % 6) * 0.7}s` }} />
        ))}
      </g>
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
