import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Event } from "@/lib/event";
import { EventTiming, getEventTiming } from "@/lib/eventDate";

/* Shared building blocks for the "Manage events" and "Joined events" pages. */

const TIMING_BADGE: Record<EventTiming, { label: string; className: string }> = {
  upcoming: { label: "Upcoming", className: "bg-pri text-on hover:bg-pri" },
  today: { label: "Today", className: "bg-green-600 text-white hover:bg-green-600" },
  ended: { label: "Ended", className: "bg-muted text-mut hover:bg-muted" },
  unknown: { label: "", className: "" },
};

export function DashboardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-bold text-pri">GoodPlanet dashboard</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-mut sm:text-base">{description}</p>
      </div>
      {action}
    </div>
  );
}

/** Total / upcoming / past counters computed from the event dates. */
export function DashboardStats({
  events,
  totalLabel,
}: {
  events: Event[];
  totalLabel: string;
}) {
  const now = new Date();
  let upcoming = 0;
  let past = 0;

  for (const e of events) {
    const t = getEventTiming(e.date, now);
    if (t === "upcoming" || t === "today") upcoming++;
    else if (t === "ended") past++;
  }

  const stats = [
    { label: totalLabel, value: events.length, accent: false },
    { label: "Upcoming", value: upcoming, accent: true },
    { label: "Past", value: past, accent: false },
  ];

  return (
    <div className="mt-9 grid grid-cols-3 gap-3 sm:gap-4">
      {stats.map((s) => (
        <Card
          key={s.label}
          className="gap-0 rounded-2xl border-line bg-card p-4 shadow-none sm:p-5"
        >
          <p className="text-xs font-medium text-mut sm:text-sm">{s.label}</p>
          <p
            className={`mt-2 text-2xl font-extrabold sm:text-3xl ${
              s.accent ? "text-pri" : ""
            }`}
          >
            {String(s.value).padStart(2, "0")}
          </p>
        </Card>
      ))}
    </div>
  );
}

export function DashboardEventCard({
  event,
  href,
  actions,
}: {
  event: Event;
  href: string;
  actions?: ReactNode;
}) {
  const timing = TIMING_BADGE[getEventTiming(event.date)];

  return (
    <Card className="group flex flex-col gap-0 overflow-hidden rounded-2xl border-line bg-card p-0 shadow-none transition hover:-translate-y-1 hover:shadow-lg hover:shadow-pri/5">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image || "/placeholder-event.jpg"}
          alt={event.title ?? "Event"}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {event.category && (
          <Badge className="absolute left-3 top-3 border-0 bg-card text-fg hover:bg-card">
            {event.category}
          </Badge>
        )}

        {timing.label && (
          <Badge className={`absolute right-3 top-3 border-0 ${timing.className}`}>
            {timing.label}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold leading-snug">{event.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mut">
          {event.description}
        </p>

        <div className="mt-5 space-y-3 border-t border-line pt-4">
          <div className="flex items-center gap-2 text-sm text-mut">
            <CalendarDays className="size-4 shrink-0 text-pri" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-mut">
            <MapPin className="size-4 shrink-0 text-pri" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {actions ?? (
          <div className="mt-auto pt-6">
            <Link
              href={href}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-line text-sm font-semibold transition hover:border-pri hover:bg-pri/10 hover:text-pri"
            >
              View event details
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}

export function DashboardEmpty({
  icon,
  title,
  text,
  href,
  cta,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-card px-5 py-16 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-pri/10 text-pri">
        {icon}
      </div>
      <h3 className="mt-4 text-xl font-extrabold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-mut">{text}</p>
      <Link
        href={href}
        className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-pri px-6 text-sm font-bold text-on transition hover:opacity-90"
      >
        {cta}
      </Link>
    </div>
  );
}

export function DashboardError() {
  return (
    <div className="rounded-2xl border border-line bg-card px-5 py-16 text-center">
      <h3 className="text-xl font-extrabold">Could not load your events</h3>
      <p className="mt-2 text-sm text-mut">
        Something went wrong. Please refresh the page or try again later.
      </p>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="h-4 w-36 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-9 w-64 animate-pulse rounded bg-muted" />

        <div className="mt-9 grid grid-cols-3 gap-3 sm:gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    </main>
  );
}
