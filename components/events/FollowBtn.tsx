"use client";

import { useEffect, useState } from "react";
import { UserCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/lib/apiClient";
import { authClient } from "@/src/app/lib/auth-client";

export default function FollowBtn({
  organizer,
  ownerEmail,
}: {
  organizer?: string;
  /** Email of the person who created the event: you cannot follow yourself. */
  ownerEmail?: string;
}) {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!email || !organizer) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await api(`/follow/status/${encodeURIComponent(organizer)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setFollowing(data.following);
          setFollowers(data.followers);
        }
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [email, organizer]);

  if (!organizer) return null;

  const isOwn = Boolean(email && ownerEmail && email === ownerEmail);

  const toggle = async () => {
    if (!email) {
      toast.error("Please log in to follow organizers.");
      return;
    }
    if (busy) return;

    setBusy(true);
    const next = !following;

    try {
      const res = next
        ? await api("/follow", { method: "POST", json: { organizer } })
        : await api(`/follow/${encodeURIComponent(organizer)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("request failed");

      const data = await res.json();
      setFollowing(data.following);
      setFollowers(data.followers);
      toast.success(next ? `You are following ${organizer}` : "Unfollowed");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="ml-auto flex shrink-0 flex-col items-end gap-1">
      {!isOwn && (
        <button
          type="button"
          onClick={toggle}
          disabled={busy}
          aria-pressed={following}
          className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
            following
              ? "border-pri bg-pri/10 text-pri"
              : "border-line hover:border-pri hover:bg-pri/10 hover:text-pri"
          }`}
        >
          {following ? <UserCheck className="size-4" /> : <UserPlus className="size-4" />}
          {following ? "Following" : "Follow"}
        </button>
      )}

      {followers !== null && (
        <span className="text-xs text-mut">
          {followers} {followers === 1 ? "follower" : "followers"}
        </span>
      )}
    </div>
  );
}
