"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import EventForm, { EventFormValues } from "@/components/events/EventForm";
import { api } from "@/lib/apiClient";
import { authClient } from "@/src/app/lib/auth-client";

export default function AddEventPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const createEvent = async (values: EventFormValues) => {
    // the owner (email) is taken from the login token by the server
    const res = await api("/event", {
      method: "POST",
      json: { ...values, createdBy: session?.user?.name },
    });

    if (!res.ok) {
      toast.error("Could not create the event. Please try again.");
      return false;
    }

    toast.success("Event created successfully!");
    router.push("/events/manage");
    return true;
  };

  return <EventForm mode="create" onSubmit={createEvent} />;
}
