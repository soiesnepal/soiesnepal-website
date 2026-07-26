"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Image as ImageIcon, FileText, ExternalLink } from "lucide-react";
import { Notice } from "@/constants";
import Image from "next/image";

function getNoticeDescriptionText(description?: Notice["description"]) {
  if (!description?.length) return "";

  return description
    .map((block) => block.children?.map((child) => child.text || "").join("") || "")
    .filter(Boolean)
    .join("\n");
}

interface NoticeSectionProps {
  notices: Notice[];
}

export default function NoticeSection({ notices }: NoticeSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const displayNotices = notices;

  return (
    <section id="notice" className="py-24 bg-slate-50 dark:bg-navy-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-navy-600/5 rounded-full blur-3xl hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-white dark:bg-navy-800 text-gold-500 dark:text-gold-400 border border-slate-200 dark:border-navy-700 mb-4">
            Latest Updates
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
            <span className="gradient-text">Notice</span> Board
          </h2>
        </motion.div>

        {displayNotices.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-500 dark:text-navy-400 text-lg">No notices at the moment.</p>
          </div>
        ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayNotices.map((notice, i) => (
            <motion.div
              key={notice._id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white dark:bg-navy-900/50 rounded-2xl border border-slate-200 dark:border-navy-800/50 overflow-hidden card-hover hover:border-gold-500/30"
            >
              {/* Notice Image/Document Preview */}
              <div className="h-48 bg-slate-100 dark:bg-navy-800/50 flex items-center justify-center overflow-hidden">
                {notice.imageUrl ? (
                  <Image
                    src={notice.imageUrl}
                    alt={`Notice: ${notice.title}`}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center text-navy-500">
                    <FileText size={40} />
                    <span className="text-xs mt-2">Document</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="text-slate-900 dark:text-white font-bold text-base mb-2 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors line-clamp-2">
                  {notice.title}
                </h4>
                {notice.description && (
                    <p className="text-slate-500 dark:text-navy-400 text-sm line-clamp-3 mb-4">
                    {getNoticeDescriptionText(notice.description)}
                  </p>
                )}

                {/* Action Button */}
                <div className="flex gap-2">
                  {notice.pdf && (
                    <a
                      href={notice.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy-600 hover:bg-navy-500 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      <FileText size={14} /> View PDF
                    </a>
                  )}
                  {notice.imageUrl && (
                    <a
                      href={notice.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      <ImageIcon size={14} /> View Image
                    </a>
                  )}
                  {!notice.pdf && !notice.imageUrl && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy-700 text-navy-300 text-xs font-semibold rounded-lg">
                      <ExternalLink size={14} /> View Details
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
