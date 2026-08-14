import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { home } from "#content";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted"
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: {
    default: "Ronny Badilla",
    template: "%s | Ronny Badilla",
  },
  description: home.tagline,
  metadataBase: new URL("https://rbadillap.dev"),
  authors: [{ name: "Ronny Badilla", url: "https://rbadillap.dev" }],
  creator: "Ronny Badilla",
  openGraph: {
    title: "Ronny Badilla",
    description: home.tagline,
    url: "https://rbadillap.dev",
    siteName: "Ronny Badilla",
    images: "/og.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronny Badilla",
    description: home.tagline,
    images: "/og.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fafaf8",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${schibsted.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
