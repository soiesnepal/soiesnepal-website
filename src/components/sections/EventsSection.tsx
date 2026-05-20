
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trophy, BookOpen, Clock, Sparkles } from "lucide-react";

interface Event {
  _id: string;
  title: string;
  eventDate: string;
  description?: string;
  category?: string;
  status?: string;
  winnerName?: string;
  tutorName?: string;
  images?: string[];
}

const placeholderEvents: Event[] = [
  {
    _id: "1",
    title: "Industrial Estate Research Program",
    eventDate: "2024-08-22",
    description: "Research program at industrial estates across Nepal to study workflow optimization and lean manufacturing practices.",
    category: "general",
    status: "completed",
    images: [],
  },
  {
    _id: "2",
    title: "SOIES Nepal Conference",
    eventDate: "2024-07-25",
    description: "Annual conference bringing together IE students and professionals for knowledge exchange and networking.",
    category: "conference",
    status: "completed",
    images: [],
  },
  {
    _id: "3",
    title: "MechTRIX-2081",
    eventDate: "2024-02-09",
    description: "Annual technical exhibition showcasing industrial engineering projects and innovations by students.",
    category: "competition",
    status: "completed",
    winnerName: "Team Alpha",
    images: [],
  },
  {
    _id: "4",
    title: "Yathartha-2081",
    eventDate: "2024-01-28",
    description: "Flagship event of SOIES Nepal featuring intensive workshops on Industry 4.0 and smart manufacturing.",
    category: "workshop",
    status: "completed",
    tutorName: "Dr. Ram Sharma",
    images: [],
  },
  {
    _id: "5",
    title: "Tech Summit 2025",
    eventDate: "2025-06-15",
    description: "Upcoming summit on emerging technologies in industrial engineering — AI, automation, and digital twins.",
    category: "conference",
    status: "upcoming",
    images: [],
  },
];

