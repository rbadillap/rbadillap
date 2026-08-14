# rbadillap design contract — v3.1

**Version 3.1 — 2026-08-14.** The contract now lives at the repo root
(`DESIGN.md`) as the project's source of knowledge — first thing an
agent or person meets in this codebase; `/design.md` serves it
unchanged. v3.0 (same day) changed the token language: the brand speaks
shadcn's semantic vocabulary (see Visual system). Paper templates still
speak the v2 names inside their frozen `@brand tokens` blocks until
documents migrate to the React stack. The contract and the templates version
together: any revision to either bumps this line and the templates'
header comments. An agent mid-generation must diff against the version
it read — a generation started under one version delivers under it or
re-syncs, never mixes.

This document is the brand of Ronny Badilla (@rbadillap), written for the
agent or person producing any surface that carries his name: the site
(ronnybadilla.com), client proposals and quotes, and resumes. If you are
an AI agent generating one of those documents, this contract is your
system of record. You have not seen his previous documents; you do not
need to. Everything you may use is published here.

## Context

Ronny is a product/DevOps/AI engineer. His brand voice is the same as his
engineering voice: evidence leads, claims are checkable, restraint over
spectacle. The visual identity is **the arc symbol**: a horizontal
baseline, an arc emerging from it, three nodes marking origin, apex, and
destination. Read it as the brand's thinking process —
**baseline → emergence → synthesis → execution** — never literally as a
bridge, an orbit, or a chart. The line is the base: structure, system,
criterion, technical ground. The arc is an idea that emerges, rises,
finds synthesis, and lands. The three dots are the starting point, the
point of clarity, and the point of execution.

The design must breathe that spirit rather than repeat the logo:
minimal, analytical, sober, precise, generous white space, few and very
intentional visual gestures. The brand does not shout; it should feel
like a mind ordering complexity.

The site extends the symbol into structure: a spine connects section
nodes (each section is a decision point on the baseline), and the page
closes where the symbol lands — a hairline meeting a dot. Documents
inherit the same grammar at paper scale. The full symbol appears exactly
once per surface, in the header lockup; everything else echoes its parts.

Philosophical authority: `vaults/brand.md` (private, git-ignored — on
Ronny's machine only). Its closing rule governs additions: every future
element justifies itself under the symbol's reasoning or it does not
enter. This contract operationalizes that document for agents; when both
are readable, `vaults/brand.md` wins on intent, this contract wins on
mechanics.

Surfaces this contract governs:

- **Site** — ronnybadilla.com (`src/` in this repo). Reference implementation.
- **Proposal / quote** — letter documents from `brand/templates/proposal.html`.
- **Resume** — letter documents from `brand/templates/resume.html`.

## Priority order

1. This contract. If it forbids something, no template or instinct overrides it.
2. The templates in `brand/templates/`. Start from them; never from scratch.
3. Your composition judgment — free within 1 and 2: content structure,
   section order, how many pages, which published patterns to use.

## Work passes

Work in four passes, in order:

1. **Frame the reader's job.** A proposal is read by someone deciding
   whether to trust Ronny with money and risk. A resume is read by someone
   scanning for evidence. Shape the argument before any styling.
2. **Choose composition.** Pick from the published grammar the patterns
   that carry the argument: tables for claims-with-evidence, rows for
   key/value facts, cards for steps, gate-flow for sequences with
   acceptance conditions.
3. **Apply the visual system.** Tokens and published classes only.
4. **Inspect privately.** Run the judgment checklist below before
   delivering. Fix what fails; do not narrate the process.

## Visual system

Tokens live in `src/app/globals.css` and speak **shadcn's semantic
vocabulary** with the brand's values, so components installed via
`shadcn add` inherit the brand on arrival. Mapping from the contract's
roles: strong ink → `--primary`, body → `--foreground`, muted →
`--muted-foreground`, ground → `--background`, hairline → `--border`.
Roles shadcn defines that the site does not yet use carry
**brand-proposed derivations** in globals.css: each value is the
brand's own answer, derived from doctrine (one ground that does not
elevate; interaction deepens ink instead of introducing color; the one
pigment marks the critical — hence `--destructive` proposes the
terracotta, pending ratification). They are proposals, not defaults:
none may appear on the site until its first use is ratified.
`--radius` is `0` by mandate. Paper templates embed
their values in a frozen `@brand tokens` block (v2 names) — that block
is the paper source of truth until documents migrate. Never edit values
inline; a value that differs from its source of truth is drift.

