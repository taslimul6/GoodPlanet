"use client";

import { Timer } from "lucide-react";
import { useEffect, useState } from "react";

import { parseEventDate } from "@/lib/eventDate";

const DAY = 86_400_000;

export default function Countdown({ date }: { date?: string | number }) {
  // null on first render so server and client markup match (no hydration mismatch)
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const start = parseEventDate(date);
  if (!start || now === null) return null;

  const startMs = start.getTime();
  const endMs = startMs + DAY;

  if (now >= endMs) {
    return (
      <Box>
        <p className="text-sm font-semibold text-mut">This event has ended</p>
      </Box>
    );
  }

  if (now >= startMs) {
    return (
      <Box>
        <p className="text-sm font-bold text-pri">Happening today</p>
      </Box>
    );
  }

  const diff = startMs - now;
  const units = [
    { label: "Days", value: Math.floor(diff / DAY) },
    { label: "Hours", value: Math.floor((diff % DAY) / 3_600_000) },
    { label: "Mins", value: Math.floor((diff % 3_600_000) / 60_000) },
    { label: "Secs", value: Math.floor((diff % 60_000) / 1000) },
  ];

  return (
    <Box label="Starts in">
      <div className="grid grid-cols-4 gap-2 text-center" role="timer">
        {units.map((u) => (
          <div key={u.label} className="rounded-xl bg-pri/10 py-2">
            <p className="text-xl font-extrabold tabular-nums text-pri">
              {String(u.value).padStart(2, "0")}
            </p>
            <p className="text-[10px] font-semibold uppercase text-mut">
              {u.label}
            </p>
          </div>
        ))}
      </div>
    </Box>
  );
}

function Box({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="mb-6 rounded-2xl border border-line bg-bg p-4">
      <div className="mb-3 flex items-center gap-2 text-pri">
        <Timer className="size-4" />
        {label && (
          <span className="text-xs font-bold uppercase tracking-wide text-mut">
            {label}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
