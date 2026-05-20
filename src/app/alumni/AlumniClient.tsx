"use client";


import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Users, GraduationCap, Briefcase, TrendingUp, X } from "lucide-react";

interface Alumni {
  _id: string;
  name: string;
  currentPosition: string;
  description?: string;
  Batch: number;
  photoUrl?: string;
}

const ITEMS_PER_PAGE = 12;

function ProfilePopup({ alumnus, onClose }: { alumnus: Alumni; onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-sm"
      >
        <div className="bg-white dark:bg-navy-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-navy-700">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-100 dark:bg-navy-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-navy-700 transition-colors"
          >
            <X size={16} />
          </button>

          <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            {alumnus.photoUrl ? (
              <Image
                src={alumnus.photoUrl}
                alt={`Portrait of ${alumnus.name}`}
                width={192}
                height={192}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-navy-950 font-black text-4xl">{alumnus.name.charAt(0)}</span>
              </div>
            )}
          </div>

          <div className="p-6 text-center">
            <h3 className="text-slate-900 dark:text-white font-bold text-xl">{alumnus.name}</h3>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
              Batch {alumnus.Batch}
            </span>
            {alumnus.currentPosition && (
              <p className="text-slate-600 dark:text-navy-300 text-sm mt-3">{alumnus.currentPosition}</p>
            )}
            {alumnus.description && (
              <p className="text-slate-500 dark:text-navy-400 text-sm mt-2 leading-relaxed">{alumnus.description}</p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function AlumniClient({ alumni }: { alumni: Alumni[] }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "batch">("batch");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);
  const [selectedAlumnus, setSelectedAlumnus] = useState<Alumni | null>(null);

  const batches = useMemo(() => {
    return [...new Set(alumni.map((a) => a.Batch))].sort((a, b) => b - a);
  }, [alumni]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    let result = alumni.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(term) ||
        (a.currentPosition || "").toLowerCase().includes(term) ||
        String(a.Batch).includes(term);
      const matchesBatch = selectedBatch ? a.Batch === selectedBatch : true;
      return matchesSearch && matchesBatch;
    });

    result.sort((a, b) => {
      if (sortBy === "name") {
        const cmp = a.name.localeCompare(b.name);
        return sortOrder === "asc" ? cmp : -cmp;
      } else {
        const cmp = a.Batch - b.Batch;
        return sortOrder === "asc" ? cmp : -cmp;
      }
    });

    return result;
  }, [alumni, search, sortBy, sortOrder, selectedBatch]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const stats = useMemo(() => {
    const uniqueBatches = new Set(alumni.map((a) => a.Batch));
    const withPositions = alumni.filter((a) => a.currentPosition && a.currentPosition.trim() !== "");
    return {
      total: alumni.length,
      batches: uniqueBatches.size,
      employed: withPositions.length,
      latestBatch: alumni.length > 0 ? Math.max(...alumni.map((a) => a.Batch)) : 0,
    };
  }, [alumni]);

  return (
    <div className="min-h-screen bg-white dark:bg-navy-950">
      <AnimatePresence>
        {selectedAlumnus && (
          <ProfilePopup alumnus={selectedAlumnus} onClose={() => setSelectedAlumnus(null)} />
        )}
      </AnimatePresence>

      {/* Hero Banner */}
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
              The Strength of Industrial Engineering
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-sm">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600">Alumni</span> Network
            </h1>
            <p className="text-navy-200 text-lg max-w-2xl mx-auto font-light">
              Graduates of Industrial Engineering from Thapathali Campus &mdash; building Nepal&apos;s industrial future across the globe
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto"
          >
            {[
              { icon: Users, label: "Total Alumni", value: `${stats.total}+` },
              { icon: GraduationCap, label: "Batches", value: `${stats.batches}+` },
              { icon: TrendingUp, label: "Latest Batch", value: stats.latestBatch },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <stat.icon className="w-5 h-5 text-gold-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-navy-400 text-xs uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-navy-500" />
            <input
              type="text"
              placeholder="Search by name, position, or batch..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-navy-500 focus:outline-none focus:border-gold-500/50 transition-colors"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <select
              value={selectedBatch ?? ""}
              onChange={(e) => { setSelectedBatch(e.target.value ? Number(e.target.value) : null); setPage(1); }}
              className="px-4 py-3 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 rounded-xl text-slate-700 dark:text-navy-200 focus:outline-none focus:border-gold-500/50 transition-colors"
            >
              <option value="">All Batches</option>
              {batches.map((b) => (
                <option key={b} value={b}>Batch {b}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "batch")}
              className="px-4 py-3 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 rounded-xl text-slate-700 dark:text-navy-200 focus:outline-none focus:border-gold-500/50 transition-colors"
            >
              <option value="name">Sort by Name</option>
              <option value="batch">Sort by Batch</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-4 py-3 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 rounded-xl text-slate-700 dark:text-navy-200 hover:border-gold-500/50 transition-colors"
            >
              <ArrowUpDown size={16} />
            </button>
            <div className="flex bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("cards")}
                className={`px-3 py-3 text-sm font-medium transition-colors ${viewMode === "cards" ? "bg-gold-500 text-navy-950" : "text-slate-600 dark:text-navy-300"}`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-3 text-sm font-medium transition-colors ${viewMode === "table" ? "bg-gold-500 text-navy-950" : "text-slate-600 dark:text-navy-300"}`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        <p className="text-slate-500 dark:text-navy-400 text-sm mb-6">
          Showing {paginated.length} of {filtered.length} alumni &mdash; click to view profile
        </p>

        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginated.length > 0 ? (
              paginated.map((alumnus, i) => (
                <motion.div
                  key={alumnus._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelectedAlumnus(alumnus)}
                  className="group cursor-pointer bg-slate-50 dark:bg-navy-900/30 border border-slate-200 dark:border-navy-800/50 rounded-xl p-5 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {alumnus.photoUrl ? (
                      <Image
                        src={alumnus.photoUrl}
                        alt={`Portrait of ${alumnus.name}`}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover shrink-0"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-bold text-lg shrink-0">
                        {alumnus.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-slate-900 dark:text-white font-semibold truncate group-hover:text-gold-500 transition-colors">
                        {alumnus.name}
                      </h3>
                      <p className="text-slate-500 dark:text-navy-400 text-sm mt-0.5 truncate">
                        {alumnus.currentPosition || "\u2014"}
                      </p>
                      <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
                        Batch {alumnus.Batch}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full p-12 text-center text-slate-400 dark:text-navy-500">
                No alumni found
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-50 dark:bg-navy-900/30 border border-slate-200 dark:border-navy-800/50 rounded-2xl overflow-hidden"
          >
            <div className="grid grid-cols-[2fr_3fr_1fr] gap-4 p-4 bg-slate-100 dark:bg-navy-800/30 border-b border-slate-200 dark:border-navy-700/30">
              <span className="text-slate-500 dark:text-navy-400 text-sm font-semibold uppercase tracking-wider">Name</span>
              <span className="text-slate-500 dark:text-navy-400 text-sm font-semibold uppercase tracking-wider">Current Position</span>
              <span className="text-slate-500 dark:text-navy-400 text-sm font-semibold uppercase tracking-wider text-right">Batch</span>
            </div>
            {paginated.length > 0 ? (
              paginated.map((alumnus, i) => (
                <motion.div
                  key={alumnus._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setSelectedAlumnus(alumnus)}
                  className="grid grid-cols-[2fr_3fr_1fr] gap-4 p-4 border-b border-slate-100 dark:border-navy-800/30 hover:bg-slate-50 dark:hover:bg-navy-800/20 transition-colors cursor-pointer"
                >
                  <span className="text-slate-900 dark:text-white font-medium">{alumnus.name}</span>
                  <span className="text-slate-600 dark:text-navy-300">{alumnus.currentPosition || "\u2014"}</span>
                  <span className="text-gold-500 dark:text-gold-400 font-semibold text-right">{alumnus.Batch}</span>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 dark:text-navy-500">No alumni found</div>
            )}
          </motion.div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-slate-500 dark:text-navy-400 text-sm">Page {page} of {totalPages}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                <ChevronLeft size={16} className="inline mr-1" /> Prev
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) pageNum = i + 1;
                else if (page <= 3) pageNum = i + 1;
                else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = page - 2 + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${page === pageNum ? "bg-gold-500 text-navy-950" : "bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-navy-300 hover:bg-slate-200 dark:hover:bg-navy-700"}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-700 text-slate-900 dark:text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Next <ChevronRight size={16} className="inline ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
