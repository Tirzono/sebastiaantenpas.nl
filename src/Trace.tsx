import { useEffect, useRef } from 'react'
import { education, experience, type GlyphKind } from './content.ts'

// One long line beside the timeline that draws itself as you scroll: the
// chapters sit side by side, oldest on the left, and a window onto the line
// follows the entry you are reading. Moving down the timeline goes back in
// time, so the line draws on to the left and erases behind it on the right.
// Each chapter is one continuous stroke in a 100 × 100 box, entering on the
// left and leaving on the right.

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

// Oldest first, so the line reads left to right in time.
const timeline = [...experience, ...education].map((entry) => entry.glyph)
const line = [...timeline].reverse()

// Turn the chapters into one polyline, with each chapter's start and end
// measured as a distance along it.
function build() {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  const points: string[] = []
  const spans: [number, number][] = []
  let length = 0
  let last: [number, number] | null = null
  line.forEach((kind, i) => {
    path.setAttribute('d', strokes[kind])
    const total = path.getTotalLength()
    const steps = Math.ceil(total / 1.5)
    let start = 0
    for (let s = 0; s <= steps; s++) {
      const point = path.getPointAtLength((total * s) / steps)
      const here: [number, number] = [point.x + i * 100, point.y]
      if (last) length += Math.hypot(here[0] - last[0], here[1] - last[1])
      if (s === 0) start = length
      points.push(`${here[0].toFixed(2)} ${here[1].toFixed(2)}`)
      last = here
    }
    spans.push([start, length])
  })
  return { d: `M${points.join('L')}`, spans, length }
}

const smooth = (t: number) => t * t * (3 - 2 * t)

function Trace() {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const path = pathRef.current
    const entries = document.querySelectorAll<HTMLElement>('li.entry')
    if (!svg || !path || entries.length !== timeline.length) return
    const { d, spans, length } = build()
    path.setAttribute('d', d)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let frame = 0
    const update = () => {
      frame = 0
      // The entry whose top has passed 45% of the viewport is the current one.
      // The line rests on its chapter, then draws on to the next one over the
      // last 70% of the way there.
      const anchor = window.innerHeight * 0.45
      const tops = Array.from(entries, (entry) => entry.getBoundingClientRect().top)
      let k = 0
      while (k < tops.length - 1 && tops[k + 1] <= anchor) k++
      let t = 0
      if (k < tops.length - 1 && tops[k] <= anchor) {
        const progress = (anchor - tops[k]) / (tops[k + 1] - tops[k])
        const eased = smooth(Math.min(1, Math.max(0, (progress - 0.3) / 0.7)))
        t = reduceMotion ? Math.round(eased) : eased
      }
      // Timeline entry k is chapter j on the line; the next entry is one to the left.
      const j = line.length - 1 - k
      const to = Math.max(0, j - 1)
      const start = spans[j][0] + (spans[to][0] - spans[j][0]) * t
      const end = spans[j][1] + (spans[to][1] - spans[j][1]) * t
      path.style.strokeDasharray = `${(end - start).toFixed(1)} ${length.toFixed(0)}`
      path.style.strokeDashoffset = `${(-start).toFixed(1)}`
      const center = (j - (j - to) * t) * 100 + 50
      svg.setAttribute('viewBox', `${(center - 60).toFixed(1)} -10 120 120`)
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
    <div className="trace-rail" aria-hidden="true">
      <svg ref={svgRef} className="trace" viewBox="-10 -10 120 120">
        <path ref={pathRef} />
      </svg>
    </div>
  )
}

export default Trace
