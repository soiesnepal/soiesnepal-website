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

const siteUrl = "https://soiesnepal.org";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "SOIES Nepal",
  alternateName: "Society of Industrial Engineering Students Nepal",
  url: siteUrl,
  logo: `${siteUrl}/soies.svg`,
  sameAs: [
    "https://www.facebook.com/soiesnepal",
  ],
  description:
    "SOIES Nepal is a student organization for Industrial Engineering in Nepal focused on events, research, learning resources, and student development.",
  areaServed: "Nepal",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SOIES Nepal | Industrial Engineering Students in Nepal",
    template: "%s | SOIES Nepal",
  },
  description:
    "SOIES Nepal is the Society of Industrial Engineering Students in Nepal. Explore industrial engineering events, notices, journals, gallery, teams, and student resources.",
  manifest: "/manifest.json",
  keywords: [
    "SOIES Nepal",
    "industrial engineering",
    "industrial engineering in Nepal",
    "engineering in Nepal",
    "industrial engineering students",
    "industrial engineering students nepal",
    "Society of Industrial Engineering Students",
    "Pulchowk",
    "IOE",
    "Tribhuvan University",
  ],
  applicationName: "SOIES Nepal",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "SOIES Nepal | Industrial Engineering Students in Nepal",
    description:
      "Society of Industrial Engineering Students Nepal: events, notices, resources, journals, and community for industrial engineering in Nepal.",
    siteName: "SOIES Nepal",
    locale: "en_NP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SOIES Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOIES Nepal | Industrial Engineering Students in Nepal",
    description:
      "Explore SOIES Nepal: the student community for industrial engineering in Nepal.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/soies.svg",
        href: "/soies.svg",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
