import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { profile } from './content.ts'

// One line that draws itself from the first year at university to today,
// turning into a small drawing for each chapter along the way. Each chapter
// sits in a 100 × 100 cell and says where the line enters and leaves it.
// Paths in `ink` are drawn in order; `extra` holds parts that fade in once the
// chapter is drawn and then keep moving (see .journey in index.css).

type Chapter = {
  name: string
  year: string
  enter: [number, number]
  exit?: [number, number]
  ink: string[]
  extra?: ReactNode
}

const chapters: Chapter[] = [
  {
    name: 'BSc, Twente',
    year: '2009',
    enter: [10, 50],
    exit: [90, 50],
    ink: ['M10 50C20 50 24 26 36 26H64', 'M36 26L52 48 36 70H64C74 70 80 50 90 50'],
  },
  {
    name: 'Takeaway.com',
    year: '2011',
    enter: [10, 50],
    exit: [90, 50],
    ink: [
      'M10 50C18 50 30 52 39 52',
      'M39 52L28 30Q50 18 72 30L50 74Z',
      'M31 36Q50 26 69 36',
      'M61 52C70 52 80 50 90 50',
    ],
    extra: (
      <>
        <g className="toppings">
          <circle cx="44" cy="42" r="3.2" />
          <circle cx="56" cy="44" r="3.2" />
          <circle cx="50" cy="56" r="2.6" />
        </g>
        <g className="steam">
          <path d="M44 16c-3-3 3-5 0-9" />
          <path d="M56 16c-3-3 3-5 0-9" />
        </g>
      </>
    ),
  },
  {
    name: 'Diggi Media',
    year: '2013',
    enter: [10, 50],
    exit: [90, 50],
    ink: [
      'M10 50H26',
      'M26 50V30a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v36a4 4 0 0 1-4 4H30a4 4 0 0 1-4-4z',
      'M26 37H74',
      'M74 50H90',
    ],
    extra: (
      <g className="typing">
        <path d="M33 46H63" />
        <path d="M33 54H55" />
        <path d="M33 62H59" />
      </g>
    ),
  },
  {
    name: 'MSc, Twente',
    year: '2013',
    enter: [10, 50],
    exit: [90, 50],
    ink: [
      'M10 50C18 50 20 40 26 40',
      'M26 40L50 30 74 40 50 50Z',
      'M36 45V58c0 7 28 7 28 0V45',
      'M74 40C82 40 84 50 90 50',
    ],
    extra: (
      <g className="tassel">
        <path d="M74 40V57" />
        <circle cx="74" cy="59" r="2" />
      </g>
    ),
  },
  {
    name: 'MARIN',
    year: '2015',
    enter: [10, 64],
    exit: [90, 64],
    ink: ['M10 64q5-5 10 0t10 0 10 0 10 0 10 0 10 0 10 0 10 0'],
    extra: (
      <g className="boat">
        <path d="M32 54H68L62 61H38Z" />
        <path d="M50 54V22" />
        <path d="M50 25L67 49H50" />
      </g>
    ),
  },
  {
    name: 'NLR',
    year: '2015',
    enter: [10, 50],
    exit: [90, 50],
    ink: ['M10 50C24 50 30 76 44 76H56', 'M50 76V40', 'M56 76C70 76 76 50 90 50'],
    extra: (
      <g className="rotor">
        {/* An invisible ring centres the rotor's box on the hub, so it spins around it */}
        <circle className="hub-ring" cx="50" cy="37" r="25" />
        <circle cx="50" cy="37" r="3" />
        <path d="M50 34V13M52.6 38.5 70.8 49M47.4 38.5 29.2 49" />
      </g>
    ),
  },
  {
    name: 'Patchman',
    year: '2017',
    enter: [10, 50],
    exit: [90, 50],
    ink: [
      'M10 50C18 50 22 46 28 46',
      'M28 46V28L50 20 72 28V46C72 62 62 72 50 78 38 72 28 62 28 46',
      'M72 46C78 46 82 50 90 50',
    ],
    extra: <path className="tick" pathLength={1} d="M40 48L47 55 61 40" />,
  },
  {
    name: 'Aston Martin F1',
    year: '2019',
    enter: [10, 50],
    exit: [90, 50],
    ink: ['M10 50C30 50 34 34 50 34 64 34 72 46 90 50', 'M30 56C40 46 62 46 78 54 62 58 44 60 30 56Z'],
    extra: (
      <g className="airflow">
        <path d="M10 38C30 38 34 22 50 22 66 22 74 34 90 38" />
        <path d="M10 68C30 68 40 70 52 68 66 66 76 62 90 64" />
      </g>
    ),
  },
  {
    name: 'Cambridge, identity',
    year: '2024',
    enter: [10, 50],
    exit: [90, 50],
    ink: ['M10 50H24', 'M24 50a11 11 0 1 0 22 0 11 11 0 1 0-22 0', 'M46 50H90', 'M72 50v9M63 50v6'],
    extra: <circle className="ping" cx="35" cy="50" r="3.5" />,
  },
  {
    name: 'Cambridge, admissions',
    year: '2025',
    enter: [10, 50],
    exit: [90, 50],
    ink: [
      'M10 50H30',
      'M30 50V24H62L70 32V76H30Z',
      'M62 24V32H70',
      'M36 40h6v6h-6zM36 56h6v6h-6zM48 43H63M48 59H60',
      'M70 50H90',
    ],
    extra: (
      <g className="ticks">
        <path pathLength={1} d="M37 43l2 2 4-4" />
        <path pathLength={1} d="M37 59l2 2 4-4" />
      </g>
    ),
  },
  {
    name: 'Now',
    year: '',
    enter: [0, 50],
    ink: ['M0 50H13a37 37 0 1 0 74 0 37 37 0 1 0-74 0'],
  },
]

