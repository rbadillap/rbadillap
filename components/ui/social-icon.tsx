"use client"

import Image from "next/image"
import { useTheme } from "@/components/layout/ThemeProvider"
import { useEffect, useState } from "react"

type SocialIconProps = {
  type: "github" | "linkedin" | "twitter"
  size?: number
  className?: string
}

export function SocialIcon({ type, size = 24, className = "" }: SocialIconProps) {
  const { theme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light")
  
  useEffect(() => {
    // Determine actual theme based on system preference if needed
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setCurrentTheme(systemTheme)
    } else {
      setCurrentTheme(theme as "light" | "dark")
    }
    
    // Listen for system theme changes if using system preference
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = (e: MediaQueryListEvent) => {
        setCurrentTheme(e.matches ? "dark" : "light")
      }
      
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme])
  
  const iconMap = {
    github: `/logos/github-${currentTheme}.png`,
    linkedin: `/logos/linkedin-${currentTheme}.png`,
    twitter: `/logos/x-${currentTheme}.png`,
  }

  const altText = {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "X / Twitter",
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <Image
        src={iconMap[type]}
        alt={altText[type]}
        width={size}
        height={size}
        className="object-contain w-auto h-auto"
        style={{
          maxWidth: size,
          maxHeight: size
        }}
      />
    </div>
  )
} 