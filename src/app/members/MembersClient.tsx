"use client";

import { motion } from "framer-motion";
import { Users, Hash, Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

interface Member {
  name: string;
  rollNumber: number;
}

interface BatchGroup {
  _id: string;
  batch: string;
  members: Member[];
}

interface MemberRow {
  _id: string;
  name: string;
  rollNumber: number;
  batch: string;
}

const ITEMS_PER_PAGE = 18;

function formatRollNumber(batch: string, rollNumber: number) {
  if (!rollNumber || rollNumber <= 0) return "N/A";
  return `THA${batch}BIE0${String(rollNumber).padStart(2, "0")}`;
}

export default function MembersClient({ batches }: { batches: BatchGroup[] }) {
  const totalMembers = batches.reduce((sum, b) => sum + (b.members?.length || 0), 0);
  const [search, setSearch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "batch" | "roll">("batch");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const query = search.trim().toLowerCase();
  const hasActiveSearch = query.length > 0;

  const flatMembers = useMemo<MemberRow[]>(() => {
    return batches.flatMap((batch) =>
      (batch.members || []).map((member, index) => ({
        _id: `${batch._id}-${index}`,
        name: member.name,
        rollNumber: member.rollNumber,
        batch: batch.batch,
      }))
    );
  }, [batches]);

  const batchOptions = useMemo(() => {
    return [...new Set(flatMembers.map((m) => m.batch))].sort((a, b) => b.localeCompare(a));
  }, [flatMembers]);

  const filtered = useMemo(() => {
    let result = flatMembers.filter((member) => {
      const matchesSearch =
        !query ||
        member.name.toLowerCase().includes(query) ||
        formatRollNumber(member.batch, member.rollNumber).toLowerCase().includes(query) ||
        member.batch.toLowerCase().includes(query);
      const matchesBatch = selectedBatch ? member.batch === selectedBatch : true;
      return matchesSearch && matchesBatch;
    });

    result = result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") cmp = a.name.localeCompare(b.name);
      if (sortBy === "batch") cmp = a.batch.localeCompare(b.batch);
      if (sortBy === "roll") cmp = a.rollNumber - b.rollNumber;
      return sortOrder === "asc" ? cmp : -cmp;
    });

    return result;
  }, [flatMembers, query, selectedBatch, sortBy, sortOrder]);

  const shouldShowFullList = showAll || hasActiveSearch;
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const displayedMembers = shouldShowFullList ? filtered : paginated;

  const uniqueBatches = batchOptions.length;

  return (
    <div className="min-h-screen bg-white dark:bg-navy-950">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-navy-900 to-navy-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gold-500 rounded-full blur-3xl hidden md:block" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl hidden md:block" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold-500/20 text-gold-400 border border-gold-500/30 mb-6">
              Industrial Engineering Students
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
              General <span className="gradient-text">Members</span>
            </h1>
            <p className="text-navy-300 text-lg max-w-2xl mx-auto">
              Batch-wise list of Industrial Engineering students at Thapathali Campus
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 gap-4 mt-10 max-w-xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4">
              <Users className="w-5 h-5 text-gold-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-white">{totalMembers}</p>
              <p className="text-navy-400 text-xs uppercase tracking-wider">Total Members</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4">
              <Hash className="w-5 h-5 text-gold-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-white">{uniqueBatches}</p>
              <p className="text-navy-400 text-xs uppercase tracking-wider">Batches</p>
            </div>
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
              placeholder="Search by name, roll number, or batch..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-navy-500 focus:outline-none focus:border-gold-500/50 transition-colors"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={selectedBatch}
              onChange={(e) => {
                setSelectedBatch(e.target.value);
                setPage(1);
              }}
              className="px-4 py-3 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 rounded-xl text-slate-700 dark:text-navy-200 focus:outline-none focus:border-gold-500/50 transition-colors"
            >
              <option value="">All Batches</option>
              {batchOptions.map((batch) => (
                <option key={batch} value={batch}>
                  Batch {batch}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "batch" | "roll")}
              className="px-4 py-3 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 rounded-xl text-slate-700 dark:text-navy-200 focus:outline-none focus:border-gold-500/50 transition-colors"
            >
              <option value="batch">Sort by Batch</option>
              <option value="name">Sort by Name</option>
              <option value="roll">Sort by Roll</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-4 py-3 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 rounded-xl text-slate-700 dark:text-navy-200 hover:border-gold-500/50 transition-colors"
              aria-label="Toggle sorting direction"
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

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <p className="text-slate-500 dark:text-navy-400 text-sm">
            Showing {displayedMembers.length} of {filtered.length} members
            {!shouldShowFullList && ` (page ${page} of ${totalPages})`}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="px-4 py-2 bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-navy-200 text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-navy-700 transition-colors"
            >
              {showAll ? "Use Paginated View" : "Show All Members"}
            </button>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                className="px-4 py-2 bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-navy-200 text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-navy-700 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {displayedMembers.length === 0 ? (
          <div className="text-center py-20">
            <Users size={48} className="mx-auto text-slate-300 dark:text-navy-600 mb-4" />
            <p className="text-slate-500 dark:text-navy-400 text-lg">
              {query ? `No results found for "${search}"` : "No member data available yet."}
            </p>
          </div>
        ) : (
          <>
            {viewMode === "cards" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedMembers.map((member, i) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="bg-slate-50 dark:bg-navy-900/30 border border-slate-200 dark:border-navy-800/50 rounded-xl p-5 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-lg shrink-0">
                        {member.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-slate-900 dark:text-white font-semibold truncate">{member.name}</h3>
                        <p className="text-slate-500 dark:text-navy-400 text-sm mt-1 font-mono truncate">
                          {formatRollNumber(member.batch, member.rollNumber)}
                        </p>
                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
                          Batch {member.batch}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-50 dark:bg-navy-900/30 border border-slate-200 dark:border-navy-800/50 rounded-2xl overflow-hidden"
              >
                <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 p-4 bg-slate-100 dark:bg-navy-800/30 border-b border-slate-200 dark:border-navy-700/30">
                  <span className="text-slate-500 dark:text-navy-400 text-sm font-semibold uppercase tracking-wider">Name</span>
                  <span className="text-slate-500 dark:text-navy-400 text-sm font-semibold uppercase tracking-wider">Roll Number</span>
                  <span className="text-slate-500 dark:text-navy-400 text-sm font-semibold uppercase tracking-wider text-right">Batch</span>
                </div>
                {displayedMembers.map((member, i) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.015 }}
                    className="grid grid-cols-[2fr_2fr_1fr] gap-4 p-4 border-b border-slate-100 dark:border-navy-800/30 hover:bg-slate-50 dark:hover:bg-navy-800/20 transition-colors"
                  >
                    <span className="text-slate-900 dark:text-white font-medium">{member.name}</span>
                    <span className="text-slate-600 dark:text-navy-300 font-mono">{formatRollNumber(member.batch, member.rollNumber)}</span>
                    <span className="text-gold-500 dark:text-gold-400 font-semibold text-right">{member.batch}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}

        {!shouldShowFullList && totalPages > 1 && (
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

        {hasActiveSearch && (
          <p className="text-center text-xs text-slate-400 dark:text-navy-500 mt-5">
            Showing all search results. Clear search to return to paginated view.
          </p>
        )}
      </div>
    </div>
  );
}
