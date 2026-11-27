"use client";

import { CalendarPlus, Download } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Event } from "@/lib/event";
import { buildIcs, googleCalendarUrl, parseEventDate } from "@/lib/eventDate";

export default function AddToCalendar({ event }: { event: Event }) {
  if (!parseEventDate(event.date)) return null;

  const downloadIcs = () => {
    const ics = buildIcs(event, window.location.href);
    if (!ics) return;

    const url = URL.createObjectURL(
      new Blob([ics], { type: "text/calendar;charset=utf-8" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(event.title ?? "event").replace(/[^\w-]+/g, "-")}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const openGoogle = () => {
    const url = googleCalendarUrl(event, window.location.href);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const item =
    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-line";

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className="mt-3 flex h-10 w-full items-center justify-center rounded-full border border-line text-sm font-medium transition hover:bg-muted"
          >
            <CalendarPlus className="mr-2 size-4" />
            Add to calendar
          </button>
        }
      />

      <PopoverContent align="center" className="w-60 gap-1 rounded-xl border border-line bg-bg p-2 shadow-lg">
        <button type="button" onClick={openGoogle} className={item}>
          <CalendarPlus className="size-4 text-mut" />
          Google Calendar
        </button>
        <button type="button" onClick={downloadIcs} className={item}>
          <Download className="size-4 text-mut" />
          Download .ics (Apple / Outlook)
        </button>
      </PopoverContent>
    </Popover>
  );
}
