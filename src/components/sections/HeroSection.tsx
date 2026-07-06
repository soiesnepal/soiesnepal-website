
// Removed framer-motion for performance
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-[90vh] min-h-[600px] overflow-hidden bg-slate-50 dark:bg-navy-950">
      {/* Background Image — now using next/image for LCP prioritization */}
      <div className="absolute inset-0 scale-105">
        <Image
          src="/Hero.png"
          alt="SOIES team at a seminar"
          priority
          fill
          sizes="100vw"
          quality={80}
          className="object-cover object-center opacity-20 mix-blend-multiply dark:mix-blend-overlay dark:opacity-30"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/80 dark:to-navy-950/80" />

      {/* No animated particles or glowing elements */}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div>
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-200/50 dark:bg-white/15 text-slate-800 dark:text-white border border-slate-300 dark:border-white/30 backdrop-blur-sm">
              Est. Since 2062 B.S.
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
            <span className="text-slate-900 dark:text-white">SOIES</span>{" "}
            <span className="text-slate-900 dark:text-white">Nepal</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-navy-200 font-medium mb-3 max-w-2xl mx-auto">
            Society of Industrial Engineering Students
          </p>

          <p className="text-sm sm:text-base text-slate-500 dark:text-navy-300 mb-10 max-w-xl mx-auto">
            Empowering Industrial Engineering for Nepal&apos;s Future, where juniors can learn with guidance and support from seniors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#about"
              className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white dark:text-navy-950 font-bold rounded-lg hover:from-gold-600 hover:to-gold-700 dark:hover:from-gold-400 dark:hover:to-gold-500 transition-all shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40"
            >
              Discover More
            </a>
            <a
              href="#events"
              className="px-8 py-3.5 border border-slate-300 dark:border-navy-400/50 text-slate-700 dark:text-navy-200 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-navy-800/50 hover:border-gold-500/50 hover:text-gold-600 dark:hover:text-gold-400 transition-all shadow-sm"
            >
              View Events
            </a>
            <a
              href="https://www.facebook.com/soiesnepal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Us To Join Discord Channel"
              className="px-8 py-3.5 bg-[#1877F2] text-white font-bold rounded-lg shadow-lg hover:bg-[#166FE5] transition-all flex items-center gap-2 justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.061C22 6.505 17.523 2 12 2S2 6.505 2 12.061c0 5.022 3.657 9.186 8.438 9.939v-7.03H7.898v-2.909h2.54V9.845c0-2.518 1.492-3.91 3.777-3.91 1.094 0 2.238.196 2.238.196v2.475H15.19c-1.243 0-1.63.775-1.63 1.57v1.885h2.773l-.443 2.909H13.56V22c4.78-.753 8.44-4.917 8.44-9.939z" fill="white"/></svg>
              Message Us To Join Discord Channel
            </a>
          </div>
        </div>

        {/* No scroll indicator */}
      </div>
    </section>
  );
}
