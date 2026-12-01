import { Badge } from "@/components/ui/badge";
import { EventTiming, getEventTiming } from "@/lib/eventDate";

/* Small badges shared by the event list, the event page and the dashboards. */

const TIMING: Record<EventTiming, { label: string; className: string }> = {
  upcoming: { label: "Upcoming", className: "bg-pri text-on hover:bg-pri" },
  today: { label: "Ongoing today", className: "bg-green-600 text-white hover:bg-green-600" },
  ended: { label: "Ended", className: "bg-muted text-mut hover:bg-muted" },
  unknown: { label: "", className: "" },
};

export function TimingBadge({
  date,
  className = "",
}: {
  date?: string | number;
  className?: string;
}) {
  const t = TIMING[getEventTiming(date)];
  if (!t.label) return null;

  return <Badge className={`border-0 ${t.className} ${className}`}>{t.label}</Badge>;
}

/** capacity: 0/empty = unlimited. Shows "Full" or "N spots left" (only when it is getting tight). */
export function SpotsBadge({
  capacity,
  booked = 0,
  className = "",
}: {
  capacity?: string | number;
  booked?: number;
  className?: string;
}) {
  const cap = Number(capacity);
  if (!Number.isFinite(cap) || cap <= 0) return null;

  const left = Math.max(0, cap - booked);

  if (left === 0) {
    return (
      <Badge className={`border-0 bg-red-600 text-white hover:bg-red-600 ${className}`}>
        Full
      </Badge>
    );
  }

  // only call it out when it is running low (<= 20% or <= 5 spots)
  if (left <= 5 || left / cap <= 0.2) {
    return (
      <Badge className={`border-0 bg-amber-500 text-white hover:bg-amber-500 ${className}`}>
        {left} {left === 1 ? "spot" : "spots"} left
      </Badge>
    );
  }

  return null;
}