- **Ground**: warm paper `--background: #fafaf8` — never pure white.
  Hairlines `--border: #e4e4e7`.
- **Text is zinc, monochrome first.** Roles, not colors:
  `--primary` (headings, names, emphasis — the strong ink), `--foreground`
  (body), `--foreground-soft` (secondary, paper only), `--muted-foreground`
  (labels, metadata, footers). On paper every role sits one step darker on
  the zinc ladder than on the web — smaller type needs more contrast.
  That difference is a rule, not an inconsistency.
- **Accent**: `--accent: #9f4b37` (terracotta), **paper only** — the
  site stays strictly monochrome. Canonized after two independent
  generations converged on terracotta. THE LAW: exactly three published
  uses, all marking the SAME critical dimension of the document —
  `.row-id.hot` for its critical reference(s), the diagram's `.hot`
  node/flow for its critical path, and at most ONE `.callout.accent`.
  Never prose, never fills, never every id (if everything is accented,
  nothing is), never any other value. Name collision, resolved: shadcn's
  `--accent` in `src/app/globals.css` is a DIFFERENT role (an
  interaction-surface step, brand-proposed and unused) that happens to
  share the name; this terracotta law governs the paper accent — and
  the web proposes the same pigment for `--destructive`, an extension
  of this law that Ronny ratifies or rejects at first use.
- **Type**: Schibsted Grotesk for prose; JetBrains Mono for labels,
  identifiers, metadata, code — always uppercase with letter-spacing when
  used as a label. The mono is technical register — schematic annotation,
  never a marketing headline. Use the published scale
  (`--text-2xs` … `--text-title`); never invent a size.
- **Hierarchy is ink first, size second.** Strong vs body vs muted does
  the ranking. On the web the name (h1) takes a single step over body
  (`--text-md`, 16px over 15px) in medium weight — ink still leads. On
  paper, the scale provides size steps, but ink still leads.
- **One scale, two units.** The same `--text-*` rungs render in px on
  the web (2xs 10.5 · xs 12 · sm 13.5 · body 15 · md 16 · lg 20) and in
  pt on paper (px = pt × 4/3); the 15 anchor is identical in both
  media. Never an off-scale size on either medium — the site consumes
  the tokens (`text-(length:--text-*)`), not literals.

## Site component layer

On the site, the symbol's grammar is embodied as four primitives in
`src/components/` (`src/components/ui/` stays reserved for components
installed via `shadcn add`), built with shadcn's internal anatomy (flat
functions typed `React.ComponentProps`, props spread, `data-slot` on
every part, `cn()` with the consumer's className last, `cva` only where
real variants exist, no behavior dependencies):

- **`Node`** — the dot (5px). Default strong ink; the consumer may
  soften it (`bg-muted-foreground` at the landing).
- **`Rule`** — the baseline. `orientation` horizontal (hairlines) or
  vertical (the spine is a vertical Rule).
- **`Meta`** — the mono register. Variants: `label` (uppercase,
  tracked — section labels, tags) and `data` (years, dates).
- **`Mark`** — the arc lockup (150×42), the only place the full symbol
  appears.

Gestures are compositions, not components: a section label is
`Node + Meta + Rule`; the page's landing is `Rule + Node`. The
`data-slot` attributes make the grammar auditable from the DOM: on the
homepage, `mark` appears exactly once; nodes, rules, and metas are
countable against the section structure.

## Published grammar

These patterns are canon. They were extracted from real documents two
independent agents produced under deadline; where both converged, the
pattern was canonized. Use them by their published class names — never
synonyms, never re-implementations.

