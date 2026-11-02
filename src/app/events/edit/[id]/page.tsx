"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { FormEvent } from "react";

import { authClient } from "@/src/app/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const categories = [
  "Environment",
  "Community",
  "Food & Hunger",
  "Education",
  "Health & Wellness",
  "Other",
];

const imageSuggestions = [
  {
    name: "Nature",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  },
  {
    name: "Feeding children",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
  },
  {
    name: "Plantation",
    url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
  },
];

interface Event {
  _id?: string;
  title?: string;
  category?: string;
  organizer?: string;
  description?: string;
  date?: string;
  location?: string;
  image?: string;
  capacity?: string | number;
  status?: string;
  participants?: string[];


}

export default function EditEventPage() {
    return (
        <Suspense fallback={<>Loading</>}>
            <PageContent />
        </Suspense>
    );
}

export  function PageContent() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id;

  const { data: session } = authClient.useSession();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MAIN_API}/event/${eventId}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to load event");
        const data = await res.json();
        setEvent(data);
        setImage(data.image || "");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load event");
        router.push("/events/manage");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const eventData = {
      ...data,
      createdBy: session?.user?.name,
      email: session?.user?.email,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API}/event/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (res.ok) {
        toast.success("Event updated successfully!");
        router.push("/events/manage");
        router.refresh();
      } else {
        toast.error("Failed to update event");
      }
    } catch (err) {
      console.error("Error updating event:", err);
      toast.error("Error updating event");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-bg text-fg">
        <div className="mx-auto w-full max-w-5xl px-5 pt-20 text-center">
          <p className="text-sm text-mut">Loading event...</p>
        </div>
      </main>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <main className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-5 pt-12 pb-8 lg:pt-16">
        <Button
          asChild
          variant="ghost"
          className="h-auto px-0 text-mut hover:bg-transparent hover:text-pri"
        >
          <a href="/events/manage">
            <span aria-hidden="true">←</span>
            Back to events
          </a>
        </Button>

        <div className="mt-7">
          <p className="text-sm font-bold text-pri">
            GoodPlanet community
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Edit event
          </h1>

          <p className="mt-3 max-w-2xl text-mut">
            Update the details of your event and invite the community to take part.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <Card className="gap-0 rounded-3xl border-line bg-card py-0 shadow-none">
          <CardContent className="space-y-8 p-5 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Event Details */}
              <div>
                <div className="mb-5">
                  <h2 className="text-xl font-extrabold">
                    Event details
                  </h2>
                  <p className="mt-1 text-sm text-mut">
                    Update the basic information about your event.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="eventTitle">
                      Event title <span className="text-pri">*</span>
                    </Label>

                    <Input
                      id="eventTitle"
                      name="title"
                      required
                      defaultValue={event.title || ""}
                      placeholder="e.g. Community Tree Planting Day"
                      className="h-12 rounded-xl border-line bg-bg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-pri">*</span>
                    </Label>

                    <Select name="category" required defaultValue={event.category}>
                      <SelectTrigger
                        id="category"
                        className="h-12 w-full rounded-xl border-line bg-bg"
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>

                      <SelectContent className="z-[100] border border-line bg-card text-fg shadow-xl">
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            className="cursor-pointer focus:bg-pri/10 focus:text-pri"
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizer">Organizer</Label>

                    <Input
                      id="organizer"
                      name="organizer"
                      defaultValue={event.organizer || ""}
                      placeholder="Organization or group name"
                      className="h-12 rounded-xl border-line bg-bg"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="description">
                      Event description <span className="text-pri">*</span>
                    </Label>

                    <Textarea
                      id="description"
                      name="description"
                      required
                      defaultValue={event.description || ""}
                      rows={5}
                      placeholder="What is the event about? What will participants do?"
                      className="min-h-32 resize-y rounded-xl border-line bg-bg"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-line" />

              {/* Date and Location */}
              <div>
                <div className="mb-5">
                  <h2 className="text-xl font-extrabold">
                    Date & location
                  </h2>
                  <p className="mt-1 text-sm text-mut">
                    Let people know when and where the event will happen.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">
                      Event date <span className="text-pri">*</span>
                    </Label>

                    <Input
                      id="eventDate"
                      name="date"
                      type="date"
                      min={minDate}
                      required
                      defaultValue={event.date || ""}
                      className="h-12 rounded-xl border-line bg-bg"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="location">
                      Venue / address <span className="text-pri">*</span>
                    </Label>

                    <Input
                      id="location"
                      name="location"
                      required
                      defaultValue={event.location || ""}
                      placeholder="Venue name, street address, city"
                      className="h-12 rounded-xl border-line bg-bg"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-line" />

              {/* Image and Capacity */}
              <div>
                <div className="mb-5">
                  <h2 className="text-xl font-extrabold">
                    Cover image & capacity
                  </h2>
                  <p className="mt-1 text-sm text-mut">
                    Update the image URL and the number of participants.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-3 sm:col-span-2">
                    <Label htmlFor="image">
                      Event cover image URL
                    </Label>

                    <Input
                      id="image"
                      name="image"
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      defaultValue={event.image || ""}
                      placeholder="https://example.com/event-image.jpg"
                      className="h-12 rounded-xl border-line bg-bg"
                    />

                    <div>
                      <p className="mb-2 text-xs font-semibold text-mut">
                        Image suggestions
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {imageSuggestions.map((suggestion) => (
                          <Button
                            key={suggestion.name}
                            type="button"
                            variant="outline"
                            onClick={() => setImage(suggestion.url)}
                            className="h-9 rounded-full border-line px-4 text-xs hover:border-pri hover:text-pri"
                          >
                            {suggestion.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {image && (
                      <div className="mt-3 overflow-hidden rounded-xl border border-line">
                        <img
                          src={image}
                          alt="Event cover preview"
                          className="h-48 w-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">
                      Participant capacity
                    </Label>

                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      min="1"
                      defaultValue={event.capacity || ""}
                      placeholder="e.g. 100"
                      className="h-12 rounded-xl border-line bg-bg"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-mut">
                  Fields marked <span className="text-pri">*</span> are
                  required.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    type="button"
                    variant="outline"
                    className="h-12 rounded-full border-line px-6"
                  >
                    <a href="/events/manage">Cancel</a>
                  </Button>

                  <Button
                    type="submit"
                    className="h-12 rounded-full bg-pri px-7 font-bold text-on hover:opacity-90"
                  >
                    Save changes
                    <span aria-hidden="true">→</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
