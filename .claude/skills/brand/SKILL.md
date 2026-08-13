---
name: brand
description: Generate client documents (proposals, quotes, resumes) under the rbadillap brand system. Use whenever producing or editing a proposal, quote, resume, or any document that carries Ronny Badilla's name.
---

# rbadillap brand — document generation

You are generating a document under Ronny Badilla's brand system. The
system is designed so that you, without having seen any previous document,
produce an on-brand result. Follow this sequence exactly.

## Sequence

1. **Read the contract**: `brand/DESIGN.md` (repo root of
   ~/apps/rbadillap). It defines the visual system, the published
   grammar, the rejected reflexes, and the judgment checklist. The
   contract outranks any instinct or example you carry.
2. **Copy the template** — never start from scratch:
   - Proposal or quote: `brand/templates/proposal.html`
   - Resume: `brand/templates/resume.html`
3. **Fill content only.** Replace `{{slots}}` and example blocks.
   Compose freely with the published patterns (`.section-label`,
   `.data-table`, `.rows`, `.cards`, `.gate-flow`, `.memo`, `.callout`,
   `.footer`, diagrams per the contract). Do not invent classes, colors,
   fonts, or sizes. Do not fill `--accent`.
4. **Fonts**: templates resolve fonts at `../fonts/`. If the document
   lives outside `brand/templates/`, fix the two `@font-face` src paths
   to reach `~/apps/rbadillap/brand/fonts/` (or copy the woff2 files next
   to the document).
5. **Inspect privately** with the judgment checklist at the end of
   DESIGN.md before delivering. Proposal pages have fixed 11in height —
   verify nothing clips.

## After generating

If the work surfaced a gap in the system (a pattern the templates lack, a
rule the contract doesn't cover), do not improvise a fix inside the
document. Note the gap explicitly to Ronny and record it in
`brand/process.md` under "Pendientes registrados".
