"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Users, CheckCircle2 } from "lucide-react";
import { authClient } from "@/src/app/lib/auth-client";
import { Event } from "@/lib/event";

const JoinBtn = ({ event }: { event: Event }) => {

  console.log("event in JoinBtn:", event._id);

  const [isJoined, setIsJoined] = useState(false);
  const { data: session } = authClient.useSession();



  useEffect(() => {
    const checkIfJoined = async () => {
      if (session?.user?.email) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MAIN_API}/event/joined/check`,
          {
            
            headers: {
              "Content-Type": "application/json",
              'query': JSON.stringify({
                eventId: event._id,
                email: session?.user?.email,
              }),

            },
            
          }
        );
        const data = await res.json();
        setIsJoined(data.joined);
      }
    };

    checkIfJoined();
  }, [session, event._id]);

  const handleJoin = async () => {
    // Logic to join the event (e.g., API call)

    if (!isJoined) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API}/event/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...event,
            eventId: event._id,
            email: session?.user?.email,
          }),
        },
      );

      if (res.ok) {
        setIsJoined(true);
      }
    }
  };

  console.log("isJoined:", isJoined);

  return (
    <>
      {/* Participants */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Event participation</h3>
          <Users className="size-5 text-pri" />
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-3xl font-extrabold">22</p>
            <p className="mt-1 text-sm text-mut">People joined</p>
          </div>

          <p className="text-sm font-semibold text-pri">
            100
            {/* {capacity > 0
              ? `${availableSeats} seats left`
              : "No capacity limit"} */}
          </p>
        </div>

        {/* Progress */}
        {/* {capacity > 0 && (
          <>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-pri/10">
              <div
                className="h-full rounded-full bg-pri transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs text-mut">
              <span>{Math.round(progress)}% filled</span>
              <span>{capacity} capacity</span>
            </div>
          </>
        )} */}
      </div>

      {/* Join / Cancel Button */}
      <Button
        onClick={handleJoin}
        disabled={isJoined}
        className={`mt-7 h-12 w-full rounded-full font-bold border border-line ${
          isJoined
            ? "bg-green-500/10 text-green-600 hover:bg-green-500/10"
            : "bg-pri/10 text-pri hover:bg-pri/20"
        }`}
      >
        <CheckCircle2 className="mr-2 size-4" />
        {isJoined ? "Already Joined" : "Join Event"}
      </Button>

      <p className="mt-3 text-center text-xs text-pri">
        You are participating in this event.
      </p>
    </>
  );
};

export default JoinBtn;
