import { about, links, profile, projects } from './content.ts'

const year = new Date().getFullYear()

function App() {
  return (
    <main>
      <header className="intro">
        <img className="avatar" src={profile.avatar} alt="" width={128} height={128} />
        <div>
          <h1>{profile.name}</h1>
          <p className="tagline">{profile.tagline}</p>
          <p className="location">{profile.location}</p>
        </div>
      </header>

      <section aria-labelledby="about">
        <h2 id="about">About</h2>
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section aria-labelledby="projects">
        <h2 id="projects">Projects</h2>
        <ul className="projects">
          {projects.map((project) => (
            <li key={project.name}>
              <a href={project.url}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <ul className="tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <nav aria-label="Elsewhere">
          <ul className="links">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="copyright">
          © {year} {profile.name}
        </p>
      </footer>
    </main>
  )
}

export default App
