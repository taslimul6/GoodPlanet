/** Event dates are stored as "YYYY-MM-DD" (no time) – treat them as all-day, in local time. */
export function parseEventDate(date?: string | number): Date | null {
  if (!date) return null;
  const [year, month, day] = String(date).split("-").map(Number);
  if (!year || !month || !day) return null;
  const d = new Date(year, month - 1, day);
  return Number.isNaN(d.getTime()) ? null : d;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Today in local time as YYYY-MM-DD (the format used by <input type="date"> and event.date). */
export const todayISO = (now: Date = new Date()) =>
  `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

/** YYYYMMDD – used by Google Calendar and .ics all-day events */
export function toCalendarDate(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

function nextDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
}

type CalEvent = {
  _id?: string;
  title?: string;
  description?: string;
  location?: string;
  date?: string | number;
};

export function googleCalendarUrl(
  event: CalEvent,
  pageUrl: string
): string | null {
  const start = parseEventDate(event.date);
  if (!start) return null;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title ?? "GoodPlanet event",
    // end date is exclusive for all-day events
    dates: `${toCalendarDate(start)}/${toCalendarDate(nextDay(start))}`,
    details: `${event.description ?? ""}\n\n${pageUrl}`.trim(),
    location: event.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const escapeIcs = (s: string) =>
  s
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

export function buildIcs(event: CalEvent, pageUrl: string): string | null {
  const start = parseEventDate(event.date);
  if (!start) return null;

  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(
    now.getUTCDate()
  )}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(
    now.getUTCSeconds()
  )}Z`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GoodPlanet//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event._id ?? stamp}@goodplanet`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${toCalendarDate(start)}`,
    `DTEND;VALUE=DATE:${toCalendarDate(nextDay(start))}`,
    `SUMMARY:${escapeIcs(event.title ?? "GoodPlanet event")}`,
    `DESCRIPTION:${escapeIcs(`${event.description ?? ""}\n\n${pageUrl}`.trim())}`,
    `LOCATION:${escapeIcs(event.location ?? "")}`,
    `URL:${pageUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export type EventTiming = "upcoming" | "today" | "ended" | "unknown";

/** Compare the (date-only) event date with today, in local time. */
export function getEventTiming(
  date?: string | number,
  now: Date = new Date()
): EventTiming {
  const d = parseEventDate(date);
  if (!d) return "unknown";

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (d.getTime() > today.getTime()) return "upcoming";
  if (d.getTime() === today.getTime()) return "today";
  return "ended";
}
