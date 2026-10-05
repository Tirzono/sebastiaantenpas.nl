import Flow from './Flow.tsx'
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

function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <ol className="timeline">
      {entries.map((entry) => (
        <li key={`${entry.organisation} ${entry.period}`}>
          <p className="period">{entry.period}</p>
          <h3>
            {entry.title} <span className="at">at</span> {entry.organisation}
          </h3>
          {entry.place && <p className="place">{entry.place}</p>}
          {entry.description && <p>{entry.description}</p>}
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
        <Flow />
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

        <section aria-labelledby="experience">
          <h2 id="experience">Experience</h2>
          <Timeline entries={experience} />
        </section>

        <section aria-labelledby="education">
          <h2 id="education">Education</h2>
          <Timeline entries={education} />
        </section>

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
