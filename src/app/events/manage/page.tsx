import Link from "next/link";
import { Suspense } from "react";
import { CalendarDays, Plus } from "lucide-react";

import ManageActions from "@/components/events/manage/Actions";
import {
  DashboardEmpty,
  DashboardError,
  DashboardEventCard,
  DashboardHeader,
  DashboardSkeleton,
  DashboardStats,
} from "@/components/events/dashboard";
import { fetchUserEvents } from "@/lib/serverEvents";

export default function MyEventsPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <MyEventsPageContent />
    </Suspense>
  );
}

async function MyEventsPageContent() {
  const { events, failed } = await fetchUserEvents("/myEvents");

  // soonest first
  const sortedEvents = [...events].sort((a, b) =>
    String(a.date ?? "").localeCompare(String(b.date ?? ""))
  );

  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <DashboardHeader
          title="My Events"
          description="Manage your events and track community participation."
          action={
            <Link
              href="/events/add"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-pri px-6 text-sm font-bold text-on transition hover:opacity-90 sm:w-auto"
            >
              <Plus className="size-4" />
              Create event
            </Link>
          }
        />

        {!failed && <DashboardStats events={events} totalLabel="Total events" />}

        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl">
                Your created events
              </h2>
              <p className="mt-1 text-sm text-mut">All events created by you</p>
            </div>

            <span className="text-sm font-semibold text-mut">
              {events.length} events
            </span>
          </div>

          {failed ? (
            <DashboardError />
          ) : sortedEvents.length === 0 ? (
            <DashboardEmpty
              icon={<CalendarDays className="size-6" />}
              title="You have not created any events yet"
              text="Start a cleanup drive, tree plantation or any community event and invite others to join."
              href="/events/add"
              cta="Create your first event"
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sortedEvents.map((event) => (
                <DashboardEventCard
                  key={event._id}
                  event={event}
                  href={`/events/${event._id}`}
                  actions={<ManageActions event={event} />}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
