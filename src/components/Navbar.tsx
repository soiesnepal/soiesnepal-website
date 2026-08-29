"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { Menu, X, Sun, Moon } from "lucide-react";

// Secondary utility links (top bar)
const utilityLinks = [
  { href: "/alumni", label: "Alumni" },
  { href: "/teams", label: "Teams" },
  { href: "/journal", label: "Academic Papers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/magazine", label: "Magazine" },
  { href: "/notices", label: "Notices" },
  { href: "/members", label: "Members" },
];

// Primary navigation links (main bar)
const mainLinks = [
  { href: "/#home", label: "Home" },
  { href: "/library", label: "Library" },
  { href: "/events", label: "Events" },
  { href: "/previous-committees", label: "Previous Committees" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);

  useEffect(() => setMounted(true), []);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Hide top bar on scroll
  useEffect(() => {
    let lastScroll = 0;
    
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll <= 10) {
        setShowTopBar(true); // Always show at top of page
      } else if (currentScroll > lastScroll) {
        setShowTopBar(false); // Scrolling down - hide
      } else {
        setShowTopBar(true); // Scrolling up - show
      }
      
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ===== TOP UTILITY BAR (Desktop only) ===== */}
      <div 
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 bg-slate-100 dark:bg-navy-950 border-b border-slate-200 dark:border-navy-800 transition-transform duration-300 ${
          showTopBar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1 text-xs font-medium text-slate-600 dark:text-navy-300 hover:text-amber-600 dark:hover:text-amber-400 rounded transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav 
        className={`fixed left-0 right-0 z-40 bg-white dark:bg-navy-900 backdrop-blur-md border-b border-slate-200 dark:border-navy-800 shadow-sm transition-all duration-300 top-0 ${
          showTopBar ? 'lg:top-9' : 'lg:top-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0"
              onClick={handleHomeClick}
            >
              <Image src="/soies.svg" alt="SOIES logo" width={40} height={40} />
              <div className="hidden md:block">
                <p className="text-slate-900 dark:text-white font-semibold text-sm leading-tight">
                  Society of Industrial Engineering
                </p>
                <p className="text-slate-500 dark:text-navy-400 text-xs leading-tight">
                  Students · SOIES Nepal
                </p>
              </div>
              <span className="md:hidden text-slate-900 dark:text-white font-bold text-base">
                SOIES Nepal
              </span>
            </Link>

            {/* Desktop: Main nav links + theme */}
            <div className="hidden lg:flex items-center gap-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.href.startsWith("/#home") ? handleHomeClick : undefined}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-navy-800/50 ${
                    pathname === link.href ? "text-slate-700 dark:text-navy-200" : "text-slate-500 dark:text-navy-300"
                  }`}
                  aria-label={link.label}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="w-px h-5 bg-slate-200 dark:bg-navy-700 mx-1" />
              
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg text-slate-600 dark:text-navy-300 hover:bg-slate-100 dark:hover:bg-navy-800"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
            </div>

            {/* Mobile: Theme + Menu button */}
            <div className="flex lg:hidden items-center gap-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        {menuOpen && (
          <div id="mobile-nav-menu" className="lg:hidden border-t border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900">
            <div className="px-4 py-3">
              {/* Main links */}
              <div className="space-y-1 mb-3">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 text-base font-semibold text-slate-800 dark:text-navy-100 hover:bg-slate-100 dark:hover:bg-navy-800/50 rounded-lg"
                    aria-label={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Divider */}
              <div className="h-px bg-slate-200 dark:bg-navy-800 my-3" />
              
              {/* Utility links in grid */}
              <div className="grid grid-cols-2 gap-1">
                {utilityLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-navy-300 hover:bg-slate-100 dark:hover:bg-navy-800/50 rounded-lg"
                    aria-label={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer - desktop has top bar (9px) + nav (64px), mobile just nav */}
      <div className="h-16 lg:h-[100px]" />
    </>
  );
}