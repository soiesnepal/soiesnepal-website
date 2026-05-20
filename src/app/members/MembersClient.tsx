"use client";

import { motion } from "framer-motion";
import { Users, Hash, Search } from "lucide-react";
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

function formatRollNumber(batch: string, rollNumber: number) {
  return `THA${batch}BIE0${String(rollNumber).padStart(2, "0")}`;
}

export default function MembersClient({ batches }: { batches: BatchGroup[] }) {
  const totalMembers = batches.reduce((sum, b) => sum + (b.members?.length || 0), 0);
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!query) return batches;
    return batches
      .map((batch) => {
        const matchedMembers = batch.members?.filter(
          (m) =>
            m.name.toLowerCase().includes(query) ||
            formatRollNumber(batch.batch, m.rollNumber).toLowerCase().includes(query) ||
            batch.batch.includes(query)
        );
        if (matchedMembers && matchedMembers.length > 0) {
          return { ...batch, members: matchedMembers };
        }
        return null;
      })
      .filter((b): b is BatchGroup => b !== null);
  }, [batches, query]);

  const filteredTotal = filtered.reduce((sum, b) => sum + (b.members?.length || 0), 0);

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
            className="flex justify-center gap-6 mt-10"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4">
              <Users className="w-5 h-5 text-gold-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-white">{totalMembers}</p>
              <p className="text-navy-400 text-xs uppercase tracking-wider">Total Members</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4">
              <Hash className="w-5 h-5 text-gold-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-white">{batches.length}</p>
              <p className="text-navy-400 text-xs uppercase tracking-wider">Batches</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="max-w-xl mx-auto"
        >
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-navy-500" />
            <input
              type="text"
              placeholder="Search by name, roll number, or batch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/50 transition-all text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-navy-300 text-xs font-medium px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          {query && (
            <p className="text-center text-xs text-slate-400 dark:text-navy-500 mt-2">
              {filteredTotal} member{filteredTotal !== 1 ? "s" : ""} found across {filtered.length} batch{filtered.length !== 1 ? "es" : ""}
            </p>
          )}
        </motion.div>
      </div>

      {/* Batch Lists */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Users size={48} className="mx-auto text-slate-300 dark:text-navy-600 mb-4" />
            <p className="text-slate-500 dark:text-navy-400 text-lg">
              {query ? `No results found for "${search}"` : "No member data available yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {filtered.map((batch, bi) => (
              <motion.div
                key={batch._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: bi * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    Batch {batch.batch}
                  </h2>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
                    {batch.members?.length || 0} students
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-navy-900/30 border border-slate-200 dark:border-navy-800/50 rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-[auto_1fr_1fr] gap-4 p-4 bg-slate-100 dark:bg-navy-800/30 border-b border-slate-200 dark:border-navy-700/30">
                    <span className="text-slate-500 dark:text-navy-400 text-xs font-semibold uppercase tracking-wider w-10">#</span>
                    <span className="text-slate-500 dark:text-navy-400 text-xs font-semibold uppercase tracking-wider">Name</span>
                    <span className="text-slate-500 dark:text-navy-400 text-xs font-semibold uppercase tracking-wider">Roll Number</span>
                  </div>
                  {batch.members?.map((member, mi) => (
                    <div
                      key={mi}
                      className="grid grid-cols-[auto_1fr_1fr] gap-4 p-4 border-b border-slate-100 dark:border-navy-800/30 last:border-b-0 hover:bg-slate-50 dark:hover:bg-navy-800/20 transition-colors"
                    >
                      <span className="text-slate-400 dark:text-navy-500 text-sm w-10">{mi + 1}</span>
                      <span className="text-slate-900 dark:text-white font-medium text-sm">{member.name}</span>
                      <span className="text-gold-600 dark:text-gold-400 font-mono text-sm">
                        {formatRollNumber(batch.batch, member.rollNumber)}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
