"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  rank?: number;
  description?: string;
  photoUrl?: string | null;
  committee?: string;
}

function MemberCard({
  member,
  featured = false,
  onClick,
}: {
  member: TeamMember;
  featured?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      role="button"
      tabIndex={0}
      aria-label={`View profile of ${member.name}`}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
        featured
          ? "border-2 border-gold-500/50 shadow-2xl shadow-gold-500/10 hover:shadow-gold-500/20 hover:border-gold-500/70"
          : "border border-slate-200 dark:border-navy-700/50 shadow-lg hover:border-gold-500/40 hover:shadow-xl"
      }`}
    >
      {/* Photo */}
      <div className="aspect-[3/4] relative bg-gradient-to-br from-navy-800 to-navy-900">
        {member.photoUrl ? (
          <Image
            src={require("../../lib/sanity").urlFor(member.photoUrl).width(400).auto('format').url()}
            alt={`Portrait of ${member.name}`}
            fill
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy-800 dark:to-navy-900">
            <User size={featured ? 72 : 48} className="text-slate-300 dark:text-navy-700" />
          </div>
        )}
        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <p className={`text-[11px] font-bold tracking-[0.15em] uppercase mb-1 ${
            featured ? "text-gold-400" : "text-gold-400/70"
          }`}>
            {member.position}
          </p>
          <h3 className={`text-white font-bold leading-snug ${featured ? "text-lg sm:text-xl" : "text-sm sm:text-base"}`}>
            {member.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

function ProfilePopup({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="bg-white dark:bg-navy-900 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200 dark:border-navy-700 my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo */}
        <div className="aspect-square relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy-800 dark:to-navy-900">
          {member.photoUrl ? (
            <Image
              src={require("../../lib/sanity").urlFor(member.photoUrl).width(600).auto('format').url()}
              alt={`Portrait of ${member.name}`}
              fill
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User size={80} className="text-slate-300 dark:text-navy-700" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Info */}
        <div className="p-5 sm:p-6">
          <p className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-1">
            {member.position}
          </p>
          <h3 className="text-slate-900 dark:text-white text-xl font-bold">
            {member.name}
          </h3>
          {member.description && (
            <p className="text-slate-500 dark:text-navy-300 text-sm leading-relaxed mt-3">
              {member.description}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface InternProfile {
  _id: string;
  name: string;
  batch?: string;
  photoUrl?: string;
  message?: string;
}

interface InternGroup {
  _id: string;
  batchTitle: string;
  interns: InternProfile[];
}

function InternCard({
  intern,
  onClick,
}: {
  intern: InternProfile;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      role="button"
      tabIndex={0}
      aria-label={`View profile of ${intern.name}`}
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-slate-200 dark:border-navy-700/50 shadow-lg hover:border-gold-500/40 hover:shadow-xl"
    >
      <div className="aspect-[3/4] relative bg-gradient-to-br from-navy-800 to-navy-900">
        {intern.photoUrl ? (
          <Image
            src={require("../../lib/sanity").urlFor(intern.photoUrl).width(400).auto('format').url()}
            alt={`Portrait of ${intern.name}`}
            fill
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy-800 dark:to-navy-900">
            <User size={48} className="text-slate-300 dark:text-navy-700" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-1 text-gold-400/70">
            Intern
          </p>
          <h3 className="text-white font-bold leading-snug text-sm sm:text-base">
            {intern.name}
          </h3>
          {intern.batch && (
            <p className="text-[11px] text-gold-200/80 mt-1">Batch {intern.batch}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function InternPopup({
  intern,
  onClose,
}: {
  intern: InternProfile;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="bg-white dark:bg-navy-900 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200 dark:border-navy-700 my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-square relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy-800 dark:to-navy-900">
          {intern.photoUrl ? (
            <Image
              src={require("../../lib/sanity").urlFor(intern.photoUrl).width(600).auto('format').url()}
              alt={`Portrait of ${intern.name}`}
              fill
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User size={80} className="text-slate-300 dark:text-navy-700" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-1">
            Intern
          </p>
          <h3 className="text-slate-900 dark:text-white text-xl font-bold">
            {intern.name}
          </h3>
          {intern.batch && (
            <p className="text-slate-500 dark:text-navy-300 text-sm mt-2">Batch {intern.batch}</p>
          )}
          {intern.message && (
            <p className="text-slate-500 dark:text-navy-300 text-sm leading-relaxed mt-3">
              {intern.message}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TeamsClient({ team, interns }: { team: TeamMember[], interns?: InternGroup[] }) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [selectedIntern, setSelectedIntern] = useState<InternProfile | null>(null);

  // Group members by committee
  const committeeMap = new Map<string, TeamMember[]>();
  for (const member of team) {
    const key = member.committee || "18th Executive Committee";
    if (!committeeMap.has(key)) committeeMap.set(key, []);
    committeeMap.get(key)!.push(member);
  }

  // Sort committees: extract number, highest first (latest committee first)
  const committees = [...committeeMap.keys()].sort((a, b) => {
    const numA = parseInt(a) || 0;
    const numB = parseInt(b) || 0;
    return numB - numA;
  });

  const [activeCommittee, setActiveCommittee] = useState(committees[0] || "18th Executive Committee");
  const members = committeeMap.get(activeCommittee) || [];

  const allInternGroups = interns || [];

  // Use rank to determine rows
  const sorted = [...members].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
  const president = sorted.find((m) => m.rank === 1);
  const vp = sorted.find((m) => m.rank === 2);
  const secretary = sorted.find((m) => m.rank === 3);
  const row2 = sorted.filter((m) => m.rank && m.rank >= 4 && m.rank <= 7);
  const row3 = sorted.filter((m) => !m.rank || m.rank >= 8);

  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 py-16 sm:py-20 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-100 dark:bg-navy-800 text-gold-500 dark:text-gold-400 border border-slate-200 dark:border-navy-700 mb-4">
            <Shield size={12} />
            Our People
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
            <span className="gradient-text">Executive</span> Committee
          </h1>
          <p className="text-slate-500 dark:text-navy-300 mt-4 max-w-lg mx-auto">
            The dedicated individuals driving SOIES Nepal forward.
          </p>
        </div>

        {/* Committee Tabs */}
        {committees.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {committees.map((name) => (
              <button
                key={name}
                onClick={() => setActiveCommittee(name)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeCommittee === name
                    ? "text-white shadow-lg"
                    : "text-slate-500 dark:text-navy-400 bg-slate-100 dark:bg-navy-800/50 border border-slate-200 dark:border-navy-700 hover:border-gold-500/40 hover:text-slate-700 dark:hover:text-navy-200"
                }`}
              >
                {activeCommittee === name && (
                  <span className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full" />
                )}
                <span className="relative z-10">{name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Single committee - show name as subtitle */}
        {committees.length === 1 && (
          <p className="text-center text-gold-500 dark:text-gold-400 font-semibold tracking-wide text-sm uppercase mb-12">
            {committees[0]}
          </p>
        )}

        {/* Row 1: VP — President (featured) — Secretary */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto items-end">
            {/* VP */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="order-2 sm:order-1 self-end"
            >
              {vp && <MemberCard member={vp} onClick={() => setSelectedMember(vp)} />}
            </motion.div>
            {/* President â€” spans full width on mobile */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 sm:order-2 col-span-2 sm:col-span-1 self-start sm:-mt-4 max-w-[280px] sm:max-w-none mx-auto w-full"
            >
              {president && <MemberCard member={president} featured onClick={() => setSelectedMember(president)} />}
            </motion.div>
            {/* Secretary */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="order-3 self-end"
            >
              {secretary && <MemberCard member={secretary} onClick={() => setSelectedMember(secretary)} />}
            </motion.div>
          </div>
        </motion.div>

        {/* Row 2 */}
        {row2.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-14"
          >
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5 max-w-5xl mx-auto">
              {row2.map((member, i) => (
                <motion.div 
                  key={member._id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.875rem)] lg:w-[calc(20%-1rem)]"
                >
                  <MemberCard member={member} onClick={() => setSelectedMember(member)} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Row 3: Remaining members */}
        {row3.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5 max-w-4xl mx-auto">
              {row3.map((member, i) => (
                <motion.div 
                  key={member._id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                  className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.875rem)] lg:w-[calc(25%-0.9375rem)]"
                >
                  <MemberCard member={member} onClick={() => setSelectedMember(member)} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Interns Section */}
        {allInternGroups.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                <span className="gradient-text">Interns</span>
              </h2>
            </div>
            <div className="space-y-10">
              {allInternGroups.map((group, groupIndex) => (
                <div key={group._id} className="space-y-5">
                  <p className="text-center text-gold-500 dark:text-gold-400 font-semibold tracking-wide text-sm uppercase">
                    {group.batchTitle}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-5 max-w-5xl mx-auto">
                    {group.interns.map((intern, i) => (
                      <motion.div
                        key={intern._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (i % 6) * 0.08 + groupIndex * 0.05 }}
                        className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.875rem)] lg:w-[calc(20%-1rem)]"
                      >
                        <InternCard intern={intern} onClick={() => setSelectedIntern(intern)} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="mt-16 border-t border-slate-200 dark:border-navy-800 pt-10">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400">
              Archive
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Explore Previous Committees
            </h3>
            <p className="max-w-xl text-sm sm:text-base text-slate-600 dark:text-navy-300">
              Browse the leadership stories, milestones, and gallery moments from past executive terms.
            </p>
            <Link
              href="/previous-committees"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gold-500/20 transition-transform duration-200 hover:-translate-y-0.5"
            >
              View Previous Committees
            </Link>
          </div>
        </div>

        {/* Profile popup */}
        <AnimatePresence>
          {selectedMember && (
            <ProfilePopup member={selectedMember} onClose={() => setSelectedMember(null)} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {selectedIntern && (
            <InternPopup intern={selectedIntern} onClose={() => setSelectedIntern(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}