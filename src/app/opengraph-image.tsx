import { ImageResponse } from "next/og"
import { home } from "#content"

export const alt = home.name
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// satori needs raw ttf/otf data; css2 with `text=` subsets to the glyphs we use
async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const match = css.match(/src: url\((https:[^)]+)\) format\('(opentype|truetype|woff)'\)/)
  if (!match) throw new Error(`No usable font source for ${family}`)
  return await (await fetch(match[1])).arrayBuffer()
}

export default async function OpengraphImage() {
  const tagline = home.tagline.toUpperCase()
  const [schibsted, mono] = await Promise.all([
    loadGoogleFont("Schibsted Grotesk", 500, home.name),
    loadGoogleFont("JetBrains Mono", 400, tagline),
  ])

  // palette mirrors brand/tokens.css (satori cannot read CSS vars):
  // #fafaf8 --background, #18181b --foreground-strong, #a1a1aa --foreground-muted
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#fafaf8",
        }}
      >
        {/* the arc, scaled from Logomark (viewBox 150x42) to the 1200x630 canvas */}
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <line x1="0" y1="340" x2="1200" y2="340" stroke="#18181b" strokeWidth="2" opacity="0.9" />
          <path d="M 390 340 A 210 210 0 0 1 810 340" stroke="#18181b" strokeWidth="3" fill="none" />
          <circle cx="390" cy="340" r="12" fill="#18181b" />
          <circle cx="810" cy="340" r="12" fill="#18181b" />
          <circle cx="600" cy="130" r="7" fill="#18181b" />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 432,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Schibsted Grotesk",
            fontSize: 46,
            fontWeight: 500,
            color: "#18181b",
          }}
        >
          {home.name}
        </div>
        <div
          style={{
            position: "absolute",
            top: 498,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontFamily: "JetBrains Mono",
            fontSize: 19,
            letterSpacing: "0.25em",
            color: "#a1a1aa",
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Schibsted Grotesk", data: schibsted, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    }
  )
}
