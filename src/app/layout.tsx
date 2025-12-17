import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted"
})

export const metadata: Metadata = {
  title: {
    default: "Ronny Badilla",
    template: "%s | Ronny Badilla",
  },
  description: "Design / DevOps / Cloud / AI Engineer",
  metadataBase: new URL("https://ronnybadilla.com"),
  authors: [{ name: "Ronny Badilla", url: "https://ronnybadilla.com" }],
  creator: "Ronny Badilla",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
    other: { rel: "icon", url: "/favicon.ico" },
  },
  openGraph: {
    title: "Ronny Badilla",
    description: "Design / DevOps / Cloud / AI Engineer",
    url: "https://ronnybadilla.com",
    siteName: "Ronny Badilla",
    images: "/og.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronny Badilla",
    description: "Design / DevOps / Cloud / AI Engineer",
    images: "/og.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#171717",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${schibsted.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
