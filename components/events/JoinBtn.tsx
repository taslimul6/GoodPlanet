"use client";

import { useState } from "react";
import { CheckCircle2, Clock, TriangleAlert, XCircle } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/event";
import { api } from "@/lib/apiClient";

import type { CapacityInfo } from "./EventParticipants";

const JoinBtn = ({
  event,
  info,
  refresh,
}: {
  event: Event;
  /** null while the first capacity request is still running */
  info: CapacityInfo | null;
  refresh: () => Promise<void>;
}) => {
  const [busy, setBusy] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  /** Runs one action with a busy flag; always refreshes the numbers afterwards. */
  const run = async (action: () => Promise<void>) => {
    if (busy) return;
    setBusy(true);
    try {
      await action();
    } finally {
      await refresh();
      setBusy(false);
    }
  };

  const handleJoin = () =>
    run(async () => {
      const res = await api("/event/join", { method: "POST", json: { eventId: event._id } });

      if (res.ok) {
        toast.success("You have successfully joined this event!");
      } else if (res.status === 409) {
        const data = await res.json().catch(() => ({}));
        toast.error(
          data.full
            ? "Sorry, this event just filled up. You can join the waitlist."
            : data.message || "You have already joined this event."
        );
      } else {
        toast.error("Failed to join this event. Please try again.");
      }
    });

  const handleCancel = () =>
    run(async () => {
      setConfirmOpen(false);
      try {
        const res = await api(`/event/join/${event._id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("cancel failed");
        toast.success("You have cancelled your participation.");
      } catch (err) {
        console.error(err);
        toast.error("Failed to cancel. Please try again.");
      }
    });

  const handleJoinWaitlist = () =>
    run(async () => {
      try {
        const res = await api("/event/waitlist", { method: "POST", json: { eventId: event._id } });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || "failed");
        toast.success(`You are #${data.position} on the waitlist.`);
      } catch (err) {
        console.error(err);
        toast.error(
          err instanceof Error && err.message !== "failed"
            ? err.message
            : "Could not join the waitlist. Please try again."
        );
      }
    });

  const handleLeaveWaitlist = () =>
    run(async () => {
      try {
        const res = await api(`/event/waitlist/${event._id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("failed");
        toast.success("You left the waitlist.");
      } catch (err) {
        console.error(err);
        toast.error("Could not leave the waitlist. Please try again.");
      }
    });

  /* --------------------------------- states -------------------------------- */

  // still loading the first answer
  if (!info) {
    return <div className="mt-7 h-12 w-full animate-pulse rounded-full bg-muted" />;
  }

  // 1. already joined
  if (info.joinedByMe) {
    return (
      <>
        <div className="mt-7 flex h-12 w-full items-center justify-center rounded-full border border-line bg-green-500/10 font-bold text-green-600">
          <CheckCircle2 className="mr-2 size-4" />
          You have joined
        </div>

        <Button
          onClick={() => setConfirmOpen(true)}
          disabled={busy}
          variant="outline"
          className="mt-3 h-10 w-full rounded-full border border-red-500/30 font-semibold text-red-600 hover:bg-red-500/10 hover:text-red-600"
        >
          <XCircle className="mr-2 size-4" />
          {busy ? "Please wait..." : "Cancel join"}
        </Button>

        <p className="mt-3 text-center text-xs text-pri">
          You are participating in this event.
        </p>

        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent className="rounded-2xl border border-line bg-bg">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-red-500/10 text-red-600">
                <TriangleAlert />
              </AlertDialogMedia>
              <AlertDialogTitle className="text-lg font-extrabold">
                Cancel your participation?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will no longer be registered for{" "}
                <span className="font-semibold text-fg">{event.title}</span>.
                {info.capacity > 0
                  ? " Your spot will go to the next person on the waitlist, if there is one."
                  : " You can join again later."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="rounded-b-2xl border-line bg-card">
              <AlertDialogCancel className="rounded-full">
                Keep my spot
              </AlertDialogCancel>
              <Button
                onClick={handleCancel}
                className="rounded-full bg-red-600 text-white hover:bg-red-700"
              >
                Yes, cancel join
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  // 2. waiting for a spot
  if (info.onWaitlist) {
    return (
      <>
        <div className="mt-7 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-center">
          <div className="flex items-center justify-center gap-2 font-bold text-amber-600">
            <Clock className="size-4" />
            You are #{info.position} on the waitlist
          </div>
          <p className="mt-1 text-xs text-mut">
            If a spot opens up you will be added automatically. Check
            &ldquo;Joined events&rdquo; to see it.
          </p>
        </div>

        <Button
          onClick={handleLeaveWaitlist}
          disabled={busy}
          variant="outline"
          className="mt-3 h-10 w-full rounded-full border-line font-semibold"
        >
          {busy ? "Please wait..." : "Leave waitlist"}
        </Button>
      </>
    );
  }

  // 3. full -> offer the waitlist
  if (info.full) {
    return (
      <>
        <div className="mt-7 flex h-12 w-full items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 font-bold text-red-600">
          Event full
        </div>

        <Button
          onClick={handleJoinWaitlist}
          disabled={busy}
          className="mt-3 h-11 w-full rounded-full bg-pri font-bold text-on hover:opacity-90"
        >
          <Clock className="mr-2 size-4" />
          {busy ? "Please wait..." : "Join waitlist"}
        </Button>

        <p className="mt-3 text-center text-xs text-mut">
          {info.waitlistCount > 0
            ? `${info.waitlistCount} ${info.waitlistCount === 1 ? "person is" : "people are"} waiting. `
            : ""}
          You will get a spot automatically if someone cancels.
        </p>
      </>
    );
  }

  // 4. normal join
  return (
    <Button
      onClick={handleJoin}
      disabled={busy}
      className="mt-7 h-12 w-full rounded-full border border-line bg-pri/10 font-bold text-pri hover:bg-pri/20"
    >
      <CheckCircle2 className="mr-2 size-4" />
      {busy ? "Please wait..." : "Join Event"}
    </Button>
  );
};

export default JoinBtn;
