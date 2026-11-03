"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { authClient } from "@/src/app/lib/auth-client";
import { Event } from "@/lib/event";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const JoinBtn = ({ event, onJoin }: { event: Event; onJoin?: () => void }) => {

  console.log("event in JoinBtn:", event._id);

  const [isJoined, setIsJoined] = useState(false);
  const { data: session } = authClient.useSession();



  useEffect(() => {
    const checkIfJoined = async () => {

      const token = await getTokenFromClient(); // get token from client side
      if (session?.user?.email) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MAIN_API}/event/joined/check`,
          {
           
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
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
    const token = await getTokenFromClient();

    if (!isJoined) {

      const {_id, email, ...eventData} = event;

      console.log(`id ${_id} \\\ event:${eventData}`)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API}/event/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...eventData,
            eventId:_id,
            email: session?.user?.email,
          }),
        },
      );

      if (res.ok) {
        setIsJoined(true);
        onJoin?.();
        toast.success("You have successfully joined this event!");
      } else {
        toast.error("Failed to join this event. Please try again.");
      }
    }
  };

  console.log("isJoined:", isJoined);

  return (
    <>
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
