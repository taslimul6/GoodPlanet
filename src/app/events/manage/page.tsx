import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  CalendarDays,
  MapPin,
  Users,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

const myEvents = [
  {
    id: 1,
    title: "Community Tree Planting Day",
    category: "Environment",
    date: "November 14, 2026",
    location: "Dhaka, Bangladesh",
    participants: 42,
    capacity: 100,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&h=600&q=85",
    description:
      "Join our community to plant native trees and create a greener neighborhood.",
  },
  {
    id: 2,
    title: "Winter Clothes Donation",
    category: "Community",
    date: "November 21, 2026",
    location: "Mirpur, Dhaka",
    participants: 85,
    capacity: 150,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=900&h=600&q=85",
    description:
      "Collect and distribute warm clothes to families in need this winter.",
  },
  {
    id: 3,
    title: "Neighborhood Clean-up",
    category: "Environment",
    date: "October 18, 2026",
    location: "Dhanmondi, Dhaka",
    participants: 30,
    capacity: 50,
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba9?auto=format&fit=crop&w=900&h=600&q=85",
    description:
      "A community clean-up initiative to make our streets cleaner and safer.",
  },
];

export default function MyEventsPage() {
  const totalParticipants = myEvents.reduce(
    (total, event) => total + event.participants,
    0
  );

  const upcomingEvents = myEvents.filter(
    (event) => event.status === "Upcoming"
  ).length;

  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-pri">
              GoodPlanet dashboard
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              My Events
            </h1>

            <p className="mt-2 text-sm text-mut sm:text-base">
              Manage your events and track community participation.
            </p>
          </div>

          <Link
            href="/events/add"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-pri px-6 text-sm font-bold text-on transition hover:opacity-90 sm:w-auto"
          >
            <Plus className="size-4" />
            Create event
          </Link>
        </div>

        {/* Statistics */}
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="gap-0 rounded-2xl border-line bg-card p-5 shadow-none">
            <p className="text-sm font-medium text-mut">
              Total events
            </p>
            <p className="mt-2 text-3xl font-extrabold">
              {myEvents.length.toString().padStart(2, "0")}
            </p>
          </Card>

          <Card className="gap-0 rounded-2xl border-line bg-card p-5 shadow-none">
            <p className="text-sm font-medium text-mut">
              Upcoming events
            </p>
            <p className="mt-2 text-3xl font-extrabold text-pri">
              {upcomingEvents.toString().padStart(2, "0")}
            </p>
          </Card>

          <Card className="gap-0 rounded-2xl border-line bg-card p-5 shadow-none">
            <p className="text-sm font-medium text-mut">
              Total participants
            </p>
            <p className="mt-2 text-3xl font-extrabold">
              {totalParticipants}
            </p>
          </Card>
        </div>

        {/* Events Section */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl">
                Your created events
              </h2>

              <p className="mt-1 text-sm text-mut">
                All events created by you
              </p>
            </div>

            <span className="text-sm font-semibold text-mut">
              {myEvents.length} events
            </span>
          </div>

          {/* Event Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {myEvents.map((event) => (
              <Card
                key={event.id}
                className="group flex flex-col gap-0 overflow-hidden rounded-2xl border-line bg-card p-0 shadow-none transition hover:-translate-y-1 hover:shadow-lg hover:shadow-pri/5"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <Badge className="absolute left-3 top-3 border-0 bg-card text-fg hover:bg-card">
                    {event.category}
                  </Badge>

                  <Badge
                    className={`absolute right-3 top-3 border-0 ${
                      event.status === "Upcoming"
                        ? "bg-pri text-on hover:bg-pri"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary"
                    }`}
                  >
                    {event.status}
                  </Badge>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-extrabold leading-snug">
                    {event.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mut">
                    {event.description}
                  </p>

                  {/* Event Info */}
                  <div className="mt-5 space-y-3 border-t border-line pt-4">
                    <div className="flex items-center gap-2 text-sm text-mut">
                      <CalendarDays className="size-4 shrink-0 text-pri" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-mut">
                      <MapPin className="size-4 shrink-0 text-pri" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-mut">
                      <Users className="size-4 shrink-0 text-pri" />
                      <span>
                        {event.participants} / {event.capacity} participants
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex gap-2 pt-6">
                    <Link
                      href={`/events/edit/${event.id}`}
                      className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-line text-sm font-medium transition hover:bg-pri/10"
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Link>

                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 flex-1 rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}