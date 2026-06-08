"use client";


// Framer Motion fully removed for performance
import Image from "next/image";
import { Download, FileText, BookOpen, Pen, Sparkles, Clock, Search, X, FolderOpen } from "lucide-react";
import { useMemo, useState } from "react";

interface Journal {
  _id: string;
  category: "ojt" | "seminar" | "fyp" | "minor" | "major" | "entrepreneurship" | "groupwork" | "industrial" | "others" | "research";
  title: string;
  batch: string;
  semester?: string;
  authors?: string[];
  supervisor?: string;
  description?: string;
  issueNumber?: string;
  publicationDate?: string;
  cover?: string | null;
  resources?: string;
}

const categoryLabels: Record<Journal["category"], string> = {
  ojt: "OJT Papers",
  seminar: "Seminar Papers",
  fyp: "Final Year Project Papers",
  minor: "Minor Projects",
  major: "Major Projects",
  entrepreneurship: "Entrepreneurship",
  groupwork: "Group Work and Presentation",
  industrial: "Industrial Estate Research Program",
  others: "Others",
  research: "Research", // Kept for existing content compatibility
};

function getFuzzyScore(term: string, value: string) {
  const trimmed = term.trim().toLowerCase();
  if (!trimmed) return 0;
  const text = value.toLowerCase();
  if (text.includes(trimmed)) return 100 + trimmed.length;

  let score = 0;
  let termIndex = 0;
  let lastMatch = -1;
  for (let i = 0; i < text.length && termIndex < trimmed.length; i += 1) {
    if (text[i] === trimmed[termIndex]) {
      score += 10;
      if (lastMatch === i - 1) score += 5;
      lastMatch = i;
      termIndex += 1;
    }
  }

  return termIndex === trimmed.length ? score : 0;
}

export default function JournalClient({ journals }: { journals: Journal[] }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    return Object.entries(categoryLabels)
      .filter(([key]) => key !== "research") // Hide research unless we want to show it, let's just omit it natively from empty states
      .map(([key, label]) => ({ key, label }));
  }, []);

  const filteredJournals = useMemo(() => {
    let filtered = journals;
    if (selectedCategory) {
      filtered = filtered.filter(j => j.category === selectedCategory);
    }

    if (!query.trim()) return filtered;

    const scored = filtered.map((journal) => {
      const fields = [
        journal.title,
        categoryLabels[journal.category],
        `Batch ${journal.batch}`,
        journal.semester ? `Semester ${journal.semester}` : "",
        journal.authors?.join(", ") || "",
        journal.supervisor || "",
        journal.issueNumber ? `Group ${journal.issueNumber}` : "",
      ];

      const score = fields.reduce((best, field) => {
        const current = getFuzzyScore(query, field);
        return current > best ? current : best;
      }, 0);

      return { journal, score };
    });

    return scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.journal);
  }, [journals, query, selectedCategory]);

  const hasJournals = journals.length > 0;
  const hasMatches = filteredJournals.length > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-100 dark:bg-navy-800 text-gold-500 dark:text-gold-400 border border-slate-200 dark:border-navy-700 mb-4">
            Academic Papers
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Academic <span className="gradient-text">Papers</span>
          </h1>
        </div>

        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-gold-500 text-navy-950 shadow-md shadow-gold-500/20"
                  : "bg-slate-50 dark:bg-navy-900/50 text-slate-600 dark:text-navy-300 hover:bg-slate-100 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-700/50"
              }`}
            >
              <FolderOpen size={16} /> All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all ${
                  selectedCategory === cat.key
                    ? "bg-gold-500 text-navy-950 shadow-md shadow-gold-500/20"
                    : "bg-slate-50 dark:bg-navy-900/50 text-slate-600 dark:text-navy-300 hover:bg-slate-100 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-700/50"
                }`}
              >
                <FolderOpen size={16} /> {cat.label}
              </button>
            ))}
          </div>
        )}

        {hasJournals && (
          <div className="mb-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-navy-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search papers by title, author, batch, or semester..."
                className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-navy-500 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-navy-500 dark:hover:text-navy-300"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between sm:justify-end text-sm text-slate-500 dark:text-navy-400 px-1">
              {hasMatches ? `${filteredJournals.length} papers` : "No matches"}
            </div>
          </div>
        )}

        {!hasJournals ? (
          <div className="relative overflow-hidden bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-800/50 rounded-2xl p-10 sm:p-16 text-center">
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Removed animated divs */}
              <div className="absolute top-8 left-8 text-gold-500/5">
                <BookOpen size={80} />
              </div>
              <div className="absolute bottom-8 right-8 text-gold-500/5">
                <Pen size={60} />
              </div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gold-500/10 dark:bg-gold-500/10 mb-6">
                <Sparkles size={36} className="text-gold-500" />
              </div>

              <h3 className="text-slate-900 dark:text-white font-bold text-2xl sm:text-3xl mb-3">
                Coming Soon
              </h3>
              <p className="text-slate-500 dark:text-navy-300 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                Academic papers will appear here once they are published by the department.
              </p>

              <div className="flex items-center justify-center gap-2 mt-8 text-xs text-slate-400 dark:text-navy-500">
                <Clock size={14} />
                <span>Stay tuned for student publications</span>
              </div>

              {/* Decorative timeline dots */}
              {/* Removed animated timeline dots */}
            </div>
          </div>
        ) : (
          !hasMatches ? (
            <div className="rounded-2xl border border-slate-200 dark:border-navy-800/50 bg-slate-50 dark:bg-navy-900/50 p-10 text-center text-slate-500 dark:text-navy-300">
              No papers matched your search.
            </div>
          ) : (
          <div className="space-y-4">
            {filteredJournals.map((journal, i) => (
              <div
                key={journal._id}
                className="flex items-center gap-5 p-5 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-800/50 rounded-xl hover:border-gold-500/30 card-hover"
              >
                <div className="w-14 h-14 rounded-lg bg-slate-100 dark:bg-navy-800 flex items-center justify-center shrink-0 overflow-hidden">
                  {journal.cover ? (
                    <Image
                      src={journal.cover}
                      alt={`Cover of journal: ${journal.title}`}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                      loading="eager"
                      priority={i === 0}
                    />
                  ) : (
                    <FileText size={24} className="text-gold-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
                      {categoryLabels[journal.category]}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-navy-400">Batch {journal.batch}</span>
                    {journal.semester && (
                      <span className="text-xs text-slate-500 dark:text-navy-400">Semester {journal.semester}</span>
                    )}
                    {journal.issueNumber && (
                      <span className="text-xs text-slate-400 dark:text-navy-500">Group {journal.issueNumber}</span>
                    )}
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-bold">{journal.title}</h4>
                  {journal.description && (
                    <p className="text-slate-500 dark:text-navy-400 text-sm mt-1">
                      {journal.description}
                    </p>
                  )}
                  <div className="mt-2 text-xs text-slate-500 dark:text-navy-400 space-y-1">
                    {journal.authors && journal.authors.length > 0 && (
                      <p>Authors: {journal.authors.join(", ")}</p>
                    )}
                    {journal.supervisor && (
                      <p>Supervisor: {journal.supervisor}</p>
                    )}
                  </div>
                </div>
                {journal.resources && (
                  <a
                    href={journal.resources}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm rounded-lg transition-colors shrink-0"
                  >
                    <Download size={14} /> Download
                  </a>
                )}
              </div>
            ))}
          </div>
          )
        )}
      </div>
    </div>
  );
}
