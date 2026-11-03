"use client";

import EventCard from "@/components/events/EventCard";
import { Event } from "@/lib/event";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { useEffect, useMemo, useState } from "react";


export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeCategory, setActiveCategory] = useState("All events");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [todayString, setTodayString] = useState("");

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setTodayString(
      [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
      ].join("-")
    );
  }, []);

  // Fetch events
  useEffect(() => {
    async function fetchEvents() {
      try {

        const token = await getTokenFromClient(); // get token from client side
        const res = await fetch(process.env.NEXT_PUBLIC_MAIN_API ?? "", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();

        setEvents(Array.isArray(data) ? data : data.events || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Categories
  const categories = useMemo(
    () => [
      "All events",
      ...new Set(events.map((event) => event.category ?? "").filter(Boolean)),
    ],
    [events]
  );

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return events
      .filter((event) => {
        const matchesCategory =
          activeCategory === "All events" ||
          event.category === activeCategory;

        const matchesSearch = [
          event.title,
          event.location,
          event.category,
        ].some((value) =>
          value?.toLowerCase().includes(searchText)
        );

        const isUpcoming = event.date && event.date >= todayString;

        return matchesCategory && matchesSearch && isUpcoming;
      })
      .sort((a, b) => String(a.date ?? "").localeCompare(String(b.date ?? "")));
  }, [events, activeCategory, search, todayString]);

  return (
    <main className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-5 pt-12 pb-8 lg:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <p className="text-pri font-bold text-sm">
              GoodPlanet community
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Events
            </h1>

            <p className="mt-2 text-mut">
              Discover local activities and make a difference together.
            </p>
          </div>

          <a
            href="/events/add"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-pri text-on font-bold hover:opacity-90 transition shrink-0"
          >
            <span className="text-xl leading-none">+</span>
            Add event
          </a>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-5">
        <div className="rounded-2xl border border-line bg-card p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition ${
                    activeCategory === category
                      ? "bg-pri text-on"
                      : "text-mut hover:bg-bg hover:text-fg"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:max-w-xs shrink-0">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-mut"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search events..."
                aria-label="Search events"
                className="w-full h-11 pl-12 pr-4 rounded-full bg-bg border border-line outline-none focus:border-pri transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="max-w-7xl mx-auto px-5 py-8 lg:py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg">
            Upcoming events
          </h2>

          <span className="text-sm text-mut">
            {filteredEvents.length} results
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-52 rounded-2xl bg-card border border-line animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-line bg-card py-16 px-5 text-center">
            <h3 className="text-xl font-extrabold">
              Something went wrong
            </h3>

            <p className="mt-2 text-mut">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 px-5 py-2.5 rounded-full bg-pri text-on font-bold text-sm"
            >
              Try again
            </button>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-line bg-card py-16 px-5 text-center">
            <h3 className="text-xl font-extrabold">
              No events found
            </h3>

            <p className="mt-2 text-mut">
              Try a different category or search term.
            </p>

            <button
              type="button"
              onClick={() => {
                setActiveCategory("All events");
                setSearch("");
              }}
              className="mt-5 px-5 py-2.5 rounded-full bg-pri text-on font-bold text-sm hover:opacity-90 transition"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}