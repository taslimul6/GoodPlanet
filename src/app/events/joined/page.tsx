import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, TicketCheck } from "lucide-react";

import {
  DashboardEmpty,
  DashboardError,
  DashboardEventCard,
  DashboardHeader,
  DashboardSkeleton,
  DashboardStats,
} from "@/components/events/dashboard";
import { fetchUserEvents } from "@/lib/serverEvents";

export default function JoinedEventsPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <JoinedEventsContent />
    </Suspense>
  );
}

async function JoinedEventsContent() {
  const { events, failed } = await fetchUserEvents("/bookedEvents");

  // soonest first
  const sortedEvents = [...events].sort((a, b) =>
    String(a.date ?? "").localeCompare(String(b.date ?? ""))
  );

  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <DashboardHeader
          title="Joined Events"
          description="Keep track of the events you are participating in."
          action={
            <Link
              href="/events"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-pri px-6 text-sm font-bold text-on transition hover:opacity-90 sm:w-auto"
            >
              Explore events
              <ArrowRight className="size-4" />
            </Link>
          }
        />

        {!failed && <DashboardStats events={events} totalLabel="Total joined" />}

        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl">
                Your joined events
              </h2>
              <p className="mt-1 text-sm text-mut">
                Events you have registered to participate in
              </p>
            </div>

            <span className="text-sm font-semibold text-mut">
              {events.length} events
            </span>
          </div>

          {failed ? (
            <DashboardError />
          ) : sortedEvents.length === 0 ? (
            <DashboardEmpty
              icon={<TicketCheck className="size-6" />}
              title="You have not joined any events yet"
              text="Discover community events and join initiatives that make a positive difference."
              href="/events"
              cta="Explore events"
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sortedEvents.map((event) => (
                <DashboardEventCard
                  key={event._id}
                  event={event}
                  href={`/events/${event.eventId ?? event._id}`}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
