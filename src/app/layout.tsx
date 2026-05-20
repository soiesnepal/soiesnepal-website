import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// === GRAVITY BOMB EASTER EGG (easy to remove) ===


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SOIES Nepal - Society of Industrial Engineering Students",
  description:
    "Empowering Industrial Engineering for Nepal's Future. Society of Industrial Engineering Students (SOIES) Nepal.",
  keywords: [
    "SOIES",
    "Nepal",
    "Industrial Engineering",
    "Engineering Students",
    "Thapathali",
  ],
  icons: {
    icon: [
      {
        url: "/soies.svg",
        href: "/soies.svg",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SOIES Nepal - Society of Industrial Engineering Students" />
        <meta property="og:description" content="Empowering Industrial Engineering for Nepal's Future. Society of Industrial Engineering Students (SOIES) Nepal." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://soiesnepal.org/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SOIES Nepal - Society of Industrial Engineering Students" />
        <meta name="twitter:description" content="Empowering Industrial Engineering for Nepal's Future. Society of Industrial Engineering Students (SOIES) Nepal." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFD700" />
        <link rel="canonical" href="https://soiesnepal.org/" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white`}>
        {/* GravityBombClientWrapper removed */}
          <ThemeProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        {/* GravityBombClientWrapper removed */}
      </body>
    </html>
  );
}
