import Image from "next/image";
import Link from "next/link";
import type { PreviousCommitteeRecord } from "@/components/PreviousCommitteesClient";

export type CommitteeEvent = {
  _id: string;
  title: string;
  eventDate?: string;
  description?: string;
  category?: string;
  status?: string;
  winnerName?: string;
  tutorName?: string;
  images?: string[];
};

function formatEventDate(dateString?: string) {
  if (!dateString) return "Date TBD";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function PreviousCommitteeDetail({
  committee,
  events,
}: {
  committee: PreviousCommitteeRecord;
  events: CommitteeEvent[];
}) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Link
          href="/previous-committees"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gold-600 transition hover:text-gold-500 dark:text-gold-400"
        >
          ← Back to previous committees
        </Link>

        <header className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-navy-800 dark:bg-navy-900">
          <div className="grid gap-0 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="p-8 sm:p-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400">
                {committee.tenureNumber}th Executive Committee
              </p>
              <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">{committee.title}</h1>
              <p className="mt-3 text-lg text-slate-600 dark:text-navy-300">{committee.years}</p>
              {committee.description && (
                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-navy-300">
                  {committee.description}
                </p>
              )}
            </div>

            <div className="relative min-h-[220px] bg-slate-200 dark:bg-navy-800">
              {committee.committeePhotos?.[0]?.imageUrl ? (
                <Image
                  src={committee.committeePhotos[0].imageUrl}
                  alt={committee.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-100 text-6xl font-black text-slate-500 dark:from-navy-800 dark:to-navy-900 dark:text-navy-400">
                  {committee.tenureNumber}
                </div>
              )}
            </div>
          </div>
        </header>

        {committee.teamMembers && committee.teamMembers.length > 0 && (
          <section className="mb-16">
            <div className="mb-8 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600 dark:text-gold-400">Leadership</p>
                <h2 className="mt-2 text-3xl font-black">Team Members</h2>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {committee.teamMembers.map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-navy-800 dark:bg-navy-900"
                >
                  <div className="relative aspect-[4/5] bg-slate-200 dark:bg-navy-800">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-100 text-4xl font-black text-slate-500 dark:from-navy-800 dark:to-navy-900 dark:text-navy-400">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
                      {member.role}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                    {member.bio && <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-navy-300">{member.bio}</p>}
                    {(member.linkedin || member.socials) && (
                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-slate-200 px-2.5 py-1 font-medium text-slate-600 transition hover:border-gold-500 hover:text-gold-600 dark:border-navy-700 dark:text-navy-200 dark:hover:border-gold-500 dark:hover:text-gold-400"
                          >
                            LinkedIn
                          </a>
                        )}
                        {member.socials && (
                          <span className="rounded-full border border-slate-200 px-2.5 py-1 font-medium text-slate-600 dark:border-navy-700 dark:text-navy-200">
                            {member.socials}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {committee.committeePhotos && committee.committeePhotos.length > 0 && (
          <section className="mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600 dark:text-gold-400">Gallery</p>
            <h2 className="mt-2 text-3xl font-black">Committee Highlights</h2>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {committee.committeePhotos.map((photo, index) => (
                <figure key={`${photo.caption ?? "photo"}-${index}`} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-navy-800 dark:bg-navy-900">
                  <div className="relative aspect-[4/3] bg-slate-200 dark:bg-navy-800">
                    {photo.imageUrl ? (
                      <Image
                        src={photo.imageUrl}
                        alt={photo.caption || committee.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : null}
                  </div>
                  {photo.caption && (
                    <figcaption className="p-4 text-sm text-slate-600 dark:text-navy-300">{photo.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {events.length > 0 && (
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600 dark:text-gold-400">Events</p>
            <h2 className="mt-2 text-3xl font-black">Associated Events</h2>

            <div className="mt-8 space-y-4">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-navy-800 dark:bg-navy-900"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
                        {event.category || "General"}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{event.title}</h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-navy-800 dark:text-navy-200">
                      {event.status || "Completed"}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-navy-300">
                    <span>{formatEventDate(event.eventDate)}</span>
                    {event.winnerName && <span>Winner: {event.winnerName}</span>}
                    {event.tutorName && <span>Facilitator: {event.tutorName}</span>}
                  </div>

                  {event.description && (
                    <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-navy-300">{event.description}</p>
                  )}

                  {event.images && event.images.length > 0 && (
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {event.images.slice(0, 3).map((image, index) => (
                        <div key={`${event._id}-${index}`} className="relative h-40 overflow-hidden rounded-2xl bg-slate-200 dark:bg-navy-800">
                          <Image src={image} alt={event.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
