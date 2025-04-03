import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Ronny Badilla",
    template: "%s | Ronny Badilla",
  },
  description: "Software / DevOps / Cloud / AI",
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
    description: "Software / DevOps / Cloud / AI",
    url: "https://ronnybadilla.com",
    siteName: "Ronny Badilla",
    images: "/og.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronny Badilla",
    description: "Software / DevOps / Cloud / AI",
    images: "/og.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${geist.className} ${geistMono.className}`}>
        <div className="relative min-h-screen bg-background">
          {/* Grid Background */}
          <div className="pointer-events-none fixed inset-0 border-grid opacity-[0.02]" />
          
          {/* Main Content */}
          <div className="relative">
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
