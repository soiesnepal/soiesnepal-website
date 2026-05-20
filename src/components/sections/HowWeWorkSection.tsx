"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const workItems = [
  {
    image: "/expert.jpeg",
    title: "Collaboration with Industry",
    description:
      "Co-organize events with other colleges for national Industrial, Automobile, and Mechanical Tech fests.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    image: "/networking.webp",
    title: "Forum for Networking",
    description:
      "Provide a platform for development, networking, information sharing, idea exchange, and problem-solving in industrial engineering.",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    image: "/seminar.webp",
    title: "Support for Scholars",
    description:
      "Organize regular programs to support industrial engineering students.",
    gradient: "from-green-500 to-green-600",
  },
  {
    image: "/vision1.png",
    title: "Annual Magazine: INDUSTRIAL VISION",
    description:
      "Publish a magazine highlighting practical solutions for industrial challenges and success stories.",
    gradient: "from-gold-500 to-gold-600",
  },
  {
    image: "/project.webp",
    title: "Productivity Improvements",
    description:
      "Explore sources of productivity improvement through research, publications, seminars, and discussions.",
    gradient: "from-red-500 to-red-600",
  },
];

export default function HowWeWorkSection() {


  return (
    <section className="py-24 bg-slate-50 dark:bg-navy-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-white dark:bg-navy-800 text-gold-500 dark:text-gold-400 border border-slate-200 dark:border-navy-700 mb-4">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
            How we <span className="gradient-text">work?</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative p-6 rounded-2xl bg-white dark:bg-navy-950/50 border border-slate-200 dark:border-navy-800/50 hover:border-gold-500/30 card-hover overflow-hidden ${
                i === 3 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Image banner */}
              <div className="h-48 -mx-6 -mt-6 mb-5 overflow-hidden relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={i < 2}
                />
                {/* Removed white glow overlay for performance and clarity */}
              </div>

              <div className="relative z-10">
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-navy-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