**Hairline doctrine** — every border answers to these rules:

- A hairline is either a **separator between siblings** or a component's
  **own base** — never a frame, never a closing edge. Separators are
  implemented between elements (`tr + tr`), so a component can never end
  in a trailing border: components close with air. (The doctrine governs
  hairline RULES. Bordered enclosures — `.cards`, `.gate-flow .gate`,
  `.memo` — are a different element class: published card patterns,
  allowed as published and never improvised.)
- **Rank by ink**: the boundary between zones of different kind (a table
  head over its body) is one muted-ink hairline; separators between
  siblings of the same kind are `--border`; the section-label rule and
  the footer rule are `--border` (they are the base continuing). The
  only ink-weight line is the callout's 2px vertical spine.
- **Two hairlines never stack.** Since components don't close with
  borders, nothing collides with the next section-label's rule. If a
  composition would put two rules adjacent, one yields — air wins.
- **One component, one dress.** A pattern renders identically wherever
  it appears; a pattern that needs different dress is a different
  pattern.
- **The stylesheet travels whole.** A generated document carries the
  template's full style block, unused patterns included — a diffable
  stylesheet is how drift gets detected. Grid column counts and `<col>`
  widths are content geometry and may be adjusted; everything else is
  dress and may not.

- `.section-label` — a 5px dot, a mono uppercase label
  (tracking 0.14em), a hairline rule filling the row. Every section
  starts with one. The dot is the section's node — it is part of the
  symbol, not decoration. **The label must outrank every annotation
  inside its section**: on paper it is soft ink at Medium weight, while
  table headers, keys, and eyebrows stay muted Regular. On the web the
  label stays muted (it is the only mono element in view, so it needs no
  rank). Labels never wrap — keep them short; a label approaching half
  the column width is a title, not a label.
- `.data-table` — fixed-layout table: mono uppercase `th` sitting on its
  own muted-ink base (one darker hairline per table), `--border`
  separators between rows, no trailing border, strong first column, soft
  last column. Optional `.row-id` for reference numbers (D1, P2). This
  is the shape for claims-with-evidence — and for any list that needs
  ledger weight (line items, terms, prices). Two published uses:
  **pricing** closes with `tr.total` — an ordinary sibling row (never a
  trailing border) whose separator is promoted to muted ink and whose row
  is strong; **FAQ** rows are questions — `.row-id` Q1…QN, question in
  the strong first column, answer beside it. Column widths are set with
  `style` on `<col>` — the one sanctioned inline style, because widths
  are content geometry, not dress; any other inline style is forbidden.
  Numeric columns (prices, quantities) take `.num`: right-aligned,
  tabular figures.
- `.rows` — key/value grid: mono uppercase key column (~112pt), prose
  value. Never carries borders — the keys do the separating. When an
  item carries several facets of UNEQUAL rank, use the stanza: the
  primary facet is the body; each secondary facet is a `.facet` line
  opened by a `.facet-label` (mono micro, the table-th register). A
  table's columns ration equal rank; the stanza ranks by typography —
  choose the table when cross-item column scanning matters more than
  hierarchy, the stanza when it doesn't. Facets scale to N without
  redesign.
- `.gate` — a hard condition. One meaning, context-dependent dress:
  inside `.gate-flow` it renders as a bordered card; inside `.rows` it
  renders inline in strong. The card dress is scoped to `.gate-flow` and
  must never leak into inline use.
- `.cards` — bordered card grid; each card: `.eyebrow` (mono micro
  label), a strong title, a short soft paragraph.
- `.gate-flow` — cards joined by mono arrows; a sequence with acceptance
  conditions.
- `.memo` — cells sharing 1px hairline gaps inside one rounded border
  (grid with `--border` as gap background). One anatomy, many jobs:
  at-a-glance summaries, commercial terms, credentials. `.figures`
  amplifies each cell's strong to `--text-md` for rates, ranges, and
  totals (the stat strip). A real document once named this anatomy
  three ways (`.summary-grid`, `.commercial-grid`, `.credential-grid`)
  — those names are dead; the pattern is `.memo`.