const CELL = 100
const ROW = 124
const INK_TIME = 0.55
const LINK_TIME = 0.25

// Wide screens get the whole journey on one line; narrower ones wrap it.
function useColumns() {
  const pick = () => (window.innerWidth >= 960 ? 11 : window.innerWidth >= 600 ? 6 : 4)
  const [columns, setColumns] = useState(pick)
  useEffect(() => {
    const update = () => setColumns(pick())
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return columns
}

function Journey() {
  const columns = useColumns()
  const rows = Math.ceil(chapters.length / columns)
  const origin = (i: number) => [(i % columns) * CELL, Math.floor(i / columns) * ROW]

  // Lay out the drawing order: each chapter's ink, then the link to the next.
  let time = 0.2
  const parts: ReactNode[] = []
  chapters.forEach((chapter, i) => {
    const [x, y] = origin(i)
    const start = time
    const ink = chapter.ink.map((d, j) => {
      const delay = start + (j * INK_TIME) / chapter.ink.length
      return (
        <path
          key={d}
          className="ink"
          pathLength={1}
          d={d}
          style={{ animationDelay: `${delay}s`, animationDuration: `${INK_TIME}s` }}
        />
      )
    })
    time += INK_TIME
    const isNow = i === chapters.length - 1
    parts.push(
      <g
        key={chapter.name}
        className="chapter"
        transform={`translate(${x} ${y})`}
        style={{ '--start': `${time}s` } as CSSProperties}
      >
        {isNow && (
          <>
            <clipPath id="journey-portrait">
              <circle cx="50" cy="50" r="34" />
            </clipPath>
            <image
              className="portrait"
              href={profile.portrait}
              x="16"
              y="16"
              width="68"
              height="68"
              clipPath="url(#journey-portrait)"
            />
          </>
        )}
        {ink}
        {chapter.extra && <g className="extra">{chapter.extra}</g>}
        <text className="name" x="50" y={isNow ? 100 : 92}>
          {chapter.name}
        </text>
        {chapter.year && (
          <text className="year" x="50" y="102">
            {chapter.year}
          </text>
        )}
      </g>,
    )

    const next = chapters[i + 1]
    if (next && chapter.exit) {
      const [nx, ny] = origin(i + 1)
      const a = [x + chapter.exit[0], y + chapter.exit[1]]
      const b = [nx + next.enter[0], ny + next.enter[1]]
      // Same row: a short curve. New row: down below the labels and back to
      // the start of the next row, like a carriage return.
      const below = y + 110
      const d =
        ny === y
          ? `M${a}C${a[0] + 10} ${a[1]} ${b[0] - 10} ${b[1]} ${b}`
          : `M${a}C${a[0] + 14} ${a[1]} ${a[0] + 14} ${below} ${a[0] - 6} ${below}` +
            `H${b[0] + 6}C${b[0] - 14} ${below} ${b[0] - 14} ${b[1]} ${b}`
      parts.push(
        <path
          key={`link-${i}`}
          className="ink"
          pathLength={1}
          d={d}
          style={{ animationDelay: `${time}s`, animationDuration: `${LINK_TIME}s` }}
        />,
      )
      time += LINK_TIME
    }
  })

  return (
    <svg
      className="journey"
      viewBox={`-4 -4 ${columns * CELL + 8} ${rows * ROW + 4}`}
      role="img"
      aria-label="My journey so far, drawn as one line from university to Cambridge"
    >
      {parts}
    </svg>
  )
}

export default Journey
