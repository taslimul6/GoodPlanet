import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowLeft,
  UserRound,
} from "lucide-react";

import EventParticipants from "@/components/events/EventParticipants";
import SaveBtn from "@/components/events/SaveBtn";
import ShareBtn from "@/components/events/ShareBtn";
import AddToCalendar from "@/components/events/AddToCalendar";
import Countdown from "@/components/events/Countdown";
import FollowBtn from "@/components/events/FollowBtn";
import { SpotsBadge, TimingBadge } from "@/components/events/StatusBadge";

import { apiServer } from "@/lib/apiServer";
import { Event } from "@/lib/event";

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

  // The event and its seat count do not depend on each other, so load them together.
  const [eventRes, capacityRes] = await Promise.all([
    apiServer(`/event/${id}`),
    apiServer(`/event/capacity/${id}`),
  ]);

  if (!eventRes.ok) notFound();

  const event: Event = await eventRes.json();
  const eventCount: number = capacityRes.ok ? (await capacityRes.json()).joined : 0;

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

              <TimingBadge date={event.date} />
              <SpotsBadge capacity={event.capacity} booked={eventCount} />
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

                <FollowBtn
                  organizer={event.organizer || undefined}
                  ownerEmail={event.email}
                />
              </Card>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside>
            <Card className="sticky top-8 gap-0 rounded-2xl border-line bg-card p-6 shadow-none">
              {/* Countdown */}
              <Countdown date={event.date} />

              {/* Join Button Component */}
              <EventParticipants event={event} eventCount={eventCount} />

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

                <div className="flex items-start gap-3">
                  <Clock className="mt-1 size-5 shrink-0 text-pri" />

                  <div>
                    <p className="text-sm font-semibold">Volunteer hours</p>

                    <p className="mt-1 text-sm text-mut">
                      {Number(event.hours) > 0 ? Number(event.hours) : 4} hours
                      credited after the event
                    </p>
                  </div>
                </div>
              </div>

              {/* Save */}
              <SaveBtn eventId={event._id} variant="button" />

              {/* Add to calendar */}
              <AddToCalendar event={event} />

              {/* Share */}
              <ShareBtn title={event.title} />
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
