"use client";

import { useCallback, useEffect, useState } from "react";
import { Users } from "lucide-react";

import { Event } from "@/lib/event";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { authClient } from "@/src/app/lib/auth-client";

import JoinBtn from "./JoinBtn";

export interface CapacityInfo {
  capacity: number; // 0 = unlimited
  joined: number;
  spotsLeft: number | null;
  full: boolean;
  joinedByMe: boolean;
  onWaitlist: boolean;
  position: number | null;
  waitlistCount: number;
}

const EventParticipants = ({
  event,
  eventCount,
}: {
  event: Event;
  eventCount: number;
}) => {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  const [info, setInfo] = useState<CapacityInfo | null>(null);

  // one call gives counts + "am I joined / on the waitlist"
  const load = useCallback(async (): Promise<CapacityInfo | null> => {
    if (!email || !event._id) return null;
    try {
      const token = await getTokenFromClient();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API}/event/capacity/${event._id}`,
        { headers: { Authorization: `Bearer ${token}`, query: email } }
      );
      return res.ok ? await res.json() : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [email, event._id]);

  // used by the buttons after every action
  const refresh = useCallback(async () => {
    const data = await load();
    if (data) setInfo(data);
  }, [load]);

  useEffect(() => {
    let cancelled = false;
    load().then((data) => {
      if (!cancelled && data) setInfo(data);
    });
    return () => {
      cancelled = true;
    };
  }, [load]);

  const joined = info?.joined ?? eventCount;
  const capacity = info?.capacity ?? (Number(event.capacity) > 0 ? Number(event.capacity) : 0);
  const percent = capacity > 0 ? Math.min(100, Math.round((joined / capacity) * 100)) : 0;
  const full = capacity > 0 && joined >= capacity;

  return (
    <div className="mt-5 space-y-3 border-t border-line pt-4">
      <div className="flex items-center gap-2 text-sm text-mut">
        <Users className="size-4 shrink-0 text-pri" />
        <span>
          {capacity > 0
            ? `${joined} / ${capacity} joined`
            : `${joined} ${joined === 1 ? "participant" : "participants"}`}
        </span>
      </div>

      {capacity > 0 && (
        <div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Seats taken"
          >
            <div
              className={`h-full rounded-full transition-all ${
                full ? "bg-red-600" : percent >= 80 ? "bg-amber-500" : "bg-pri"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          <p
            className={`mt-2 text-xs font-medium ${
              full ? "text-red-600" : "text-mut"
            }`}
          >
            {full
              ? `This event is full${
                  info && info.waitlistCount > 0
                    ? ` · ${info.waitlistCount} on the waitlist`
                    : ""
                }`
              : `${capacity - joined} ${capacity - joined === 1 ? "spot" : "spots"} left`}
          </p>
        </div>
      )}

      <JoinBtn event={event} info={info} refresh={refresh} />
    </div>
  );
};

export default EventParticipants;
