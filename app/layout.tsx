import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

// We'll import the RootLayout component in client components

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rbadillap.dev'),
  title: "Ronny Badilla | Software Developer & DevOps Engineer",
  description: "Ronny Badilla - Software Developer, DevOps Engineer, and Cloud Expert - @rbadillap in socials",
  keywords: ["Software Development", "DevOps", "Cloud", "AI", "Web Development"],
  authors: [{ name: "Ronny Badilla", url: "https://rbadillap.dev" }],
  creator: "Ronny Badilla",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" }
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" }
    ]
  },
  openGraph: {
    title: "Ronny Badilla | Software Developer & DevOps Engineer",
    description: "Ronny Badilla - Software Developer, DevOps Engineer, and Cloud Expert - @rbadillap in socials",
    url: "https://rbadillap.dev",
    siteName: "Ronny Badilla",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Ronny Badilla"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronny Badilla | Software Developer & DevOps Engineer",
    description: "Ronny Badilla - Software Developer, DevOps Engineer, and Cloud Expert - @rbadillap in socials",
    creator: "@rbadillap",
    images: ["/android-chrome-512x512.png"]
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
