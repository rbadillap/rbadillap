# rbadillap — ronnybadilla.com

Personal site. Next.js (App Router) + velite (markdown as database, `content/`) + Tailwind v4. Package manager: pnpm (pinned in `packageManager`).

## Source of knowledge

**Read `DESIGN.md` (repo root) before producing anything visual or any document under this brand.** It is the brand contract and system of record; the site serves it publicly at `/design.md`. If DESIGN.md forbids something, no instinct or example overrides it.

## Map

- Tokens: `src/app/globals.css` — shadcn vocabulary, brand values; single source of truth.
- Brand primitives: `src/components/{node,rule,meta,mark}.tsx`. `src/components/ui/` is reserved for components installed via `shadcn add`.
- Content: `content/*.md` via velite (`#content` alias).
- Paper templates (frozen, pre-React): `brand/templates/`. Brand process log: `brand/process.md`.
