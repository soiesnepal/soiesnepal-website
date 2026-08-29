import Link from "next/link";
import Image from "next/image";

export type CommitteeMember = {
  name: string;
  role: string;
  linkedin?: string;
  socials?: string;
  bio?: string;
  photoUrl?: string | null;
};

export type CommitteePhoto = {
  caption?: string;
  imageUrl?: string | null;
};

export type PreviousCommitteeRecord = {
  _id: string;
  title: string;
  tenureNumber: number;
  years: string;
  description?: string;
  teamMembers?: CommitteeMember[];
  committeePhotos?: CommitteePhoto[];
};

export function PreviousCommitteesClient({ committees }: { committees: PreviousCommitteeRecord[] }) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-flex rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase shadow-sm dark:border-navy-700 dark:bg-navy-900/90 dark:text-gold-400">
            Archive
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
            Previous <span className="gradient-text">Committees</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-navy-300 sm:text-lg">
            Explore the leadership journeys, team milestones, and gallery moments from every executive term in SOIES Nepal.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {committees.map((committee) => (
            <Link
              key={committee._id}
              href={`/previous-committees/${committee.tenureNumber}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-xl dark:border-navy-800 dark:bg-navy-900"
            >
              <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-navy-800">
                {committee.committeePhotos?.[0]?.imageUrl ? (
                  <Image
                    src={committee.committeePhotos[0].imageUrl}
                    alt={committee.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-gold-100 text-4xl font-black text-slate-500 dark:from-navy-800 dark:via-navy-900 dark:to-navy-700 dark:text-navy-400">
                    {committee.tenureNumber}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
                    {committee.years}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700 dark:bg-gold-500/10 dark:text-gold-300">
                    {committee.tenureNumber}th term
                  </span>
                  <span className="text-xs text-slate-500 dark:text-navy-300">View archive</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{committee.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-navy-300">
                  {committee.description || "Committee archive details and achievements will appear here."}
                </p>

                <div className="mt-5 flex items-center justify-between text-sm text-slate-500 dark:text-navy-300">
                  <span>{committee.teamMembers?.length || 0} members</span>
                  <span>{committee.committeePhotos?.length || 0} gallery photos</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
