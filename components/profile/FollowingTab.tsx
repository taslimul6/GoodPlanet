"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/apiClient";

import { FollowedOrganizer } from "./types";

export default function FollowingTab({ onCountChange }: { onCountChange: (count: number) => void }) {
  const [list, setList] = useState<FollowedOrganizer[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api("/following");
        if (!res.ok) throw new Error("failed");
        setList(await res.json());
      } catch (err) {
        console.error(err);
        setFailed(true);
      }
    })();
  }, []);

  const unfollow = async (organizer: string) => {
    if (busy) return;
    setBusy(organizer);
    try {
      const res = await api(`/follow/${encodeURIComponent(organizer)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("failed");

      const next = (list ?? []).filter((o) => o.organizer !== organizer);
      setList(next);
      onCountChange(next.length);
      toast.success(`Unfollowed ${organizer}`);
    } catch (err) {
      console.error(err);
      toast.error("Could not unfollow. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  if (failed) {
    return (
      <div className="rounded-2xl border border-line bg-card px-5 py-14 text-center">
        <h3 className="text-lg font-extrabold">Could not load your list</h3>
        <p className="mt-2 text-sm text-mut">Please try again later.</p>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-card px-5 py-14 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-pri/10 text-pri">
          <Heart className="size-6" />
        </div>
        <h3 className="mt-4 text-lg font-extrabold">
          You are not following anyone yet
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-mut">
          Open an event and press Follow on its organizer to keep track of the
          people behind the events you like.
        </p>
        <Link
          href="/events"
          className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-pri px-6 text-sm font-bold text-on transition hover:opacity-90"
        >
          Explore events
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {list.map((o) => (
        <div
          key={o.organizer}
          className="flex items-center gap-4 rounded-2xl border border-line bg-card p-4 sm:p-5"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-pri/10 text-lg font-extrabold text-pri">
            {o.organizer[0]?.toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-bold">{o.organizer}</p>
            <p className="mt-1 text-xs text-mut">
              {o.eventsCount} events · {o.upcomingCount} upcoming ·{" "}
              {o.followers} {o.followers === 1 ? "follower" : "followers"}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={busy === o.organizer}
            onClick={() => unfollow(o.organizer)}
            className="h-9 shrink-0 rounded-full border-line px-4 text-sm"
          >
            Unfollow
          </Button>
        </div>
      ))}
    </div>
  );
}
