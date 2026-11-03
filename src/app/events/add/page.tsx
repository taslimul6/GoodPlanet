"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";

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
import { getTokenFromClient } from "@/lib/getTokenFromClient";

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

export default function AddEventPage() {
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const minDate =
    typeof window === "undefined"
      ? ""
      : `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(
          new Date().getDate()
        ).padStart(2, "0")}`;
      
      

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fdata = Object.fromEntries(formData.entries());

    const newErrors: Record<string, string> = {};
    if (!fdata.title) newErrors.title = "Title is required";
    if (!fdata.category) newErrors.category = "Category is required";
    if (!fdata.description) newErrors.description = "Description is required";
    if (!fdata.date) newErrors.date = "Date is required";
    if (!fdata.location) newErrors.location = "Location is required";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const eventData = {...fdata, createdBy: session?.user?.name , email: session?.user?.email , participants: []};

    console.log("Submitting event data:", eventData);

    

 //jwt token for auth

    const token = await getTokenFromClient(); // get token from client side

    const result = await fetch(process.env.NEXT_PUBLIC_MAIN_API + "/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });


    if(result.ok) {
      toast.success("Event created successfully!");
      setImage("");
      setTimeout(() => {
        router.push("/events/manage");
      }, 1200);
    }
  };

  return (
    <main className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-5 pt-12 pb-8 lg:pt-16">
        <Button
          variant="ghost"
          className="h-auto px-0 text-mut hover:bg-transparent hover:text-pri"
        >
          <a href="/events">
            <span aria-hidden="true">←</span>
            Back to events
          </a>
        </Button>

        <div className="mt-7">
          <p className="text-sm font-bold text-pri">
            GoodPlanet community
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Create an event
          </h1>

          <p className="mt-3 max-w-2xl text-mut">
            Bring people together for something good. Share the details of your
            event and invite the community to take part.
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
                    Start with the basic information about your event.
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
                      placeholder="e.g. Community Tree Planting Day"
                      className="h-12 rounded-xl border-line bg-bg"
                    />
                    {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-pri">*</span>
                    </Label>

                    <Select name="category" required>
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
                    {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizer">Organizer</Label>

                    <Input
                      id="organizer"
                      name="organizer"
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
                      rows={5}
                      placeholder="What is the event about? What will participants do?"
                       className="min-h-32 resize-y rounded-xl border-line bg-bg"
                     />
                     {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
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
                       className="h-12 rounded-xl border-line bg-bg"
                     />
                     {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="location">
                      Venue / address <span className="text-pri">*</span>
                    </Label>

                    <Input
                      id="location"
                      name="location"
                      required
                       placeholder="Venue name, street address, city"
                       className="h-12 rounded-xl border-line bg-bg"
                     />
                     {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
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
                    Add an image URL and set the number of participants.
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
                      placeholder="https://example.com/event-image.jpg"
                      className="h-12 rounded-xl border-line bg-bg"
                    />

                    <div>
                      <p className="mb-2 text-xs font-semibold text-mut">
                        Image suggestions
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {imageSuggestions.map((image) => (
                          <Button
                            key={image.name}
                            type="button"
                            variant="outline"
                            onClick={() => setImage(image.url)}
                            className="h-9 rounded-full border-line px-4 text-xs hover:border-pri hover:text-pri"
                          >
                            {image.name}
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
                    type="button"
                    variant="outline"
                    className="h-12 rounded-full border-line px-6"
                  >
                    <a href="/events">Cancel</a>
                  </Button>

                  <Button
                    type="submit"
                    className="h-12 rounded-full bg-pri px-7 font-bold text-on hover:opacity-90"
                  >
                    Create event
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