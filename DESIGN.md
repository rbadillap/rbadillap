# rbadillap design contract — v4.0

**Version 4.0 — 2026-08-14.** Any revision bumps this line. If you are
mid-generation, diff against the version you read — deliver under it or
re-sync, never mix versions.

This contract governs every surface that carries the rbadillap brand.
Two media exist: the **site** (ronnybadilla.com, `src/` in this repo),
implemented; and **paper documents** (proposals, quotes, resumes),
dormant — no document artifacts exist in this repo. When documents are
rebuilt (in React, from this contract), every paper rule below binds
that rebuild. If you are generating a surface, this document is your
system of record. You do not need any previous document; everything you
may use is published here.

## Priority order

1. This contract. If it forbids something, no instinct or example
   overrides it.
2. Your composition judgment — free within 1: content structure,
   section order, how many pages, which published patterns to use.

Intent authority: `vaults/brand.md` (private, git-ignored). When both
are readable, it wins on intent; this contract wins on mechanics. Every
new element must justify itself under the symbol's reasoning or it does
not enter.

## Identity

The visual identity is **the arc symbol**: a horizontal baseline, an
arc emerging from it, three nodes marking origin, apex, and
destination. Read it as a thinking process —
**baseline → emergence → synthesis → execution** — never literally as a
bridge, an orbit, or a chart. The line is the base: structure, system,
criterion, technical ground. The arc is an idea that emerges, rises,
finds synthesis, and lands. The three dots are the starting point, the
point of clarity, and the point of execution.

- **Breathe the symbol; do not repeat the logo.** Make every surface
  minimal, analytical, sober, precise — generous white space, few and
  very intentional visual gestures. The brand does not shout; it reads
  as a mind ordering complexity.
- **Voice**: evidence leads, claims are checkable, restraint over
  spectacle.
- **The full symbol appears exactly once per surface**, in the header
  lockup. Everything else echoes its parts — baseline, arc, node.
- **On the site the symbol is structure**: a spine connects section
  nodes (each section is a decision point on the baseline), and the
  page closes where the symbol lands — a hairline meeting a dot.
  Documents inherit the same grammar at paper scale.

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
`shadcn add` inherit the brand on arrival. Role mapping: strong ink →
`--primary`, body → `--foreground`, muted → `--muted-foreground`,
ground → `--background`, hairline → `--border`. Roles the site does not
yet use carry **brand-proposed derivations** in globals.css — each
value is the brand's own answer, derived from doctrine (one ground that
does not elevate; interaction deepens ink instead of introducing color;
the one pigment marks the critical, hence `--destructive` proposes the
terracotta). Treat them as proposals, not defaults: none may appear on
the site until its first use is ratified. `--radius` is `0` by mandate.
Paper token values derive from the published rules: every text role one
step darker on the zinc ladder — body `#3f3f46` (zinc-700), soft
`#52525b` (zinc-600, paper-only role), muted `#71717a` (zinc-500) —
over the same warm ground and hairline. Never edit values inline; a
value that differs from its source of truth is drift.

- **Ground**: warm paper `--background: #fafaf8` — never pure white.
  Hairlines `--border: #e4e4e7`.
- **Text is zinc, monochrome first.** Roles, not colors:
  `--primary` (headings, names, emphasis — the strong ink), `--foreground`
  (body), `--foreground-soft` (secondary, paper only), `--muted-foreground`
  (labels, metadata, footers). On paper every role sits one step darker on
  the zinc ladder than on the web — smaller type needs more contrast.
  That difference is a rule, not an inconsistency.
- **Accent**: `--accent: #9f4b37` (terracotta), **paper only** — the
  site stays strictly monochrome. THE LAW: exactly three published
  uses, all marking the SAME critical dimension of the document —
  `.row-id.hot` for its critical reference(s), the diagram's `.hot`
  node/flow for its critical path, and at most ONE `.callout.accent`.
  Never prose, never fills, never every id (if everything is accented,
  nothing is), never any other value. Name collision, resolved: shadcn's
  `--accent` in `src/app/globals.css` is a DIFFERENT role (an
  interaction-surface step, brand-proposed and unused) that happens to
  share the name; this terracotta law governs the paper accent — and
  the web proposes the same pigment for `--destructive`, an extension
  of this law ratified or rejected at first use.
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
  pt on paper (2xs 8 · xs 9 · sm 10 · body 11.25 · md 12 · lg 15, plus
  the paper-only `name` 22.5 and `title` 25.5); the 15px = 11.25pt
  anchor is identical in both media. Never an off-scale size on either
  medium — the site consumes the tokens (`text-(length:--text-*)`), not
  literals.

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

