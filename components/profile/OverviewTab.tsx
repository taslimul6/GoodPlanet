import Link from "next/link";
import { Clock } from "lucide-react";

import { ProfileStats } from "./types";

export default function OverviewTab({
  stats,
  failed,
}: {
  stats: ProfileStats | null;
  failed: boolean;
}) {
  if (failed) {
    return (
      <div className="rounded-2xl border border-line bg-card px-5 py-14 text-center">
        <h3 className="text-lg font-extrabold">Could not load your activity</h3>
        <p className="mt-2 text-sm text-mut">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
        <div className="h-48 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  const cards = [
    { label: "Events joined", value: stats.joined },
    { label: "Upcoming", value: stats.upcoming, accent: true },
    { label: "Completed", value: stats.completed },
    { label: "Events created", value: stats.created },
    { label: "Saved events", value: stats.saved },
    { label: "Volunteer hours", value: stats.volunteerHours, accent: true },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-line bg-card p-4 sm:p-5"
          >
            <p className="text-xs font-medium text-mut sm:text-sm">{c.label}</p>
            <p
              className={`mt-2 text-2xl font-extrabold sm:text-3xl ${
                c.accent ? "text-pri" : ""
              }`}
            >
              {c.value}
            </p>
          </div>
        ))}
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold">Volunteer hours log</h2>
            <p className="mt-1 text-sm text-mut">
              Hours are added automatically after an event you joined has ended.
            </p>
          </div>
          <p className="shrink-0 text-sm font-bold text-pri">
            {stats.volunteerHours} h total
          </p>
        </div>

        {stats.history.length === 0 ? (
          <div className="rounded-2xl border border-line bg-card px-5 py-12 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-pri/10 text-pri">
              <Clock className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-extrabold">No hours logged yet</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-mut">
              Join an event and your volunteer time will show up here once it is
              over.
            </p>
            <Link
              href="/events"
              className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-pri px-6 text-sm font-bold text-on transition hover:opacity-90"
            >
              Explore events
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
            {stats.history.map((item) => (
              <li key={item.eventId}>
                <Link
                  href={`/events/${item.eventId}`}
                  className="flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-pri/5 sm:px-5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-bold">{item.title}</p>
                    <p className="mt-1 truncate text-xs text-mut">
                      {[item.date, item.location, item.category]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-pri/10 px-3 py-1 text-sm font-bold text-pri">
                    +{item.hours} h
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
