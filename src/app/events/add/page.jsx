"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const categories = [
  "Environment",
  "Community",
  "Food & Hunger",
  "Education",
  "Health & Wellness",
  "Other",
];

export default function AddEventPage() {
  const [imageName, setImageName] = useState("");

  return (
    <main className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-5 pt-12 pb-8 lg:pt-16">
        <Button
          asChild
          variant="ghost"
          className="h-auto px-0 text-mut hover:bg-transparent hover:text-pri"
        >
          <a href="/events">
            <span aria-hidden="true">←</span>
            Back to events
          </a>
        </Button>

        <div className="mt-7">
          <p className="text-sm font-bold text-pri">GoodPlanet community</p>

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
            <form className="space-y-8">
              {/* Event Details */}
              <div>
                <div className="mb-5">
                  <h2 className="text-xl font-extrabold">Event details</h2>
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

                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
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
                  </div>
                </div>
              </div>

              <div className="h-px bg-line" />

              {/* Date and Location */}
              <div>
                <div className="mb-5">
                  <h2 className="text-xl font-extrabold">Date & location</h2>
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
                      required
                      className="h-12 rounded-xl border-line bg-bg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventType">
                      Event type <span className="text-pri">*</span>
                    </Label>

                    <Select name="eventType" defaultValue="In-person" required>
                      <SelectTrigger
                        id="eventType"
                        className="h-12 w-full rounded-xl border-line bg-bg"
                      >
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="In-person">In-person</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
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
                    Add an image and set the number of participants.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="coverImage">Event cover image</Label>

                    <Input
                      id="coverImage"
                      name="coverImage"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(event) =>
                        setImageName(event.target.files?.[0]?.name || "")
                      }
                      className="h-12 rounded-xl border-line bg-bg file:mr-4 file:rounded-lg file:border-0 file:bg-pri/10 file:px-4 file:py-2 file:font-semibold file:text-pri"
                    />

                    {imageName && (
                      <p className="text-xs text-mut">{imageName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Participant capacity</Label>
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
                    asChild
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