/**
 * Seeds payload.db with the content that used to be hardcoded in page.tsx.
 * Run with: pnpm payload run src/seed.ts
 * Safe to re-run: wipes and recreates experience/projects, upserts the home global.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config })

const paragraph = (children: unknown[]) => ({
  type: 'paragraph',
  children,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

const text = (t: string) => ({
  type: 'text',
  text: t,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const link = (url: string, children: unknown[]) => ({
  type: 'link',
  children,
  direction: 'ltr' as const,
  fields: { url, newTab: true, linkType: 'custom' },
  format: '' as const,
  indent: 0,
  version: 2,
})

const now = {
  root: {
    type: 'root',
    children: [
      paragraph([
        text(
          "I've worked for years helping build great products, from startups to enterprises. Now it's my turn to achieve my dreams.",
        ),
      ]),
      paragraph([
        text('Building '),
        link('https://syner.app', [text('Syner')]),
        text(' — the Agentic Operating System.'),
      ]),
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
}

await payload.delete({ collection: 'experience', where: { id: { exists: true } } })
await payload.delete({ collection: 'projects', where: { id: { exists: true } } })

for (const [order, item] of [
  { company: 'SynerOps', role: 'Founder', year: '2025' },
  { company: 'Automattic', role: 'Platform Engineer', year: '2023' },
  { company: 'FedRAMP.gov', role: 'Solutions Architect', year: '2022' },
].entries()) {
  await payload.create({ collection: 'experience', data: { ...item, order } })
}

for (const [order, item] of [
  {
    title: 'registry.directory',
    url: 'https://registry.directory',
    description: 'Discover and explore UI registries.',
    active: true,
  },
  {
    title: 'pastecn.com',
    url: 'https://pastecn.com',
    description: 'pastebin + shadcn = pastecn.',
    active: true,
  },
  {
    title: 'registry.studio',
    description: 'Advanced visual registry builder.',
    active: false,
  },
].entries()) {
  await payload.create({ collection: 'projects', data: { ...item, order } })
}

await payload.updateGlobal({
  slug: 'home',
  data: {
    name: 'Ronny Badilla',
    tagline: 'Design / DevOps / AI Engineer',
    now,
    services: [
      {
        title: 'Cloud & DevOps',
        description: 'AWS architecture, infrastructure automation, and CI/CD pipelines.',
      },
      {
        title: 'AI Solutions',
        description: 'LLM integration, RAG systems, and AI-powered tools.',
      },
    ],
    newsletterText: 'Occasional notes on design, infrastructure, and AI. No spam.',
    elsewhere: [
      { label: 'X', href: 'https://x.com/rbadillap' },
      { label: 'GitHub', href: 'https://github.com/rbadillap' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/rbadillap' },
      { label: 'Mail', href: 'mailto:info@ronnybadilla.com' },
    ],
  },
})

payload.logger.info('Seed complete.')
process.exit(0)
