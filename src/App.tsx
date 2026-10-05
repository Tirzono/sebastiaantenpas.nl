import { useEffect, useRef } from 'react'
import Journey from './Journey.tsx'
import Glyph from './Glyph.tsx'
import Morph from './Morph.tsx'
import {
  education,
  experience,
  intro,
  links,
  profile,
  publications,
  skills,
  type Entry,
} from './content.ts'

const year = new Date().getFullYear()

// Marks entries as they scroll into view: the line draws down to them and
// their glyph starts animating. Glyphs pause again once off screen.
function useInView() {
  const ref = useRef<HTMLOListElement>(null)
  useEffect(() => {
    const list = ref.current
    if (!list) return
    const items = list.querySelectorAll('li.entry')
    list.classList.add('ready')
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          record.target.classList.toggle('playing', record.isIntersecting)
          if (record.isIntersecting) record.target.classList.add('seen')
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return ref
}

function Timeline({ entries }: { entries: Entry[] }) {
  const ref = useInView()
  return (
    <ol className="timeline" ref={ref}>
      {entries.map((entry) => (
        <li className="entry" key={`${entry.organisation} ${entry.period}`}>
          <Glyph kind={entry.glyph} />
          <p className="period">{entry.period}</p>
          {entry.roles ? (
            <>
              <h3>{entry.organisation}</h3>
              <ol className="roles">
                {entry.roles.map((role) => (
                  <li key={role.title}>
                    <span className="role">{role.title}</span>
                    <span className="role-period">{role.period}</span>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <h3>
              {entry.title} <span className="at">at</span> {entry.organisation}
            </h3>
          )}
          {entry.place && <p className="place">{entry.place}</p>}
          {entry.description && <p>{entry.description}</p>}
          {entry.link && (
            <p>
              <a href={entry.link.url}>{entry.link.label}</a>
            </p>
          )}
          {entry.tags && (
            <ul className="tags">
              {entry.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}

function App() {
  return (
    <>
      <header className="hero">
        <Journey />
        <div className="hero-text">
          <h1>
            Sebastiaan <span className="marker">ten Pas</span>
          </h1>
          <p className="headline">{profile.headline}</p>
          <p className="location">{profile.location}</p>
        </div>
      </header>

      <main>
        <section className="intro" aria-label="Introduction">
          {intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <div className="history">
          <Morph />
          <section aria-labelledby="experience">
            <h2 id="experience">Experience</h2>
            <Timeline entries={experience} />
          </section>

          <section aria-labelledby="education">
            <h2 id="education">Education</h2>
            <Timeline entries={education} />
          </section>
        </div>

        <section aria-labelledby="publications">
          <h2 id="publications">Publication</h2>
          {publications.map((publication) => (
            <p key={publication.url} className="publication">
              <a href={publication.url}>{publication.title}</a>
              <br />
              <span>
                {publication.authors}. {publication.venue}.
              </span>
            </p>
          ))}
        </section>

        <section aria-labelledby="skills">
          <h2 id="skills">Skills</h2>
          <dl className="skills">
            <dt>Programming</dt>
            <dd>{skills.programming.join(', ')}</dd>
            <dt>Tools</dt>
            <dd>{skills.tools.join(', ')}</dd>
            <dt>Languages</dt>
            <dd>{skills.languages.join(', ')}</dd>
          </dl>
        </section>
      </main>

      <footer>
        <ul className="links">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
        </ul>
        <p className="copyright">
          © {year} {profile.name}
        </p>
      </footer>
    </>
  )
}

export default App
