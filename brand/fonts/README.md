# brand/fonts

| File | Use | License |
|---|---|---|
| `schibsted-400.woff2` | Sans (prose). Declared `font-weight: 400 700` — the templates rely on it covering 600/650. | OFL (Google Fonts) |
| `JetBrainsMono-Regular.woff2` | Mono, annotations. | OFL (`JetBrainsMono-OFL.txt`) |
| `JetBrainsMono-Medium.woff2` | Mono Medium — section-label rank. | OFL |

Notes:

- The Schibsted file came from `~/code/lab/resume-v4-src/fonts/`, where it
  existed four times under weight-suffixed names — all byte-identical.
  Only one copy lives here. UNVERIFIED: whether it is a true variable
  font or browsers synthesize the 600/650 weights (recorded as a
  pendiente in `brand/process.md`).
- All files are OFL — committable and servable without restriction.