- `.callout` — 2px left border in strong, soft text, optional `strong`
  title line, no background fill. For scope boundaries, principles, and
  ownership statements. `.callout.accent` (max one per document) borders
  in accent for the document's critical rule.
- `.title-note` — the header abstract: one sober paragraph under the
  subtitle stating what the document covers.
- `.list` — dash-bullet list (the resume's bullet grammar, shared):
  5px dash in muted, body-size items. `.cols-2` for two balanced
  columns (boundary lists, scope lists).
- `.next-step` — the closing card: bordered box with an `.eyebrow` and
  one concrete action. Ends the document; nothing follows it but the
  footer.
- `.document-map` — a navigable table of contents for long documents
  (5+ pages): memo-anatomy grid of anchor cells, muted mono number +
  soft strong title per cell, linking to per-page `id`s. Screen gains
  smooth scroll and `scroll-margin` on targets; print renders it as a
  plain map. Hover shifts the title to strong (no fills);
  `:focus-visible` outlines in accent — interactive states are the one
  place accent may appear outside the critical dimension, because they
  exist only on screen and only under the reader's hand.
- Grid variants are content geometry: `.memo.two` (2-up),
  `.gate-flow.duo` (2 stages). Arrows stay muted — flow arrows are
  plumbing, not the critical dimension.
- `.footer` — mono, muted, hairline top border: identity left,
  `NN / NN` pagination right. Every document page has one.
- **Diagrams (SVG)** — `.diagram`, styled ONLY through the published
  `d-*` classes; never through SVG presentation attributes (the
  pre-contract diagrams hardcoded fonts and hex per `<text>` and drifted
  in every copy). Anatomy: `.d-zone` (rounded boundary wash with a
  `.d-eyebrow` label), `.d-node` (white card, strong stroke; `.open` =
  dashed muted for undecided; `.focal` = filled strong with `.d-title
  .inverse`; `.hot` = the accent-law critical node), `.d-flow`
  connectors with arrow markers (`.strong`, `.open`, `.hot`),
  `.d-title` / `.d-anno` text roles, `.d-ref` reference chips tying
  nodes to `.row-id`s, `.d-mask` rects under labels that cross strokes,
  and a legend strip (mandatory when more than one stroke style
  appears). Text sizes are viewBox units from the published set (12
  titles, 8 annotations, 7 refs). A diagram that needs a color outside
  the system is a diagram that needs redesigning.

## Dark variant (web only)

Dark is not light with its values flipped. Three independent agents,
given three different briefs, converged on one identity: **dark is the
unlit technical plane, where everything legible is emitted light,
administered exactly as light mode administers ink.** "White dominates"
was never a law about white — it is a law about ration: the unmarked
field dominates and the mark is spent sparingly, in the symbol's own
order. That law survives unchanged; only the scarce resource changes
hands.

- Scope: the web. The OS decides by default
  (`@media (prefers-color-scheme: dark)`); pressing **D** overrides in
  either direction via `data-theme`, persisted — no icon, no visible
  control: **the toggle is knowledge, not chrome**. The key is ignored
  while typing (inputs, textareas, editable content) and with any
  modifier held. **Paper is always light**: print has no dark mode, and
  the `.paper` scope pins every role so no OS scheme can flip a
  document. The templates' embedded token blocks therefore restate the
  paper-relevant values only; the dark blocks live in
  `src/app/globals.css` alone.
- Tokens: ground `#0a0a0a` (off-ladder and UNTINTED — the unlit plane
  is not a material, so unlike the warm paper it takes no cast; the
  ground is a ground, the ink is the ladder). Strong `#d4d4d8`
  (zinc-300 — emitted light blooms where deposited ink does not, so
  the strongest role stops one rung short of the top: firm, never a
  lamp). Body `#a1a1aa`, muted `#71717a`, border `#27272a`.
- **Nothing static reaches white.** Full light exists only under the
  reader's hand — `::selection` resolves to strong-on-ground through
  the same variables. A dark surface with white text is off-brand by
  definition.
- The historical dark (the pre-redesign site) seated its ground on
  `#18181b`; that value is now strong ink, and a ground that doubles
  as an ink value is the mirror's fingerprint — rejected.
- The accent stays paper-only. In dark, light itself is the accent.
- The mark keeps its geometry and inherits `currentColor`; the favicon
  (`src/app/icon.svg`) carries the dark paint via its own media query.

## Per-medium rules

- **Web**: px units, body 15px/1.65, max-width 560px column, staggered
  fade-up entrance (0.45s, reduced-motion respected — the one motion
  gesture: content lands on the base, once). Animation never gates
  reading. Radius 0, no shadows, no gradients: the technical plane has
  no rounded corners or simulated depth.
- **Paper is the one medium with rounded corners and a shadow**: bordered
  cards carry 6px radius, and the on-screen sheet casts its emulation
  shadow (it simulates the physical page; print drops it). Nothing else
  gains depth.
- **Paper**: pt units from the published scale, anchored to a 15px
  (11.25pt) body reading size — these documents are read on screen as
  PDFs far more often than printed, and the identity reads at 15 on
  every medium (judged side-by-side against 16). Letter size. Proposal
  pages are fixed-height (`11in`, overflow hidden) — balance content per
  page by hand. Resumes flow and break naturally. On screen the sheet is
  emulated (shadow over `#e4e4e2`); print leaves paper unpainted and
  breaks pages. Both media collapse gracefully under 820px.
- **Responsive rules are screen-only.** The mobile collapse is always
  `@media screen and (max-width: 820px)` — never an unqualified media
  query. Letter paper lays out at 816px, UNDER the 820px breakpoint: an
  unqualified query makes every PDF print the mobile layout and bleed
  across sheets. This shipped once; the qualifier is not optional.
- **Paper breathes.** White space is part of the spirit, not slack to
  reclaim. The templates' spacing rhythm (section gaps, cell padding,
  line-heights) is grammar — when content fights the page, cut content
  or add a page; never compress the air. The rule cuts both ways: an
  underfull page is correct — the footer pins to the base and the air
  above it stays; never stretch or pad content to fill a page. Prefer
  the large air band at the document's end, not mid-document.
