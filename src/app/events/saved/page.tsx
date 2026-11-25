"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark } from "lucide-react";

import EventCard from "@/components/events/EventCard";
import { Event } from "@/lib/event";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { authClient } from "@/src/app/lib/auth-client";

export default function SavedEventsPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;
    if (!email) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const token = await getTokenFromClient();
        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/saved`, {
          headers: { Authorization: `Bearer ${token}`, query: email },
        });
        if (!res.ok) throw new Error("Failed to fetch saved events");

        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load saved events. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, [email, isPending]);

  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-pri">GoodPlanet dashboard</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Saved Events
            </h1>
            <p className="mt-2 text-sm text-mut sm:text-base">
              Events you bookmarked to check out later.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-pri px-6 text-sm font-bold text-on transition hover:opacity-90 sm:w-auto"
          >
            Explore events
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <section className="mt-10">
          {loading ? (
            <div className="grid gap-5 md:grid-cols-2">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="h-52 animate-pulse rounded-2xl border border-line bg-card"
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-line bg-card px-5 py-16 text-center">
              <h3 className="text-xl font-extrabold">Something went wrong</h3>
              <p className="mt-2 text-mut">{error}</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  saved
                  onSavedChange={(isSaved) => {
                    if (!isSaved) {
                      setEvents((prev) =>
                        prev.filter((e) => e._id !== event._id)
                      );
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-line bg-card px-5 py-16 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-pri/10">
                <Bookmark className="size-6 text-pri" />
              </div>
              <h3 className="mt-4 text-xl font-extrabold">No saved events yet</h3>
              <p className="mt-2 text-mut">
                Tap the bookmark icon on any event to save it here.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
