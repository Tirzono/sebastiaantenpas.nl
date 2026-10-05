import { useEffect, useRef, useState } from 'react'
import type { GlyphKind } from './content.ts'

// The story so far, told left to right: one drawing travels along a line as
// you scroll past, morphing from each chapter into the next. Each chapter is a
// single continuous stroke in a 100 × 100 box, entering on the left and
// leaving on the right, so the strokes can be resampled to the same number of
// points and blended.

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

const chapters: { kind: GlyphKind; name: string; year: string }[] = [
  { kind: 'sigma', name: 'BSc, Twente', year: '2009' },
  { kind: 'pizza', name: 'Takeaway.com', year: '2011' },
  { kind: 'browser', name: 'Diggi Media', year: '2013' },
  { kind: 'cap', name: 'MSc, Twente', year: '2013' },
  { kind: 'boat', name: 'MARIN', year: '2015' },
  { kind: 'turbine', name: 'NLR', year: '2015' },
  { kind: 'shield', name: 'Patchman', year: '2017' },
  { kind: 'airfoil', name: 'Aston Martin F1', year: '2019' },
  { kind: 'key', name: 'Cambridge, identity', year: '2024' },
  { kind: 'form', name: 'Cambridge, education', year: '2025' },
]

const POINTS = 180
// Drawn at 1 unit per pixel, so the drawing keeps its size on any screen
// and only the distance it travels changes.
const SIZE = 100

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

function toPath(points: [number, number][], dx: number) {
  return `M${points.map(([x, y]) => `${(x + dx).toFixed(2)} ${y.toFixed(2)}`).join('L')}`
}

const smooth = (t: number) => t * t * (3 - 2 * t)

function Story() {
  const svgRef = useRef<SVGSVGElement>(null)
  const figureRef = useRef<SVGPathElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const captionRef = useRef<SVGGElement>(null)
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(672)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    const figure = figureRef.current
    const trail = trailRef.current
    const caption = captionRef.current
    if (!svg || !figure || !trail || !caption) return
    const shapes = chapters.map((chapter) => sample(strokes[chapter.kind]))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let frame = 0
    const update = () => {
      frame = 0
      // Progress runs from the strip entering at the bottom of the screen
      // to it reaching a quarter of the way down.
      const box = svg.getBoundingClientRect()
      const start = window.innerHeight
      const end = window.innerHeight * 0.25
      const progress = Math.min(1, Math.max(0, (start - box.top) / (start - end)))

      // Hold each chapter's shape, then morph during the last 40% of the way
      // to the next one.
      const position = progress * (chapters.length - 1)
      const i = Math.min(chapters.length - 2, Math.floor(position))
      const local = position - i
      const t = reduceMotion ? Math.round(local) : smooth(Math.min(1, Math.max(0, (local - 0.6) / 0.4)))
      const from = shapes[i]
      const to = shapes[i + 1]
      const points = from.map(([x, y], j): [number, number] => [
        x + (to[j][0] - x) * t,
        y + (to[j][1] - y) * t,
      ])
      const x = progress * (width - SIZE)
      figure.setAttribute('d', toPath(points, x))
      trail.setAttribute('d', `M0 50H${(x + 10).toFixed(1)}`)
      // Keep the caption inside the strip near the edges
      const center = Math.min(width - 80, Math.max(80, x + SIZE / 2))
      caption.setAttribute('transform', `translate(${center.toFixed(1)} 0)`)
      setIndex(t < 0.5 ? i : i + 1)
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
  }, [width])

  const chapter = chapters[index]
  return (
    <svg
      ref={svgRef}
      className="story"
      viewBox={`-4 0 ${width + 8} 128`}
      role="img"
      aria-label="My story so far, from studying at Twente to the University of Cambridge"
    >
      <path className="road" d={`M0 50H${width}`} />
      <path ref={trailRef} className="trail" d="M0 50H10" />
      <path ref={figureRef} className="figure" d={strokes[chapters[0].kind]} />
      <g ref={captionRef} className="caption">
        <text className="name" y="112">
          {chapter.name}
        </text>
        <text className="year" y="125">
          {chapter.year}
        </text>
      </g>
    </svg>
  )
}

export default Story
