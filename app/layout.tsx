import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Ronny Badilla | Software Developer & DevOps Engineer",
  description: "Personal website of Ronny Badilla - Software Developer, DevOps Engineer, and Cloud Expert",
  keywords: ["Software Development", "DevOps", "Cloud", "AI", "Web Development"],
  authors: [{ name: "Ronny Badilla", url: "https://ronnybadilla.com" }],
  creator: "Ronny Badilla",
  openGraph: {
    title: "Ronny Badilla | Software Developer & DevOps Engineer",
    description: "Personal website of Ronny Badilla - Software Developer, DevOps Engineer, and Cloud Expert",
    url: "https://ronnybadilla.com",
    siteName: "Ronny Badilla",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronny Badilla | Software Developer & DevOps Engineer",
    description: "Personal website of Ronny Badilla - Software Developer, DevOps Engineer, and Cloud Expert",
    creator: "@rbadillap",
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
      </body>
    </html>
  );
}
