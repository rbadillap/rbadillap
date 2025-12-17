"use client"

import { useState } from "react"

const grayFamilies = {
  neutral: {
    950: "#0a0a0a",
    900: "#171717",
    800: "#262626",
    700: "#404040",
    600: "#525252",
    500: "#737373",
    400: "#a3a3a3",
    300: "#d4d4d4",
    200: "#e5e5e5",
    100: "#f5f5f5",
    50: "#fafafa",
  },
  zinc: {
    950: "#09090b",
    900: "#18181b",
    800: "#27272a",
    700: "#3f3f46",
    600: "#52525b",
    500: "#71717a",
    400: "#a1a1aa",
    300: "#d4d4d8",
    200: "#e4e4e7",
    100: "#f4f4f5",
    50: "#fafafa",
  },
  gray: {
    950: "#030712",
    900: "#111827",
    800: "#1f2937",
    700: "#374151",
    600: "#4b5563",
    500: "#6b7280",
    400: "#9ca3af",
    300: "#d1d5db",
    200: "#e5e7eb",
    100: "#f3f4f6",
    50: "#f9fafb",
  },
  stone: {
    950: "#0c0a09",
    900: "#1c1917",
    800: "#292524",
    700: "#44403c",
    600: "#57534e",
    500: "#78716c",
    400: "#a8a29e",
    300: "#d6d3d1",
    200: "#e7e5e4",
    100: "#f5f5f4",
    50: "#fafaf9",
  },
  slate: {
    950: "#020617",
    900: "#0f172a",
    800: "#1e293b",
    700: "#334155",
    600: "#475569",
    500: "#64748b",
    400: "#94a3b8",
    300: "#cbd5e1",
    200: "#e2e8f0",
    100: "#f1f5f9",
    50: "#f8fafc",
  },
}

type Family = keyof typeof grayFamilies
type Shade = keyof typeof grayFamilies.neutral

const elements = [
  { key: "background", label: "Background", cssVar: "--background" },
  { key: "text", label: "Headings", cssVar: "--foreground-strong" },
  { key: "body", label: "Body text", cssVar: "--foreground" },
  { key: "muted", label: "Muted text", cssVar: "--foreground-muted" },
  { key: "border", label: "Dividers", cssVar: "--border" },
] as const

type ElementKey = (typeof elements)[number]["key"]

interface ColorSelection {
  family: Family
  shade: Shade
}

const defaultSelections: Record<ElementKey, ColorSelection> = {
  background: { family: "zinc", shade: 900 },
  text: { family: "zinc", shade: 200 },
  body: { family: "zinc", shade: 400 },
  muted: { family: "zinc", shade: 500 },
  border: { family: "zinc", shade: 800 },
}

export function ColorControl() {
  const [isOpen, setIsOpen] = useState(false)
  const [selections, setSelections] = useState(defaultSelections)

  const updateColor = (element: ElementKey, family: Family, shade: Shade) => {
    const newSelections = {
      ...selections,
      [element]: { family, shade },
    }
    setSelections(newSelections)

    const color = grayFamilies[family][shade]
    const cssVar = elements.find((e) => e.key === element)?.cssVar
    if (cssVar) {
      document.documentElement.style.setProperty(cssVar, color)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition-colors"
        aria-label="Toggle color controls"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-zinc-300"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 w-72 bg-zinc-900 border border-zinc-800 p-4 space-y-4 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-widest text-zinc-500">Color Control</span>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {elements.map((element) => (
            <div key={element.key} className="space-y-2">
              <label className="text-sm text-zinc-400">{element.label}</label>
              <div className="flex gap-2">
                <select
                  value={selections[element.key].family}
                  onChange={(e) => updateColor(element.key, e.target.value as Family, selections[element.key].shade)}
                  className="flex-1 bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs px-2 py-1.5"
                >
                  {Object.keys(grayFamilies).map((family) => (
                    <option key={family} value={family}>
                      {family}
                    </option>
                  ))}
                </select>

                <select
                  value={selections[element.key].shade}
                  onChange={(e) =>
                    updateColor(element.key, selections[element.key].family, Number(e.target.value) as Shade)
                  }
                  className="w-20 bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs px-2 py-1.5"
                >
                  {Object.keys(grayFamilies.neutral).map((shade) => (
                    <option key={shade} value={shade}>
                      {shade}
                    </option>
                  ))}
                </select>

                <div
                  className="w-8 h-8 border border-zinc-700"
                  style={{
                    backgroundColor: grayFamilies[selections[element.key].family][selections[element.key].shade],
                  }}
                />
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              setSelections(defaultSelections)
              elements.forEach((el) => {
                const color = grayFamilies[defaultSelections[el.key].family][defaultSelections[el.key].shade]
                document.documentElement.style.setProperty(el.cssVar, color)
              })
            }}
            className="w-full mt-2 py-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  )
}
