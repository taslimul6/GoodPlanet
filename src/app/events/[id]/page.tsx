
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  CalendarDays,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Share2,
  CheckCircle2,
  UserRound,
} from "lucide-react";

export default function EventDetailsPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch event by ID
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MAIN_API}/event/${id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch event");
        }

        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load event details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-mut animate-pulse">Loading event details...</p>
      </main>
    );
  }

  // Error state
  if (error || !event) {
    return (
      <main className="min-h-screen bg-bg flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">
          {error || "Event not found"}
        </h2>

        <Link href="/events" className="text-pri font-semibold">
          Back to events
        </Link>
      </main>
    );
  }

  // Event information
  const eventDate = new Date(event.date);

  const formattedDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const participants = event.registered ?? 0;
  const capacity = event.capacity ?? 0;

  const joinedCount = participants + (joined ? 1 : 0);
  const availableSeats = Math.max(capacity - joinedCount, 0);

  const progress =
    capacity > 0
      ? Math.min((joinedCount / capacity) * 100, 100)
      : 0;

  const handleJoin = () => {
    setJoined((prev) => !prev);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Event link copied!");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

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
            src={event.image || "/placeholder-event.jpg"}
            alt={event.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-5 sm:p-10">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="border-0 bg-pri text-on hover:bg-pri">
                {event.category}
              </Badge>

              <Badge className="border-0 bg-white text-black hover:bg-white">
                {event.status || "Upcoming"}
              </Badge>
            </div>

            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/90">
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                {formattedDate}
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
              <h2 className="text-2xl font-extrabold">
                About this event
              </h2>

              <p className="mt-4 text-base leading-8 text-mut">
                {event.description}
              </p>
            </section>

            {/* Event Details */}
            <section>
              <h2 className="text-2xl font-extrabold">
                What to expect
              </h2>

              <div className="mt-5 space-y-4">
                {event.details?.length > 0 ? (
                  event.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-pri" />

                      <p className="text-sm leading-7 text-mut">
                        {detail}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-mut">
                    More event details will be announced soon.
                  </p>
                )}
              </div>
            </section>

            {/* Organizer */}
            <section>
              <h2 className="text-2xl font-extrabold">
                Event organizer
              </h2>

              <Card className="mt-5 flex flex-row items-center gap-4 rounded-2xl border-line bg-card p-5 shadow-none">
                <img
                  src={
                    event.organizerImage ||
                    "https://placehold.co/150x150?text=Organizer"
                  }
                  alt={event.organizer || "Event organizer"}
                  className="size-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold">
                    {event.organizer || "Community Organizer"}
                  </h3>

                  <p className="mt-1 text-sm text-mut">
                    Event organizer
                  </p>
                </div>
              </Card>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside>
            <Card className="sticky top-8 gap-0 rounded-2xl border-line bg-card p-6 shadow-none">

              {/* Participants */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">
                    Event participation
                  </h3>

                  <Users className="size-5 text-pri" />
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-extrabold">
                      {joinedCount}
                    </p>

                    <p className="mt-1 text-sm text-mut">
                      People joined
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-pri">
                    {availableSeats} seats left
                  </p>
                </div>

                {/* Progress */}
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-pri/10">
                  <div
                    className="h-full rounded-full bg-pri transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-mut">
                  <span>{Math.round(progress)}% filled</span>
                  <span>{capacity} capacity</span>
                </div>
              </div>

              {/* Join Button */}
              <Button
                onClick={handleJoin}
                disabled={!joined && availableSeats <= 0}
                className={`mt-7 h-12 w-full rounded-full font-bold ${
                  joined
                    ? "border border-line bg-pri/10 text-pri hover:bg-pri/20"
                    : "bg-pri text-on hover:opacity-90"
                }`}
              >
                {joined ? (
                  <>
                    <CheckCircle2 className="mr-2 size-4" />
                    Joined Successfully
                  </>
                ) : (
                  "Join Event"
                )}
              </Button>

              {joined && (
                <p className="mt-3 text-center text-xs text-pri">
                  You are participating in this event.
                </p>
              )}

              {/* Divider */}
              <div className="my-6 border-t border-line" />

              {/* Event Information */}
              <h3 className="font-bold">
                Event information
              </h3>

              <div className="mt-5 space-y-5">

                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-1 size-5 shrink-0 text-pri" />

                  <div>
                    <p className="text-sm font-semibold">Date</p>

                    <p className="mt-1 text-sm text-mut">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-1 size-5 shrink-0 text-pri" />

                  <div>
                    <p className="text-sm font-semibold">Time</p>

                    <p className="mt-1 text-sm text-mut">
                      {event.time || "Time not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 size-5 shrink-0 text-pri" />

                  <div>
                    <p className="text-sm font-semibold">Location</p>

                    <p className="mt-1 text-sm text-mut">
                      {event.location}
                    </p>
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
              <Button
                type="button"
                variant="outline"
                onClick={handleShare}
                className="mt-7 w-full rounded-full border-line"
              >
                <Share2 className="mr-2 size-4" />
                Share event
              </Button>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
