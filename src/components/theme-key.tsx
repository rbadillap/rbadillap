"use client"

import { useEffect } from "react"

const THEME_COLORS = { light: "#fafaf8", dark: "#0a0a0a" } as const

/*
 * The theme toggle is knowledge, not chrome: pressing D flips
 * light/dark. No icon, no UI. The OS preference is the default;
 * the key pins an override (persisted) in either direction.
 */
export function ThemeKey() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "d" && e.key !== "D") return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      )
        return

      const root = document.documentElement
      const effective =
        root.dataset.theme ??
        (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      const next = effective === "dark" ? "light" : "dark"

      root.dataset.theme = next
      try {
        localStorage.setItem("theme", next)
      } catch {}
      document
        .querySelectorAll('meta[name="theme-color"]')
        .forEach((m) => m.setAttribute("content", THEME_COLORS[next]))
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return null
}
