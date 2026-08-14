import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { ThemeKey } from "@/components/theme-key";
import { home } from "#content";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted"
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
})

export const metadata: Metadata = {
  title: {
    default: "Ronny Badilla",
    template: "%s | Ronny Badilla",
  },
  description: home.tagline,
  metadataBase: new URL("https://ronnybadilla.com"),
  authors: [{ name: "Ronny Badilla", url: "https://ronnybadilla.com" }],
  creator: "Ronny Badilla",
  openGraph: {
    title: "Ronny Badilla",
    description: home.tagline,
    url: "https://ronnybadilla.com",
    siteName: "Ronny Badilla",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronny Badilla",
    description: home.tagline,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${schibsted.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {/* anti-FOUC: apply the persisted D-key override before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        {children}
        <ThemeKey />
        <Analytics />
      </body>
    </html>
  )
}
