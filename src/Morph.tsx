import { useEffect, useRef } from 'react'
import { education, experience, type GlyphKind } from './content.ts'

// A larger drawing beside the timeline that morphs from one chapter to the
// next as you scroll past the entries. Each chapter is one continuous stroke
// in a 100 × 100 box, entering on the left and leaving on the right, so the
// strokes can be resampled to the same number of points and blended.

const strokes: Record<GlyphKind, string> = {
  form: 'M10 50H30V24H62L70 32V76H30V50H38L43 55 53 44V50H90',
  key: 'M10 50H24a11 11 0 1 1 22 0 11 11 0 1 1-22 0 11 11 0 1 1 22 0H63v6-6h9v9-9H90',
  airfoil: 'M10 56H30C40 46 62 46 78 54 62 58 44 60 30 56 40 42 64 36 90 44',
  shield: 'M10 50C18 50 22 46 28 46V28L50 20 72 28V46C72 62 62 72 50 78 38 72 28 62 28 46L40 48 47 55 61 40C70 34 80 50 90 50',
  browser: 'M10 50H26V30a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v36a4 4 0 0 1-4 4H30a4 4 0 0 1-4-4V37H74V50H90',
  turbine: 'M10 50C24 50 30 76 44 76H50V37L50 13 50 37 70.8 49 50 37 29.2 49 50 37V76H56C70 76 76 50 90 50',
  boat: 'M10 64q5-5 10 0t10 0L38 61H62L68 54H50V22L67 48H50V54H32L38 61H62L70 64q5-5 10 0t10 0',
  pizza: 'M10 50C18 50 30 52 39 52L28 30Q50 18 72 30L50 74 39 52 50 74 61 52C70 52 80 50 90 50',
  cap: 'M10 50C18 50 20 40 26 40L50 30 74 40 50 50 26 40 36 45V58C36 65 64 65 64 58V45L74 40V57 40C82 40 84 50 90 50',
  sigma: 'M10 50C20 50 24 26 36 26H64 36L52 48 36 70H64C74 70 80 50 90 50',
}

const POINTS = 180
const order = [...experience, ...education].map((entry) => entry.glyph)

// Resample a path into evenly spaced points along its length.
function sample(d: string): [number, number][] {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', d)
  const length = path.getTotalLength()
  return Array.from({ length: POINTS }, (_, i) => {
    const point = path.getPointAtLength((length * i) / (POINTS - 1))
    return [point.x, point.y]
  })
}

function toPath(points: [number, number][]) {
  return `M${points.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join('L')}`
}

const smooth = (t: number) => t * t * (3 - 2 * t)

function Morph() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const path = pathRef.current
    const entries = document.querySelectorAll<HTMLElement>('.history li.entry')
    if (!path || entries.length !== order.length) return
    const shapes = order.map((kind) => sample(strokes[kind]))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let frame = 0
    const update = () => {
      frame = 0
      // The entry whose top has passed 45% of the viewport is the current one;
      // the drawing holds its shape, then morphs over the last third of the
      // way to the next entry.
      const anchor = window.innerHeight * 0.45
      const tops = Array.from(entries, (entry) => entry.getBoundingClientRect().top)
      let i = 0
      while (i < tops.length - 1 && tops[i + 1] <= anchor) i++
      let t = 0
      if (i < tops.length - 1 && tops[i] <= anchor) {
        const progress = (anchor - tops[i]) / (tops[i + 1] - tops[i])
        t = reduceMotion ? 0 : smooth(Math.min(1, Math.max(0, (progress - 0.66) / 0.34)))
      }
      const from = shapes[i]
      const to = shapes[Math.min(i + 1, shapes.length - 1)]
      const points = from.map(([x, y], j): [number, number] => [
        x + (to[j][0] - x) * t,
        y + (to[j][1] - y) * t,
      ])
      path.setAttribute('d', toPath(points))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="morph-rail" aria-hidden="true">
      <svg className="morph" viewBox="0 0 100 100">
        <path ref={pathRef} d={strokes[order[0]]} />
      </svg>
    </div>
  )
}

export default Morph
