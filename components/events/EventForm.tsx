"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { Event } from "@/lib/event";
import { useToday } from "@/lib/useToday";

/** What the form sends back: every named field as text. */
export type EventFormValues = Record<string, string>;

const CATEGORIES = [
  "Environment",
  "Community",
  "Food & Hunger",
  "Education",
  "Health & Wellness",
  "Other",
];

const IMAGE_SUGGESTIONS = [
  { name: "Nature", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e" },
  { name: "Feeding children", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c" },
  { name: "Plantation", url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b" },
];

const REQUIRED_FIELDS = {
  title: "Title is required",
  category: "Category is required",
  description: "Description is required",
  date: "Date is required",
  location: "Location is required",
};

/** Returns a message per invalid field (empty object when everything is fine). */
function validate(values: EventFormValues, minDate: string) {
  const errors: Record<string, string> = {};

  for (const [field, message] of Object.entries(REQUIRED_FIELDS)) {
    if (!values[field]?.trim()) errors[field] = message;
  }

  if (values.date && !errors.date && values.date < minDate) errors.date = "The date cannot be in the past";
  if (values.image && !/^https?:\/\//i.test(values.image)) errors.image = "Enter a link starting with http:// or https://";
  if (values.capacity && !(Number.isInteger(+values.capacity) && +values.capacity >= 1)) {
    errors.capacity = "Capacity must be a whole number, 1 or more";
  }
  if (values.hours && !(Number.isInteger(+values.hours) && +values.hours >= 1 && +values.hours <= 24)) {
    errors.hours = "Volunteer hours must be a whole number from 1 to 24";
  }

  return errors;
}

const COPY = {
  create: {
    backHref: "/events",
    title: "Create an event",
    intro:
      "Bring people together for something good. Share the details of your event and invite the community to take part.",
    detailsHint: "Start with the basic information about your event.",
    imageHint: "Add an image URL and set the number of participants.",
    submit: "Create event",
  },
  edit: {
    backHref: "/events/manage",
    title: "Edit event",
    intro: "Update the details of your event and invite the community to take part.",
    detailsHint: "Update the basic information about your event.",
    imageHint: "Update the image URL and the number of participants.",
    submit: "Save changes",
  },
} as const;

const fieldClass = "h-12 rounded-xl border-line bg-bg";

/** Section heading used three times in the form. */
function Section({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-extrabold">{title}</h2>
        <p className="mt-1 text-sm text-mut">{hint}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </div>
  );
}

/** Label + control + validation message. */
function Field({
  id,
  label,
  required,
  error,
  wide,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-2 ${wide ? "sm:col-span-2" : ""}`}>
      <Label htmlFor={id}>
        {label} {required && <span className="text-pri">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/**
 * The page used by both "Create an event" and "Edit event".
 * `onSubmit` receives the validated values and resolves to true when the event was saved.
 */
export default function EventForm({
  mode,
  initial,
  onSubmit,
}: {
  mode: "create" | "edit";
  initial?: Event;
  onSubmit: (values: EventFormValues) => Promise<boolean>;
}) {
  const copy = COPY[mode];
  const [image, setImage] = useState(initial?.image ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Past dates are not allowed for new events. When editing an event that has already
  // happened, its own date must stay valid.
  const today = useToday();
  const minDate = initial?.date && String(initial.date) < today ? String(initial.date) : today;

  // keep the current category selectable even if it is not in the default list
  const categories =
    initial?.category && !CATEGORIES.includes(initial.category) ? [initial.category, ...CATEGORIES] : CATEGORIES;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const values = Object.fromEntries(new FormData(e.currentTarget).entries()) as EventFormValues;

    const found = validate(values, minDate);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg text-fg">
      <section className="mx-auto max-w-5xl px-5 pt-12 pb-8 lg:pt-16">
        <Link
          href={copy.backHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-mut transition hover:text-pri"
        >
          <span aria-hidden="true">←</span>
          Back to {mode === "create" ? "events" : "my events"}
        </Link>

        <div className="mt-7">
          <p className="text-sm font-bold text-pri">GoodPlanet community</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{copy.title}</h1>
          <p className="mt-3 max-w-2xl text-mut">{copy.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <Card className="gap-0 rounded-3xl border-line bg-card py-0 shadow-none">
          <CardContent className="p-5 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <Section title="Event details" hint={copy.detailsHint}>
                <Field id="eventTitle" label="Event title" required error={errors.title} wide>
                  <Input
                    id="eventTitle"
                    name="title"
                    defaultValue={initial?.title ?? ""}
                    placeholder="e.g. Community Tree Planting Day"
                    className={fieldClass}
                  />
                </Field>

                <Field id="category" label="Category" required error={errors.category}>
                  <Select name="category" defaultValue={initial?.category}>
                    <SelectTrigger id="category" className={`${fieldClass} w-full`}>
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
                </Field>

                <Field id="organizer" label="Organizer">
                  <Input
                    id="organizer"
                    name="organizer"
                    defaultValue={initial?.organizer ?? ""}
                    placeholder="Organization or group name"
                    className={fieldClass}
                  />
                </Field>

                <Field id="description" label="Event description" required error={errors.description} wide>
                  <Textarea
                    id="description"
                    name="description"
                    rows={5}
                    defaultValue={initial?.description ?? ""}
                    placeholder="What is the event about? What will participants do?"
                    className="min-h-32 resize-y rounded-xl border-line bg-bg"
                  />
                </Field>
              </Section>

              <div className="h-px bg-line" />

              <Section title="Date & location" hint="Let people know when and where the event will happen.">
                <Field id="eventDate" label="Event date" required error={errors.date}>
                  <Input
                    id="eventDate"
                    name="date"
                    type="date"
                    min={minDate}
                    defaultValue={initial?.date ?? ""}
                    suppressHydrationWarning
                    className={fieldClass}
                  />
                </Field>

                <Field id="location" label="Venue / address" required error={errors.location} wide>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={initial?.location ?? ""}
                    placeholder="Venue name, street address, city"
                    className={fieldClass}
                  />
                </Field>
              </Section>

              <div className="h-px bg-line" />

              <Section title="Cover image & capacity" hint={copy.imageHint}>
                <div className="space-y-3 sm:col-span-2">
                  <Label htmlFor="image">Event cover image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/event-image.jpg"
                    className={fieldClass}
                  />
                  {errors.image && <p className="text-xs text-red-500">{errors.image}</p>}

                  <div>
                    <p className="mb-2 text-xs font-semibold text-mut">Image suggestions</p>
                    <div className="flex flex-wrap gap-2">
                      {IMAGE_SUGGESTIONS.map((suggestion) => (
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
                      <img src={image} alt="Event cover preview" className="h-48 w-full object-cover" />
                    </div>
                  )}
                </div>

                <Field id="capacity" label="Participant capacity" error={errors.capacity}>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    defaultValue={initial?.capacity ?? ""}
                    placeholder="e.g. 100"
                    className={fieldClass}
                  />
                </Field>

                <Field id="hours" label="Volunteer hours" error={errors.hours}>
                  <Input
                    id="hours"
                    name="hours"
                    type="number"
                    min="1"
                    max="24"
                    defaultValue={initial?.hours ?? ""}
                    placeholder="e.g. 4 (hours credited to each participant)"
                    className={fieldClass}
                  />
                </Field>
              </Section>

              <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-mut">
                  Fields marked <span className="text-pri">*</span> are required.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={copy.backHref}
                    className={buttonVariants({ variant: "outline", className: "h-12 rounded-full border-line px-6" })}
                  >
                    Cancel
                  </Link>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-12 rounded-full bg-pri px-7 font-bold text-on hover:opacity-90"
                  >
                    {submitting ? "Saving..." : copy.submit}
                    {!submitting && <span aria-hidden="true">→</span>}
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
