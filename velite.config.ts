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
    // an absolute URL, or a path on this site ("/checklist")
    url: s
      .string()
      .regex(/^(https?:\/\/|\/)/, "url must be absolute or a site path")
      .optional(),
    active: s.boolean().default(true),
    order: s.number(),
    // the description is the document body
    description: s.raw(),
  }),
})

const checklist = defineCollection({
  name: "Checklist",
  pattern: "checklist.md",
  single: true,
  schema: s.object({
    title: s.string(),
    tagline: s.string(),
    // the document body is the prompt's preamble; the sections are
    // appended to it as markdown at build time (see app/checklist)
    prompt: s.raw(),
  }),
})

const checklistSections = defineCollection({
  name: "ChecklistSection",
  pattern: "checklist/*.md",
  schema: s.object({
    title: s.string(),
    slug: s.slug("checklistSections"),
    order: s.number(),
    // one string per item; inline markdown (links) allowed
    items: s.array(s.string().min(1)).min(1),
  }),
})

export default defineConfig({
  root: "content",
  collections: { home, experience, projects, checklist, checklistSections },
})
