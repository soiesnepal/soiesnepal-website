"use client";

import { motion } from "framer-motion";
import { FileText, Download, Bell } from "lucide-react";

interface Notice {
  _id: string;
  title: string;
  description?: Array<{
    _key?: string;
    _type?: string;
    children?: Array<{ text?: string }>;
  }>;
  category?: string;
  showAsPopup?: boolean;
  imageUrl?: string;
  pdf?: string;
}

function getNoticeDescriptionText(description?: Notice["description"]) {
  if (!description?.length) return "";

  return description
    .map((block) => block.children?.map((child) => child.text || "").join("") || "")
    .filter(Boolean)
    .join("\n");
}

const categoryColors: Record<string, string> = {
  academic: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  administrative: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  event: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  other: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
};

export default function NoticesClient({ notices }: { notices: Notice[] }) {
  return (
    <div className="min-h-screen bg-white dark:bg-navy-950">
      {/* Hero */}
      <div className="relative bg-navy-950 pt-32 pb-20 overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 to-navy-950/20" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold-500/10 text-gold-400 border border-gold-500/20 mb-6">
              Stay Informed
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-sm">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600">Notices</span> &amp; Announcements
            </h1>
            <p className="text-navy-200 text-lg max-w-2xl mx-auto font-light">
              Official notices and announcements from SOIES Nepal
            </p>
          </motion.div>
        </div>
      </div>

      {/* Notices List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {notices.length === 0 ? (
          <div className="text-center py-20">
            <Bell size={48} className="mx-auto text-slate-300 dark:text-navy-600 mb-4" />
            <p className="text-slate-500 dark:text-navy-400 text-lg">No notices at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice, i) => {
              const catClass = categoryColors[notice.category || "other"] || categoryColors.other;
              return (
                <motion.div
                  key={notice._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-50 dark:bg-navy-900/30 border border-slate-200 dark:border-navy-800/50 rounded-xl p-6 hover:border-gold-500/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {notice.category && (
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${catClass}`}>
                            {notice.category}
                          </span>
                        )}
                      </div>
                      <h2 className="text-slate-900 dark:text-white font-bold text-lg">
                        {notice.title}
                      </h2>
                      {notice.description && (
                        <p className="text-slate-500 dark:text-navy-400 text-sm mt-2 leading-relaxed">
                          {getNoticeDescriptionText(notice.description)}
                        </p>
                      )}
                    </div>

                    {notice.imageUrl && (
                      <img
                        src={notice.imageUrl}
                        alt={notice.title}
                        className="w-20 h-20 rounded-lg object-cover shrink-0 hidden sm:block"
                      />
                    )}
                  </div>

                  {(notice.pdf || notice.imageUrl) && (
                    <div className="flex gap-3 mt-4">
                      {notice.pdf && (
                        <a
                          href={notice.pdf}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-sm rounded-lg transition-colors"
                        >
                          <FileText size={14} />
                          View Document
                        </a>
                      )}
                      {notice.imageUrl && (
                        <a
                          href={notice.imageUrl}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-navy-200 text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-navy-700 transition-colors"
                        >
                          <Download size={14} />
                          View Image
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
