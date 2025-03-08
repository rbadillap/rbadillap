"use client"

import * as React from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/layout/ThemeProvider"
import { CommandBar } from "@/components/command-bar/CommandBar"

interface RootLayoutProps {
  children: React.ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 md:py-16">
          {children}
        </main>
        <Footer />
        <CommandBar />
      </div>
    </ThemeProvider>
  )
} 