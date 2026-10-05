// Everything the page says lives here, so updating the site means editing this
// file only. Lines marked TODO are placeholders: rewrite them in your own words.

export const profile = {
  name: 'Sebastiaan ten Pas',
  // TODO: your role, in a few words.
  tagline: 'Developer at Diggi Media',
  location: 'United Kingdom',
  avatar: 'https://avatars.githubusercontent.com/u/8750041?s=320',
}

// TODO: a short introduction, one paragraph per entry.
export const about = [
  'I build web applications and the infrastructure they run on, from Django and React front to back, down to the Kubernetes clusters and Terraform that host them.',
  'Through Diggi Media I help businesses get their websites and web apps built and running.',
]

export type Project = {
  name: string
  description: string
  url: string
  tags: string[]
}

// Public repositories only. Add or reorder as you like.
export const projects: Project[] = [
  {
    name: 'helm-charts',
    description:
      'A multi-chart Helm repository, published to GitHub Pages and as OCI charts on GHCR on every merge.',
    url: 'https://github.com/Tirzono/helm-charts',
    tags: ['Helm', 'Kubernetes'],
  },
  {
    name: 'docker-images',
    description:
      'Container images published to GHCR, such as GitHub Actions runners with the extras CI jobs need.',
    url: 'https://github.com/Tirzono/docker-images',
    tags: ['Docker', 'CI'],
  },
  {
    name: 'github-actions',
    description: 'Reusable composite GitHub Actions shared across my projects.',
    url: 'https://github.com/Tirzono/github-actions',
    tags: ['GitHub Actions'],
  },
  {
    name: 'sebastiaantenpas.nl',
    description:
      'This website: React, TypeScript and Vite on Cloudflare Pages, with the infrastructure in Terraform.',
    url: 'https://github.com/Tirzono/sebastiaantenpas.nl',
    tags: ['React', 'Cloudflare'],
  },
]

export type Link = {
  label: string
  url: string
}

export const links: Link[] = [
  { label: 'GitHub', url: 'https://github.com/Tirzono' },
  { label: 'Diggi Media', url: 'https://www.diggimedia.nl' },
  // TODO: add LinkedIn or others, or remove the email if you'd rather not list it.
  { label: 'Email', url: 'mailto:sebastiaan@diggimedia.nl' },
]
