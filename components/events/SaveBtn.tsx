"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/src/app/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const API = process.env.NEXT_PUBLIC_MAIN_API;

type Props = {
  eventId?: string;
  /** If known by the parent (e.g. from one bulk fetch), skips the per-button check. */
  initialSaved?: boolean;
  variant?: "icon" | "button";
  /** Called after a successful toggle (used by the saved page to drop the card). */
  onChange?: (saved: boolean) => void;
};

export default function SaveBtn({
  eventId,
  initialSaved,
  variant = "icon",
  onChange,
}: Props) {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  // `local` holds the value after the user toggles / after our own check;
  // until then we follow whatever the parent says.
  const [local, setSaved] = useState<boolean | null>(null);
  const saved = local ?? initialSaved ?? false;
  const [busy, setBusy] = useState(false);

  // standalone usage (detail page): check on our own
  useEffect(() => {
    if (initialSaved !== undefined || !email || !eventId) return;

    let cancelled = false;
    (async () => {
      try {
        const token = await getTokenFromClient();
        const res = await fetch(`${API}/saved/ids`, {
          headers: { Authorization: `Bearer ${token}`, query: email },
        });
        if (!res.ok) return;
        const ids: string[] = await res.json();
        if (!cancelled) setSaved(ids.includes(eventId));
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [email, eventId, initialSaved]);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!email || !eventId) {
      toast.error("Please log in to save events.");
      return;
    }
    if (busy) return;

    const next = !saved;
    setSaved(next); // optimistic
    setBusy(true);

    try {
      const token = await getTokenFromClient();
      const res = next
        ? await fetch(`${API}/saved`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ eventId, email }),
          })
        : await fetch(`${API}/saved/${eventId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}`, query: email },
          });

      if (!res.ok) throw new Error("request failed");

      toast.success(next ? "Event saved" : "Removed from saved");
      onChange?.(next);
    } catch (err) {
      console.error(err);
      setSaved(!next); // rollback
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        aria-pressed={saved}
        className={`mt-3 flex h-10 w-full items-center justify-center rounded-full border text-sm font-medium transition ${
          saved
            ? "border-pri bg-pri/10 text-pri"
            : "border-line hover:bg-muted"
        }`}
      >
        <Bookmark className={`mr-2 size-4 ${saved ? "fill-current" : ""}`} />
        {saved ? "Saved" : "Save event"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved events" : "Save event"}
      className={`absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-card/95 transition hover:scale-105 ${
        saved ? "text-pri" : "text-fg"
      }`}
    >
      <Bookmark className={`size-4 ${saved ? "fill-current" : ""}`} />
    </button>
  );
}
