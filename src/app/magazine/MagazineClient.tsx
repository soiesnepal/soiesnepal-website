"use client";

import { motion } from "framer-motion";
import { Download, BookOpen } from "lucide-react";
import Image from "next/image";

interface Magazine {
  _id: string;
  title: string;
  issueNumber?: number;
  description?: string;
  cover?: string | null;
  resources?: string;
}

export default function MagazineClient({ magazines }: { magazines: Magazine[] }) {
  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-100 dark:bg-navy-800 text-gold-500 dark:text-gold-400 border border-slate-200 dark:border-navy-700 mb-4">
            Publications
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
            <span className="gradient-text">Industrial Vision</span> Magazines
          </h1>
        </motion.div>

        <div className="space-y-4">
          {magazines.map((mag, i) => (
            <motion.div
              key={mag._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-5 p-5 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-800/50 rounded-xl hover:border-gold-500/30 transition-all card-hover group"
            >
              {/* Cover */}
              <div className="relative w-20 h-28 rounded-lg overflow-hidden bg-slate-100 dark:bg-navy-800 shrink-0 border border-slate-200 dark:border-navy-700/50">
                {mag.cover ? (
                  <Image
                    src={mag.cover}
                    alt={mag.title}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-105 transition-transform"
                    priority={i < 4}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={28} className="text-navy-600" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h4 className="text-slate-900 dark:text-white font-bold text-lg group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors">
                  {mag.title}
                </h4>
                {mag.description && (
                  <p className="text-slate-500 dark:text-navy-400 text-sm">{mag.description}</p>
                )}
              </div>

              {/* Download */}
              {mag.resources && (
                <a
                  href={mag.resources}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-navy-800 hover:bg-gold-500 text-slate-600 dark:text-navy-300 hover:text-navy-950 font-semibold text-sm rounded-lg transition-all shrink-0"
                >
                  <Download size={16} /> Download
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
