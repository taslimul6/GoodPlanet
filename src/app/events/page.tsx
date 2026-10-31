
"use client";

import { useEffect, useMemo, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All events");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_MAIN_API);

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json();

        setEvents(Array.isArray(data) ? data : data.events || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Dynamic categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(events.map((event) => event.category).filter(Boolean)),
    ];

    return ["All events", ...uniqueCategories];
  }, [events]);

  // Search and category filter
  const filteredEvents = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return events.filter((event) => {
      const matchesCategory =
        activeCategory === "All events" ||
        event.category === activeCategory;

      const matchesSearch =
        event.title?.toLowerCase().includes(searchText) ||
        event.location?.toLowerCase().includes(searchText) ||
        event.category?.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [events, activeCategory, search]);

  // Format event date
  const formatDate = (date) => {
    if (!date) return "Date not specified";

    const eventDate = new Date(date);

    if (Number.isNaN(eventDate.getTime())) return "Date not specified";

    return eventDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-bg text-fg">

      {/* Page Header */}
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

      {/* Filters and Search */}
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
          /* Error */
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
          /* Events */
          <div className="grid md:grid-cols-2 gap-5">
            {filteredEvents.map((event) => (
              <article
                key={event._id}
                className="group flex flex-col sm:flex-row bg-card border border-line rounded-2xl overflow-hidden hover:border-pri/50 hover:shadow-lg hover:shadow-pri/5 transition"
              >
                <div className="im relative h-52 sm:h-auto sm:w-44 md:w-48 shrink-0 overflow-hidden">
                  <img
                    src={event.image || "/placeholder-event.jpg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />

                  {event.category && (
                    <span className="absolute top-3 left-3 bg-card/95 text-fg text-xs font-bold px-3 py-1.5 rounded-full">
                      {event.category}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-2 text-sm text-pri font-bold">
                    <span>{formatDate(event.date)}</span>

                    <span className="size-1 rounded-full bg-pri" />

                    <span className="text-mut font-medium">
                      {event.location}
                    </span>
                  </div>

                  <h3 className="mt-2 text-xl font-extrabold tracking-tight">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-sm text-mut leading-relaxed">
                    {event.description}
                  </p>

                  <a
                    href={`/events/${event._id}`}
                    className="inline-flex items-center gap-2 mt-4 text-pri text-sm font-bold hover:gap-3 transition-all"
                  >
                    View event
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
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
