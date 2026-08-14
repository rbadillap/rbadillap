import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
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
  description: "Design / DevOps / AI Engineer",
  metadataBase: new URL("https://rbadillap.dev"),
  authors: [{ name: "Ronny Badilla", url: "https://rbadillap.dev" }],
  creator: "Ronny Badilla",
  openGraph: {
    title: "Ronny Badilla",
    description: "Design / DevOps / AI Engineer",
    url: "https://rbadillap.dev",
    siteName: "Ronny Badilla",
    images: "/og.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronny Badilla",
    description: "Design / DevOps / AI Engineer",
    images: "/og.jpg",
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
    <html lang="en" className={`bg-background ${schibsted.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
