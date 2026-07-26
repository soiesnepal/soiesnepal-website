"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { Notice } from "@/constants";

function getNoticeDescriptionText(description?: Notice["description"]) {
  if (!description?.length) return "";

  return description
    .map((block) => block.children?.map((child) => child.text || "").join("") || "")
    .filter(Boolean)
    .join("\n");
}

interface NoticePopupProps {
  notice: Notice | null;
}

export default function NoticePopup({ notice }: NoticePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, [notice]);

  if (!notice) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-lg"
          >
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Image */}
              {notice.imageUrl && (
                <div className="relative w-full h-[400px] overflow-hidden">
                  <Image
                    src={notice.imageUrl}
                    alt={notice.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain bg-slate-50 dark:bg-slate-800"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2">
                  {notice.title}
                </h3>
                {notice.description && (
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                    {getNoticeDescriptionText(notice.description)}
                  </p>
                )}
                <div className="flex gap-3">
                  {notice.pdf && (
                    <a
                      href={notice.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-lg transition-colors"
                    >
                      View Document
                    </a>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