These patterns are canon. Use them by their published class names —
never synonyms, never re-implementations.

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
  complete published dress, unused patterns included — a diffable
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
  totals (the stat strip). Dead aliases for this anatomy —
  `.summary-grid`, `.commercial-grid`, `.credential-grid` — must not
  return; the pattern is `.memo`.
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
  `d-*` classes; never through SVG presentation attributes. Anatomy:
  `.d-zone` (rounded boundary wash with a
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

**Dark is the unlit technical plane, where everything legible is
emitted light, administered exactly as light mode administers ink.**
Dark is not light with its values flipped. The governing law is ration,
not color: the unmarked field dominates and the mark is spent
sparingly, in the symbol's own order — in light the scarce resource is
ink; in dark it is light.

- Scope: the web. The OS decides by default
  (`@media (prefers-color-scheme: dark)`); pressing **D** overrides in
  either direction via `data-theme`, persisted — no icon, no visible
  control: **the toggle is knowledge, not chrome**. The key is ignored
  while typing (inputs, textareas, editable content) and with any
  modifier held. **Paper is always light**: print has no dark mode, and
  the `.paper` scope pins every role so no OS scheme can flip a
  document. The dark blocks live in `src/app/globals.css` alone; paper
  never gains one.
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
- **Never seat the dark ground on an ink value.** `#18181b` is strong
  ink in light mode; a ground that doubles as an ink value reads as
  light mode mirrored, which dark must never be.
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
  every medium. Letter size. Proposal
  pages are fixed-height (`11in`, overflow hidden) — balance content per
  page by hand. Resumes flow and break naturally. On screen the sheet is
  emulated (shadow over `#e4e4e2`); print leaves paper unpainted and
  breaks pages. Both media collapse gracefully under 820px.
- **Responsive rules are screen-only.** The mobile collapse is always
  `@media screen and (max-width: 820px)` — never an unqualified media
  query. Letter paper lays out at 816px, UNDER the 820px breakpoint: an
  unqualified query makes every PDF print the mobile layout and bleed
  across sheets. The qualifier is not optional.
- **Paper breathes.** White space is part of the spirit, not slack to
  reclaim. The published spacing rhythm (section gaps, cell padding,
  line-heights) is grammar — when content fights the page, cut content
  or add a page; never compress the air. The rule cuts both ways: an
  underfull page is correct — the footer pins to the base and the air
  above it stays; never stretch or pad content to fill a page. Prefer
  the large air band at the document's end, not mid-document.
- **Language**: documents are written in English or Spanish as the
  client requires. Spanish keeps its accents everywhere, including mono
  uppercase labels (ACEPTACIÓN, not ACEPTACION). Currency keeps the
  `USD 2,400` grouping in both languages.

## Mark rules

The arc mark appears on every surface, at the top, in the strong ink
(`--primary`). A multi-page document is ONE surface: the mark opens
page 1 and appears nowhere else; continuation pages carry the footer's
identity line instead.

- Canonical lockup: the `Mark` component (`src/components/mark.tsx`),
  viewBox 150×42. Copy its geometry verbatim — never redraw, never
  eyeball. Paper renders the same geometry smaller (resumes used
  132×38).
- Small sizes: the favicon (`src/app/icon.svg`) holds the 32px
  recalibration — viewBox 32, strokes 1.5 baseline / 1.75 arc, arc
  radius 6.5, end nodes r 1.6, apex r 1.1 — so the mark stays legible.
  Below ~90px wide, use these proportions.
- The component and the favicon must stay geometrically identical (the
  favicon carries fixed colors and its own dark media query because
  favicons cannot inherit `currentColor`). A change to the mark is a
  brand decision, not an edit.

## Rejected reflexes

Standing prohibitions. Each one names a failure mode that has already
occurred at least once. Do not:

- Invent token names (`--paper`, `--line`, `--text`, `--strong`,
  `--ink`, `--canvas`, `--wash`, `--soft` are dead aliases and must not
  return) or restate token values inline.
- Warm-shift the gray ladder — the ladder is zinc, exact values only.
  A warm ladder is a recorded open thread, not a per-document choice.
- Give a callout (or anything else) a background wash — the system has
  no surface fills; boundaries are borders and air.
- Introduce a color — including "just one accent". The accent slot is
  governed by the accent law; it is not open.
- Introduce a font, an unpublished weight, or an off-scale size. The
  scale exists so drifted bodies cannot happen.
- Drop the dot from `.section-label` — the dot is canon.
- Set a section's internal annotations (table `th`, keys, eyebrows) at
  the same ink and weight as its `.section-label` — section titles
  drown in their own contents. The title holds soft/Medium; annotations
  hold muted/Regular.
- Redraw the arc from memory. Copy the `Mark` component's geometry
  verbatim.
- Rename published classes or create synonyms (`.decision-table`,
  `.delivery-table`, `.positions`, `.method`, `.terms` are dead names
  and must not return; the canon is `.data-table`, `.cards`, `.rows`).
- Close a component with a trailing border, or frame one with borders.
  Borders separate siblings or ground a head; components end with air.
- Use inline `style` attributes anywhere except widths on `<col>`.
  Spacing tweaks get a published class (`.flush`) or nothing.
- Rebuild the dress by eye instead of carrying the published values.
  Near-compliance IS drift; only verbatim compliance is compliance.
- Claim the brand in a provenance comment the document does not honor.
  The provenance comment states the source + contract version actually
  followed, nothing else.
- Substitute ASCII for the brand's typographic voice: separators are
  `·` (never ` - `), arrows are `→` (never `>`), and Spanish keeps its
  accents (San José, not San Jose).
- Add gradients, shadows beyond the page sheet, rounded corners beyond
  6–7px, stock imagery, icons, emoji, or decorative SVG.
- Use scroll-triggered reveals, hover motion, parallax, or any animation
  in documents.
- Compress spacing or line-height to make content fit a page. Cut
  content or add a page instead.
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
7. Token values match `src/app/globals.css` on the web and the
   published paper derivations on paper. No token may be added,
   dropped, or altered.
8. Footer paginated `NN / NN`; proposal pages don't overflow their 11in.
9. Print verification is VISUAL, not just counted: sheet count equals
   page count AND an actual look at rendered sheets confirms the paper
   layout (no mobile collapse, no bleed, footers at the base).
10. No fill-in comments or placeholder slots remain; one provenance
    comment (source + contract version) identifies the origin.

And the master question: does the result feel like an extension of the
symbol, or just another modern document? If the latter, reduce, align,
and add intention until it does.
