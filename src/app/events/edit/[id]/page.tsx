"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import EventForm, { EventFormValues } from "@/components/events/EventForm";
import { api } from "@/lib/apiClient";
import { Event } from "@/lib/event";
import { authClient } from "@/src/app/lib/auth-client";

const Loading = () => (
  <main className="min-h-screen bg-bg text-fg">
    <div className="mx-auto w-full max-w-5xl px-5 pt-20 text-center">
      <p className="text-sm text-mut">Loading event...</p>
    </div>
  </main>
);

export default function EditEventPage() {
  // useParams needs a Suspense boundary with Cache Components
  return (
    <Suspense fallback={<Loading />}>
      <EditEvent />
    </Suspense>
  );
}

function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api(`/event/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load event");
        setEvent(await res.json());
      } catch (err) {
        console.error(err);
        toast.error("Failed to load event");
        router.push("/events/manage");
      }
    })();
  }, [id, router]);

  const saveEvent = async (values: EventFormValues) => {
    // the server only lets the owner edit, and keeps the owner's email
    const res = await api(`/event/${id}`, {
      method: "PUT",
      json: { ...values, createdBy: session?.user?.name },
    });

    if (!res.ok) {
      toast.error(res.status === 403 ? "You can only edit your own events." : "Failed to update event");
      return false;
    }

    toast.success("Event updated successfully!");
    router.push("/events/manage");
    router.refresh();
    return true;
  };

  if (!event) return <Loading />;

  return <EventForm mode="edit" initial={event} onSubmit={saveEvent} />;
}
