"use client";

import { useEffect, useState } from "react";

import { Users } from "lucide-react";

import { authClient } from "@/src/app/lib/auth-client";
import JoinBtn from "./JoinBtn";
import { Event } from "@/lib/event";

const EventParticipants = ({ event , eventCount }: { event: Event , eventCount: number }) => {
  const { data: session } = authClient.useSession();
  const [participants, setParticipants] = useState(eventCount);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const checkJoined = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MAIN_API}/event/joined/check`,
          {
            headers: {
              "Content-Type": "application/json",
              query: JSON.stringify({
                eventId: event._id,
                email: session.user.email,
              }),
            },
          }
        );
        const data = await res.json();
        if (data.joined) {
          setJoined(true);
          setParticipants(eventCount);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkJoined();
  }, [session, event._id, eventCount]);

  return (
    <div className="mt-5 space-y-3 border-t border-line pt-4">
      <div className="flex items-center gap-2 text-sm text-mut">
        <Users className="size-4 shrink-0 text-pri" />
        <span>{participants} participant</span>
      </div>
      <JoinBtn event={event} setParticipants={setParticipants} eventCount={eventCount} />
    </div>
  );
};

export default EventParticipants;
