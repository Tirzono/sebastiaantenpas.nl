// Everything the page says lives here, so updating the CV means editing this
// file only.

export const profile = {
  name: 'Sebastiaan ten Pas',
  headline: 'Full-stack software engineer and team lead',
  location: 'United Kingdom',
  portrait: '/portrait.jpg',
}

export const intro = [
  "I'm a full-stack software engineer with a strong mathematical background. I lead two development teams at the University of Cambridge, looking after undergraduate admissions and education services, and alongside that I run Diggi Media, building websites and apps for small businesses.",
  'I studied mechanical engineering, which is how I spent five years writing visualisation tools for the aerodynamicists at Aston Martin F1. These days the only things flowing are CI pipelines.',
]

// The small animated illustration next to each entry, drawn in Glyph.tsx.
export type GlyphKind =
  | 'form'
  | 'key'
  | 'airfoil'
  | 'shield'
  | 'browser'
  | 'turbine'
  | 'boat'
  | 'pizza'
  | 'cap'
  | 'sigma'

// A step within one organisation, for promotions that share the same work.
export type Role = {
  title: string
  period: string
}

export type Entry = {
  glyph: GlyphKind
  period: string
  // Either a single title, or the roles held there in order (newest first).
  title?: string
  roles?: Role[]
  organisation: string
  place?: string
  description?: string
  link?: { label: string; url: string }
  tags?: string[]
}

export const experience: Entry[] = [
  {
    glyph: 'form',
    period: 'October 2025 – present',
    title: 'Software Developer Manager',
    organisation: 'University of Cambridge',
    place: 'University Information Services, DevOps Division',
    description:
      'Lead the Hopper and Hamilton teams. Hopper builds and runs undergraduate admissions, including My Cambridge Application and Digital Pooling; Hamilton looks after education services such as teaching space scheduling, lab allocation and lecture capture preferences.',
    link: { label: 'My work on the University’s GitLab', url: 'https://gitlab.developers.cam.ac.uk/st981' },
  },
  {
    glyph: 'key',
    period: 'July 2024 – November 2025',
    title: 'Senior Software Developer',
    organisation: 'University of Cambridge',
    place: 'University Information Services, DevOps Division',
    description:
      'Developer in the Wilson team, responsible for identity and access management across the University, from account activation to the services and libraries around it.',
    tags: ['Python', 'Django', 'Terraform', 'Google Cloud', 'GitLab CI'],
  },
  {
    glyph: 'airfoil',
    period: 'April 2019 – July 2024',
    roles: [
      { title: 'Senior CFD Software Developer', period: 'April 2021 – July 2024' },
      { title: 'CFD Software Developer', period: 'April 2019 – April 2021' },
    ],
    organisation: 'Aston Martin F1',
    place: 'Silverstone, United Kingdom',
    description:
      'Developed the aerodynamics department’s post-processing and visualisation software, including an in-house visualisation tool I created from scratch. Raised the team’s engineering standards, from automated delivery to code quality, and helped grow the developers around me.',
    tags: ['Python', 'TypeScript', 'Rust', 'Go', 'Django', 'React', 'WebGL'],
  },
  {
    glyph: 'shield',
    period: 'March 2017 – March 2019',
    title: 'Software Engineer',
    organisation: 'Patchman',
    place: 'Enschede, the Netherlands',
    description:
      'Worked on internal back-end services and the Django web applications used by staff, customers and their end users. Later also Scrum Master for a small team of developers.',
    tags: ['Python', 'Django', 'Vue.js', 'PostgreSQL', 'Docker'],
  },
  {
    glyph: 'browser',
    period: 'September 2013 – present',
    title: 'Founder and Digital Director',
    organisation: 'Diggi Media',
    place: 'Enschede, the Netherlands',
    description:
      'Websites and mobile apps for small businesses, from WordPress sites to containerised web applications in the cloud.',
    tags: ['Python', 'TypeScript', 'React', 'Kubernetes', 'Terraform'],
  },
  {
    glyph: 'turbine',
    period: 'September 2015 – June 2016',
    title: 'Graduate intern',
    organisation: 'NLR, Netherlands Aerospace Centre',
    place: 'Amsterdam, the Netherlands',
    description:
      "Validated NLR's CFD methods for wind turbine flows against the MEXICO wind tunnel experiments, which led to the paper below.",
  },
  {
    glyph: 'boat',
    period: 'April 2015 – July 2015',
    title: 'Intern',
    organisation: 'MARIN, Maritime Research Institute Netherlands',
    place: 'Wageningen, the Netherlands',
    description:
      'Studied how near-wall grid resolution with wall functions affects RANS predictions of resistance and flow around a KVLCC2 tanker.',
  },
  {
    glyph: 'pizza',
    period: 'February 2011 – December 2014',
    title: 'Web Application Developer',
    organisation: 'Takeaway.com',
    place: 'Enschede, the Netherlands',
    description:
      'Started in customer care and moved into development, proposing and building internal tools that automated much of the data entry and were rolled out across the company.',
  },
]

export const education: Entry[] = [
  {
    glyph: 'cap',
    period: '2013 – 2016',
    title: 'MSc Mechanical Engineering',
    organisation: 'University of Twente',
    description: 'Specialisation in Engineering Fluid Dynamics.',
  },
  {
    glyph: 'sigma',
    period: '2009 – 2013',
    title: 'BSc Mechanical Engineering',
    organisation: 'University of Twente',
    description: 'Minor in Applied Mathematics.',
  },
]

export const publications = [
  {
    title: 'Wind Turbine Aerodynamics from an Aerospace Perspective',
    venue: 'AIAA Wind Energy Symposium, 2018',
    authors: 'A. van Garrel, S. ten Pas, C. H. Venner, J. van Muijden',
    url: 'https://doi.org/10.2514/6.2018-0991',
  },
]

export const skills = {
  programming: ['Python', 'TypeScript', 'Rust', 'Go', 'PHP', 'SQL', 'Bash'],
  tools: [
    'Django',
    'React',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'Terraform',
    'Google Cloud',
    'Cloudflare',
  ],
  languages: ['Dutch (native)', 'English (full professional)'],
}

export type Link = {
  label: string
  url: string
}

export const links: Link[] = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sebastiaantenpas/' },
  { label: 'GitHub', url: 'https://github.com/Tirzono' },
  { label: 'Email', url: 'mailto:info@sebastiaantenpas.nl' },
]
