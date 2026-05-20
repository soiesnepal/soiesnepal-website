import EventsSection from "@/components/sections/EventsSection";
import { client } from "@/lib/sanity";
import { eventsQuery } from "@/lib/queries";

export const revalidate = 60;

export default async function EventsPage() {
  const events = await client.fetch(eventsQuery).catch(() => []);
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-navy-950 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <EventsSection events={events} showAll />
      </div>
    </main>
  );
}
