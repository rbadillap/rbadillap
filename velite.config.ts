import { defineCollection, defineConfig, s } from "velite"

const home = defineCollection({
  name: "Home",
  pattern: "home.md",
  single: true,
  schema: s.object({
    name: s.string(),
    tagline: s.string(),
    services: s.array(
      s.object({
        title: s.string(),
        description: s.string(),
      }),
    ),
    newsletterText: s.string(),
    elsewhere: s.array(
      s.object({
        label: s.string(),
        href: s.string(),
      }),
    ),
    // the "Now" section: the document body, kept as raw markdown so the
    // renderer can decorate it (ExternalLink styling, SynerMark rule)
    now: s.raw(),
  }),
})

const experience = defineCollection({
  name: "Experience",
  pattern: "experience/*.md",
  schema: s.object({
    company: s.string(),
    role: s.string(),
    year: s.string(),
  }),
})

const projects = defineCollection({
  name: "Project",
  pattern: "projects/*.md",
  schema: s.object({
    title: s.string(),
    url: s.string().url().optional(),
    active: s.boolean().default(true),
    order: s.number(),
    // the description is the document body
    description: s.raw(),
  }),
})

export default defineConfig({
  root: "content",
  collections: { home, experience, projects },
})
