
import Link from "next/link";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/soies-nepal-18984b280/",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      hoverClass: "hover:bg-[#0077B5]",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/soies_nepal",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
      hoverClass: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737]",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@SOIESNepal",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      hoverClass: "hover:bg-[#FF0000]",
    },
    {
      name: "Discord",
      href: "https://discord.gg/CaKVvnE9z",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
        </svg>
      ),
      hoverClass: "hover:bg-[#5865F2]",
    },
  ];

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "9840257131", href: "tel:9840257131" },
    { icon: Mail, label: "Email", value: "info.soiesnepal@gmail.com", href: "mailto:info.soiesnepal@gmail.com" },
    { icon: Globe, label: "Website", value: "www.soiesnepal.org.np", href: "https://www.soiesnepal.org.np" },
  ];

  const quickLinks = [
    { label: "Notices", href: "/notices" },
    { label: "Alumni", href: "/alumni" },
    { label: "Members", href: "/members" },
    { label: "Teams", href: "/teams" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-navy-950 border-t border-slate-200 dark:border-navy-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {/* Column 1: Logo + Org Name + Socials */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-3 mb-4">
              <Image
                src="/soies.svg"
                alt="SOIES Nepal logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain flex-shrink-0"
                priority
              />
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-xs leading-tight uppercase">
                  Society of Industrial
                </p>
                <p className="text-slate-900 dark:text-white font-bold text-xs leading-tight uppercase">
                  Engineering Students
                </p>
                <p className="text-amber-600 dark:text-amber-400 font-bold text-xs leading-tight uppercase mt-0.5">
                  SOIES Nepal
                </p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full bg-slate-200 dark:bg-navy-800 flex items-center justify-center text-slate-600 dark:text-navy-300 hover:text-white transition-all ${social.hoverClass}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-2.5 group"
                  aria-label={item.label}
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-navy-800 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20 transition-colors">
                    <item.icon size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-900 dark:text-white font-semibold text-xs">
                      {item.label}
                    </p>
                    <p className="text-slate-600 dark:text-navy-300 text-xs truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-navy-300 hover:text-amber-600 dark:hover:text-amber-400 text-sm transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-navy-800/50">
          <p className="text-slate-500 dark:text-navy-400 text-xs text-center">
            &copy; {currentYear} SOIES Nepal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