- **Language**: documents are written in English or Spanish as the
  client requires. Spanish keeps its accents everywhere, including mono
  uppercase labels (ACEPTACIÓN, not ACEPTACION). Currency keeps the
  `USD 2,400` grouping in both languages, as the existing document
  corpus does.

## Mark rules

The arc mark appears on every surface, at the top, in the strong ink
(`--primary` on the web, `--foreground-strong` in the paper templates'
frozen vocabulary). A multi-page document is ONE surface: the mark
opens page 1 and appears nowhere else; continuation pages carry the
footer's identity line instead.

- Canonical lockup: `brand/mark.svg` (150×42). Copy it verbatim — never
  redraw, never eyeball the geometry. The resume renders the same
  geometry at 132×38.
- Small sizes: `brand/mark-32.svg` (favicon geometry) recalibrates
  strokes (1.5 baseline / 1.75 arc) for legibility. Below ~90px wide, use
  the 32px variant's proportions.
- The site component (`src/components/logomark.tsx`), the favicon
  (`src/app/icon.svg`), and both SVG files must stay geometrically
  identical. A change to the mark is a brand decision, not an edit.

## Rejected reflexes

Named failures observed in real generated documents, plus standing
prohibitions. Do not:

- Invent token names (`--paper`, `--line`, `--text`, `--strong`,
  `--ink`, `--canvas`, `--wash`, `--soft` are dead aliases from
  pre-contract documents) or restate token values inline.
- Warm-shift the gray ladder (#5f5f67, #7a7a83, #dededb appeared in one
  pre-contract document) — the ladder is zinc, exact values only. A
  warm ladder is a recorded open thread, not a per-document choice.
- Give a callout (or anything else) a background wash — the system has
  no surface fills; boundaries are borders and air.
