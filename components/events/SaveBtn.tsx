"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/lib/apiClient";
import { authClient } from "@/src/app/lib/auth-client";

type Props = {
  eventId?: string;
  /** If the parent already knows (one bulk fetch for a list), the per-button check is skipped. */
  initialSaved?: boolean;
  variant?: "icon" | "button";
  /** Called after a successful toggle (the saved page uses it to drop the card). */
  onChange?: (saved: boolean) => void;
};

export default function SaveBtn({ eventId, initialSaved, variant = "icon", onChange }: Props) {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  // `local` holds the value after the user toggles or after our own check;
  // until then we follow whatever the parent says.
  const [local, setSaved] = useState<boolean | null>(null);
  const saved = local ?? initialSaved ?? false;
  const [busy, setBusy] = useState(false);

  // Standalone use (event page): ask the API on our own.
  useEffect(() => {
    if (initialSaved !== undefined || !email || !eventId) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await api("/saved/ids");
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
    // the button sits inside a card/link, so it must not trigger it
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
      const res = next
        ? await api("/saved", { method: "POST", json: { eventId } })
        : await api(`/saved/${eventId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("request failed");

      toast.success(next ? "Event saved" : "Removed from saved");
      onChange?.(next);
    } catch (err) {
      console.error(err);
      setSaved(!next); // roll back
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const icon = <Bookmark className={`size-4 ${saved ? "fill-current" : ""}`} />;

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        aria-pressed={saved}
        className={`mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-full border text-sm font-medium transition ${
          saved ? "border-pri bg-pri/10 text-pri" : "border-line hover:bg-muted"
        }`}
      >
        {icon}
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
      {icon}
    </button>
  );
}
