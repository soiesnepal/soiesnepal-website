"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
// === GRAVITY BOMB EASTER EGG (easy to remove) ===
// Triggers a global event for the overlay
import { Target, Lightbulb, Cog } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-navy-950 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-navy-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-100 dark:bg-navy-800 text-gold-500 dark:text-gold-400 border border-slate-200 dark:border-navy-700 mb-4">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Empowering Industrial Engineering for{" "}
              <span className="gradient-text">Nepal&apos;s Future</span>
            </h2>
            <p className="text-slate-600 dark:text-navy-300 text-lg leading-relaxed mb-8">
              At SOIES Nepal, we are dedicated to fostering a vibrant community
              of industrial engineering scholars and professionals. Our mission
              is to enhance efficiency, innovation, and problem-solving within
              Nepal&apos;s industrial sector.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#events"
                className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold rounded-lg text-sm hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/20"
              >
                Our Events
              </a>
              <a
                href="/teams"
                className="px-6 py-3 border border-slate-300 dark:border-navy-600 text-slate-700 dark:text-navy-200 font-medium rounded-lg text-sm hover:border-gold-500/50 hover:text-gold-500 dark:hover:text-gold-400 transition-all"
              >
                Meet the Team
              </a>
            </div>
          </motion.div>

          {/* Right: Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To enhance efficiency, innovation, and problem-solving within Nepal's industrial sector.",
                color: "from-gold-500 to-gold-600",
              },
              {
                icon: Lightbulb,
                title: "Our Vision",
                desc: "A vibrant community of industrial engineering scholars driving Nepal's industrial growth.",
                color: "from-navy-500 to-navy-600",
              },
              {
                icon: Cog,
                title: "What We Do",
                desc: "Organize programs, seminars, research publications, and co-organize national Industrial, Automobile & Mechanical Tech Fests across colleges.",
                color: "from-gold-600 to-gold-700",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="flex gap-4 p-5 rounded-xl bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-800/50 hover:border-gold-500/30 transition-all group card-hover"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <item.icon size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">{item.title}</h4>
                  <p className="text-slate-500 dark:text-navy-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
            {/* === GRAVITY BOMB EASTER EGG: Overlay is now global === */}
          </motion.div>
        </div>
      </div>
      {/* === GRAVITY BOMB EASTER EGG: CSS === */}
      <style jsx global>{`
        .gravity-bomb-shake {
          animation: shake 0.7s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-2px, 0, 0); }
          20%, 80% { transform: translate3d(4px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-8px, 0, 0); }
          40%, 60% { transform: translate3d(8px, 0, 0); }
        }
        .gravity-fact {
          position: absolute;
          top: 0;
          font-size: 1rem;
          background: rgba(255,255,255,0.95);
          color: #bfa14a;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          pointer-events: none;
          animation: gravity-fall 1.7s cubic-bezier(.2,.7,.4,1) forwards;
        }
        @keyframes gravity-fall {
          0% { top: 0; opacity: 1; }
          80% { opacity: 1; }
          100% { top: 90vh; opacity: 0.7; }
        }
      `}</style>
      {/* === END GRAVITY BOMB EASTER EGG === */}
    </section>
  );
}