const categoryConfig: Record<string, { bg: string; dot: string }> = {
  workshop: { bg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20", dot: "bg-purple-500" },
  general: { bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20", dot: "bg-blue-500" },
  competition: { bg: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20", dot: "bg-red-500" },
  seminar: { bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", dot: "bg-emerald-500" },
  "industrial-visit": { bg: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20", dot: "bg-orange-500" },
  conference: { bg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20", dot: "bg-cyan-500" },
  social: { bg: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20", dot: "bg-pink-500" },
};

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return {
      month: d.toLocaleString("en", { month: "short" }).toUpperCase(),
      day: d.getDate(),
      year: d.getFullYear(),
      full: d.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" }),
    };
  } catch {
    return { month: "TBD", day: 0, year: 0, full: "TBD" };
  }
}
export default function EventsSection({ events = [], showAll }: { events?: Event[]; showAll?: boolean }) {
  const [activeTab, setActiveTab] = useState<"completed" | "upcoming">("completed");
  const [visibleCount, setVisibleCount] = useState(5); // Show 5 events initially
  useEffect(() => { setVisibleCount(5); }, [activeTab]);
  const allEvents = events.length > 0 ? events : placeholderEvents;
  const completedEvents = allEvents.filter((e) => e.status !== "upcoming");
  const upcomingEvents = allEvents.filter((e) => e.status === "upcoming").sort(
    (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
  );
  const currentEvents = activeTab === "completed" ? completedEvents : upcomingEvents;
  const displayEvents = currentEvents.slice(0, visibleCount);
  const canLoadMore = Boolean(showAll) && visibleCount < currentEvents.length;


  return (
    <section id="events" className="py-24 bg-slate-50 dark:bg-navy-950 relative overflow-hidden">
      {/* Subtle static background */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.07),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_32%)]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-white dark:bg-navy-800 text-gold-500 dark:text-gold-400 border border-slate-200 dark:border-navy-700 mb-4">
            What&apos;s Happening
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
            Our <span className="gradient-text">Events</span>
          </h2>
          <p className="text-slate-500 dark:text-navy-400 mt-4 max-w-xl mx-auto">
            Stay updated with the latest activities organized by SOIES Nepal.
          </p>
          {/* Tab switcher */}
          <div className="flex items-center justify-center mt-8 gap-1 p-1 rounded-full bg-slate-200/70 dark:bg-navy-800/70 w-fit mx-auto border border-slate-300/50 dark:border-navy-700/50">
            <button
              onClick={() => setActiveTab("completed")}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "completed"
                  ? "text-white"
                  : "text-slate-500 dark:text-navy-400 hover:text-slate-700 dark:hover:text-navy-200"
              }`}
            >
              {activeTab === "completed" && (
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-red-500 rounded-full shadow-lg shadow-gold-500/25" />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                Past Events
                {completedEvents.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === "completed" ? "bg-white/20" : "bg-slate-300 dark:bg-navy-700"
                  }`}>{completedEvents.length}</span>
                )}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "upcoming"
                  ? "text-white"
                  : "text-slate-500 dark:text-navy-400 hover:text-slate-700 dark:hover:text-navy-200"
              }`}
            >
              {activeTab === "upcoming" && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/25" />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                Upcoming
                {upcomingEvents.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === "upcoming" ? "bg-white/20" : "bg-slate-300 dark:bg-navy-700"
                  }`}>{upcomingEvents.length}</span>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div key={activeTab} className="relative">
          {displayEvents.length === 0 ? (
            <div className="text-center py-20">
              <Sparkles size={40} className="mx-auto text-slate-300 dark:text-navy-600 mb-4" />
              <p className="text-slate-500 dark:text-navy-400 text-lg font-medium">
                {activeTab === "upcoming" ? "No upcoming events at the moment." : "No past events yet."}
              </p>
              <p className="text-slate-400 dark:text-navy-500 text-sm mt-1">Check back soon!</p>
            </div>
          ) : (
          <>
          {/* Vertical line — center on lg, left on mobile */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-px">
            <div className="w-full h-full origin-top bg-gradient-to-b from-gold-500 via-gold-500/40 to-transparent" />
          </div>

          <div className="space-y-16 lg:space-y-20">
            {displayEvents.map((event, i) => {
              const date = formatDate(event.eventDate);
              const hasImages = event.images && event.images.length > 0;
              const cat = categoryConfig[event.category || "general"] || categoryConfig.general;
              const isLeft = i % 2 === 0;

              return (
                <div key={event._id} className="relative">
                  {/* Timeline dot (decorative) */}
                  <div
                    aria-hidden="true"
                    className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-20"
                  >
                    <div className="relative">
                      <div className={`w-4 h-4 rounded-full ${cat.dot} ring-4 ring-slate-50 dark:ring-navy-950`} />
                      <div className={`absolute inset-0 w-4 h-4 rounded-full ${cat.dot} animate-ping opacity-20`} />
                    </div>
                  </div>

                  {/* Date badge — mobile: next to dot, desktop: opposite side */}
                  <div
                    className={`
                      absolute left-14 lg:left-auto top-0
                      ${isLeft ? "lg:left-[calc(50%+2rem)]" : "lg:right-[calc(50%+2rem)] lg:left-auto"}
                    `}
                  >
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 shadow-sm">
                      <span className="text-xs font-bold text-slate-700 dark:text-navy-200 whitespace-nowrap">{date.full}</span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`
                      ml-16 lg:ml-0 mt-10 lg:mt-0
                      lg:w-[calc(50%-3rem)]
                      ${isLeft ? "lg:mr-auto" : "lg:ml-auto"}
                    `}
                  >
                    <div className={`group bg-white dark:bg-navy-900/70 rounded-2xl border overflow-hidden hover:shadow-2xl transition-all duration-500 ${
                      event.status === "upcoming"
                        ? "border-emerald-400/50 dark:border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-emerald-500/10 ring-1 ring-emerald-400/20"
                        : "border-slate-200/80 dark:border-navy-800/60 hover:border-gold-500/40 hover:shadow-gold-500/10"
                    }`}>
                      {/* Upcoming badge */}
                      {event.status === "upcoming" && (
                        <div className="px-5 pt-4 pb-0 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <Clock size={12} className="animate-pulse" />
                            Upcoming
                          </span>
                        </div>
                      )}
                      {/* 2x2 Image grid */}
                      {hasImages && (
                        <div className="grid grid-cols-2 gap-0.5 bg-slate-200 dark:bg-navy-800">
                          {event.images!.slice(0, 4).map((img, idx) => (
                            <div key={idx} className="aspect-[4/3] overflow-hidden relative">
                              <Image
                                src={img}
                                alt={`Event: ${event.title} - Image ${idx + 1}`}
                                fill
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                                quality={70}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Card body */}
                      <div className="p-5 sm:p-6">
                        {/* Category + connector line */}
                        <div className="flex items-center gap-3 mb-3">
                          {event.category && (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${cat.bg}`}>
                              {event.category.replace("-", " ")}
                            </span>
                          )}
                          <div className="flex-1 h-px bg-gradient-to-r from-slate-200 dark:from-navy-700 to-transparent" />
                        </div>

                        <h3 className="text-slate-900 dark:text-white font-bold text-lg sm:text-xl leading-tight group-hover:text-gold-500 transition-colors duration-300">
                          {event.title}
                        </h3>

                        {event.description && (
                          <p className="text-slate-500 dark:text-navy-400 text-sm leading-relaxed mt-2.5 line-clamp-3">
                            {event.description}
                          </p>
                        )}

                        {/* Meta: winner / tutor */}
                        {(event.winnerName || event.tutorName) && (
                          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800/50 space-y-1.5">
                            {event.category === "competition" && event.winnerName && (
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center">
                                  <Trophy size={11} className="text-gold-500" />
                                </div>
                                <span className="text-xs text-slate-500 dark:text-navy-400">Winner:</span>
                                <span className="text-xs font-semibold text-slate-800 dark:text-white">{event.winnerName}</span>
                              </div>
                            )}
                            {event.category === "workshop" && event.tutorName && (
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center">
                                  <BookOpen size={11} className="text-purple-500" />
                                </div>
                                <span className="text-xs text-slate-500 dark:text-navy-400">Tutor:</span>
                                <span className="text-xs font-semibold text-slate-800 dark:text-white">{event.tutorName}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* View More button logic (only if not showAll) */}
          {!showAll && currentEvents.length > 5 && visibleCount < currentEvents.length && (
            <div className="flex flex-col items-center mt-10 gap-4">
              <a
                href="/events"
                className="px-6 py-2 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-semibold shadow-lg transition-all duration-300"
              >
                View More
              </a>
            </div>
          )}

          {canLoadMore && (
            <div className="flex flex-col items-center mt-10 gap-4">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 5, currentEvents.length))}
                className="px-6 py-2 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-semibold shadow-lg transition-all duration-300"
              >
                Load More
              </button>
            </div>
          )}

          {/* Timeline end cap (decorative) */}
          <div
            aria-hidden="true"
            className="absolute left-6 lg:left-1/2 -translate-x-1/2 -bottom-2 z-20"
          >
            <div className="w-3 h-3 rounded-full bg-gold-500/30 ring-4 ring-slate-50 dark:ring-navy-950" />
          </div>
          </>
          )}
        </div>
        {/* visibleCount resets on tab change via useEffect */}
      </div>
    </section>
  );
}
