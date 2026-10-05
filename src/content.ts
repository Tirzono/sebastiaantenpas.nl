// Everything the page says lives here, so updating the CV means editing this
// file only. Text in [square brackets] and lines marked TODO are placeholders.

export const profile = {
  name: 'Sebastiaan ten Pas',
  headline: 'Software engineer with a background in fluid dynamics',
  location: 'United Kingdom',
  portrait: '/portrait.jpg',
}

// TODO: check this reads like you, especially the last sentence.
export const intro = [
  'I studied mechanical engineering at the University of Twente, specialising in computational fluid dynamics, and then turned the code into the main event. At Aston Martin F1 I built the post-processing and visualisation tools that turn simulations and wind tunnel data into something aerodynamicists can see.',
  'Alongside that I run Diggi Media, building websites and apps for small businesses, and I enjoy looking after the infrastructure they run on.',
]

export type Entry = {
  period: string
  title: string
  organisation: string
  place?: string
  description?: string
  tags?: string[]
}

export const experience: Entry[] = [
  {
    // TODO: your current role at Cambridge, taken from your LinkedIn headline.
    period: '[Start date] – present',
    title: '[Role]',
    organisation: 'University of Cambridge',
    place: 'Cambridge, United Kingdom',
    description: '[A sentence or two about what you do there.]',
  },
  {
    // TODO: set the end date if you have left.
    period: 'April 2019 – [end date]',
    title: 'Senior CFD Software Developer',
    organisation: 'Aston Martin F1',
    place: 'Silverstone, United Kingdom',
    description:
      'Built and maintained post-processing and visualisation tools for the aerodynamics department, including an in-house visualisation tool I developed from scratch. Introduced CI/CD pipelines and code quality standards, and mentored junior colleagues and new starters.',
    tags: ['Python', 'TypeScript', 'Rust', 'Go', 'Django', 'React', 'WebGL'],
  },
  {
    period: 'March 2017 – March 2019',
    title: 'Software Engineer',
    organisation: 'Patchman',
    place: 'Enschede, the Netherlands',
    description:
      'Worked on internal back-end services and the Django web applications used by staff, customers and their end users. Later also Scrum Master for a small team of developers.',
    tags: ['Python', 'Django', 'Vue.js', 'PostgreSQL', 'Docker'],
  },
  {
    period: 'September 2013 – present',
    title: 'Founder and Digital Director',
    organisation: 'Diggi Media',
    place: 'Enschede, the Netherlands',
    description:
      'Websites and mobile apps for small businesses, from WordPress sites to containerised web applications in the cloud. I also handle the finances and keep in touch with clients.',
    tags: ['Python', 'TypeScript', 'React', 'Kubernetes', 'Terraform'],
  },
  {
    period: 'September 2015 – June 2016',
    title: 'Graduate intern',
    organisation: 'NLR, Netherlands Aerospace Centre',
    place: 'Amsterdam, the Netherlands',
    description:
      "Validated NLR's CFD methods for wind turbine flows against the MEXICO wind tunnel experiments, which led to the paper below.",
  },
  {
    period: 'April 2015 – July 2015',
    title: 'Intern',
    organisation: 'MARIN, Maritime Research Institute Netherlands',
    place: 'Wageningen, the Netherlands',
    description:
      'Studied how near-wall grid resolution with wall functions affects RANS predictions of resistance and flow around a KVLCC2 tanker.',
  },
  {
    period: 'February 2011 – December 2014',
    title: 'Web Application Developer',
    organisation: 'Takeaway.com',
    place: 'Enschede, the Netherlands',
    description:
      'Started in customer care and moved into development, building internal tools such as one that cut data entry time by more than 92% and was used across the company.',
  },
]

export const education: Entry[] = [
  {
    period: '2013 – 2016',
    title: 'MSc Mechanical Engineering',
    organisation: 'University of Twente',
    description: 'Specialisation in Engineering Fluid Dynamics.',
  },
  {
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
  tools: ['Django', 'React', 'WebGL', 'PostgreSQL', 'Docker', 'Kubernetes', 'Terraform'],
  languages: ['Dutch (native)', 'English (full professional)'],
}

export type Link = {
  label: string
  url: string
}

export const links: Link[] = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sebastiaantenpas/' },
  { label: 'GitHub', url: 'https://github.com/Tirzono' },
  // TODO: the address you want people to use.
  { label: 'Email', url: 'mailto:sebastiaan@diggimedia.nl' },
]
