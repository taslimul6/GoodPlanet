import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  CalendarDays,
  MapPin,
  ArrowLeft,
  Share2,
  UserRound,
} from "lucide-react";

import EventParticipants from "@/components/events/EventParticipants";

import { getTokenFromServer } from "@/lib/getTokenFromServer";

/* ----------------------------- Loading skeleton ---------------------------- */

function EventDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-7 h-5 w-32 animate-pulse rounded bg-muted" />

        <div className="h-[280px] animate-pulse rounded-2xl bg-muted sm:h-[400px] lg:h-[480px]" />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="h-8 w-56 animate-pulse rounded bg-muted" />
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            </div>
          </div>

          <div className="h-72 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    </main>
  );
}

/* ------------------------- Data-fetching component ------------------------- */

async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // jwt auth check
  const token = await getTokenFromServer();

  // Get data from the database based on the event ID

  let response;
  let event;

  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/event/${id}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      event = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch event:", error);
  }

  if (!response?.ok || !event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Back Navigation */}
        <Link
          href="/events"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-mut transition hover:text-pri"
        >
          <ArrowLeft className="size-4" />
          Back to events
        </Link>

        {/* Event Banner */}
        <div className="relative h-[280px] overflow-hidden rounded-2xl sm:h-[400px] lg:h-[480px]">
          <img
            src={event.image}
            alt="Event banner"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-5 sm:p-10">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="border-0 bg-pri text-on hover:bg-pri">
                {event.category}
              </Badge>

              <Badge className="border-0 bg-white text-black hover:bg-white">
                {event.status}
              </Badge>
            </div>

            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/90">
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                {event.date}
              </span>

              <span className="flex items-center gap-2">
                <MapPin className="size-4" />
                {event.location}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left Content */}
          <div className="space-y-10 lg:col-span-2">
            {/* About Event */}
            <section>
              <h2 className="text-2xl font-extrabold">About this event</h2>

              <p className="mt-4 text-base leading-8 text-mut">
                {event.description}
              </p>
            </section>

            {/* Organizer */}
            <section>
              <h2 className="text-2xl font-extrabold">Event organizer</h2>

              <Card className="mt-5 flex flex-row items-center gap-4 rounded-2xl border-line bg-card p-5 shadow-none">
                <div>
                  <h3 className="font-bold">
                    {event.organizer || "Community Organizer"}
                  </h3>

                  <p className="mt-1 text-sm text-mut">Event organizer</p>
                </div>
              </Card>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside>
            <Card className="sticky top-8 gap-0 rounded-2xl border-line bg-card p-6 shadow-none">
              {/* Join Button Component */}
              <EventParticipants event={event} />

              {/* Divider */}
              <div className="my-6 border-t border-line" />

              {/* Event Information */}
              <h3 className="font-bold">Event information</h3>

              <div className="mt-5 space-y-5">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-1 size-5 shrink-0 text-pri" />

                  <div>
                    <p className="text-sm font-semibold">Date</p>

                    <p className="mt-1 text-sm text-mut">
                      {event.date || "Date not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 size-5 shrink-0 text-pri" />

                  <div>
                    <p className="text-sm font-semibold">Location</p>

                    <p className="mt-1 text-sm text-mut">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <UserRound className="mt-1 size-5 shrink-0 text-pri" />

                  <div>
                    <p className="text-sm font-semibold">Organized by</p>

                    <p className="mt-1 text-sm text-mut">
                      {event.organizer || "Community Organizer"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Share */}
              <button
                type="button"
                className="mt-7 flex h-10 w-full items-center justify-center rounded-full border border-line text-sm font-medium transition hover:bg-muted"
              >
                <Share2 className="mr-2 size-4" />
                Share event
              </button>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ---------------------------------- Page ----------------------------------- */

export default function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetails params={params} />
    </Suspense>
  );
}