- Introduce a color — including "just one accent". The accent slot is
  empty by decision, not by omission.
- Introduce a font, a weight the templates don't load, or an off-scale
  size (the pre-contract documents drifted to 9.2pt vs 9.3pt vs 9.5pt
  bodies; the scale exists so that cannot happen again).
- Drop the dot from `.section-label` (a pre-contract resume did; the dot
  is canon).
- Set a section's internal annotations (table `th`, keys, eyebrows) at
  the same ink and weight as its `.section-label` — pre-contract
  documents did, and section titles drowned in their own contents. The
  title holds soft/Medium; annotations hold muted/Regular.
- Redraw the arc from memory (pre-contract documents hand-copied it 20+
  times; two copies already differ in stroke opacity).
- Rename published classes or create synonyms (`.decision-table`,
  `.delivery-table`, `.positions`, `.method` were four names for two
  patterns; the canon is `.data-table` and `.cards`; `.terms` was a
  bordered variant of `.rows` and is dead).
- Close a component with a trailing border, or frame one with borders —
  pre-contract tables ended in an orphan hairline that collided with the
  next section-label. Borders separate siblings or ground a head;
  components end with air.
- Use inline `style` attributes anywhere except widths on `<col>`.
  Spacing tweaks get a published class (`.flush`) or nothing.
- Rebuild the stylesheet by eye instead of carrying the template block —
  a real document imitated the system at 90% and shaved ~8% of the air
  across every padding, invented a `.compact` table modifier with an
  off-scale 9.35pt, and renamed the diagram classes. Near-compliance IS
  drift; only the verbatim template block is compliance.
- Claim the brand in a provenance comment the document does not honor —
  the same imitation opened with "rbadillap brand v1.6" while carrying
  none of the v1.6 tokens block. The provenance comment states the
  template + version actually copied, nothing else.
- Substitute ASCII for the brand's typographic voice: separators are
  `·` (never ` - `), arrows are `→` (never `>`), and Spanish keeps its
  accents (San José, not San Jose).
- Add gradients, shadows beyond the page sheet, rounded corners beyond
  6–7px, stock imagery, icons, emoji, or decorative SVG.
- Use scroll-triggered reveals, hover motion, parallax, or any animation
  in documents.
- Compress spacing or line-height to make content fit a page — the
  pre-contract specimens were densified exactly this way, page by page,
  until nothing breathed. Cut content or add a page instead.
- Manufacture certainty: no hype adjectives, no fake deadlines, no
  unverifiable claims. Evidence columns exist so claims can carry proof.

## Judgment checklist

Before delivering, verify:

1. The arc mark is present, verbatim, strong, at the top of page 1 —
   and nowhere else in the document.
2. Squint test: one strong FOCAL element per view — a heading or title.
   Strong texture (table first-columns, keys, `.gate` conditions, the
   mark) does not count as competition; a second heading-rank element
   does.
3. Zero colors outside the zinc ladder and paper. White dominates;
   black and gray are administered.
4. Every graphic element is structural, not ornamental: it marks a
   decision, a boundary, or a base — or it goes.
5. Labels are mono, uppercase, tracked; prose is sans; nothing mixed.
6. Every section opens with a complete `.section-label` (dot included).
7. Token values match the template's frozen `@brand tokens` block —
   the paper source of truth until documents migrate (the historical
   `brand/tokens.css` is retired; web tokens live in
   `src/app/globals.css`). No token may be added, dropped, or altered.
8. Footer paginated `NN / NN`; proposal pages don't overflow their 11in.
9. Print verification is VISUAL, not just counted: sheet count equals
   page count AND an actual look at rendered sheets confirms the paper
   layout (no mobile collapse, no bleed, footers at the base). A
   correct count over a broken layout has happened.
10. No fill-in comments or `{{slots}}` remain; one provenance comment
    (template + version) identifies the origin.

And the master question, from the canon: does the result feel like an
extension of the symbol, or just another modern document? If the latter,
reduce, align, and add intention until it does.
