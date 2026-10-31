import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  CalendarDays,
  MapPin,
  Users,
  ArrowRight,
  TicketCheck,
  Clock,
} from "lucide-react";

const joinedEvents = [
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
      "Join the community to plant native trees and create a greener neighborhood.",
  },
  {
    id: 2,
    title: "Beach Cleanup Campaign",
    category: "Environment",
    date: "November 18, 2026",
    location: "Cox's Bazar, Bangladesh",
    participants: 65,
    capacity: 120,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba9?auto=format&fit=crop&w=900&h=600&q=85",
    description:
      "Help clean our beautiful beaches and protect marine life from plastic pollution.",
  },
  {
    id: 3,
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
      "Help collect and distribute warm clothes to families in need this winter.",
  },
  {
    id: 4,
    title: "Neighborhood Clean-up",
    category: "Community",
    date: "October 18, 2026",
    location: "Dhanmondi, Dhaka",
    participants: 30,
    capacity: 50,
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&h=600&q=85",
    description:
      "A community clean-up initiative to make our streets cleaner and safer.",
  },
];

export default function JoinedEventsPage() {
  const upcomingEvents = joinedEvents.filter(
    (event) => event.status === "Upcoming"
  ).length;

  const completedEvents = joinedEvents.filter(
    (event) => event.status === "Completed"
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
              Joined Events
            </h1>

            <p className="mt-2 text-sm text-mut sm:text-base">
              Keep track of the events you are participating in.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-pri px-6 text-sm font-bold text-on transition hover:opacity-90 sm:w-auto"
          >
            Explore events
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Statistics */}
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="gap-0 rounded-2xl border-line bg-card p-5 shadow-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-mut">
                Total joined
              </p>
              <TicketCheck className="size-5 text-pri" />
            </div>

            <p className="mt-3 text-3xl font-extrabold">
              {joinedEvents.length.toString().padStart(2, "0")}
            </p>
          </Card>

          <Card className="gap-0 rounded-2xl border-line bg-card p-5 shadow-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-mut">
                Upcoming events
              </p>
              <Clock className="size-5 text-pri" />
            </div>

            <p className="mt-3 text-3xl font-extrabold text-pri">
              {upcomingEvents.toString().padStart(2, "0")}
            </p>
          </Card>

          <Card className="gap-0 rounded-2xl border-line bg-card p-5 shadow-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-mut">
                Completed events
              </p>
              <CalendarDays className="size-5 text-pri" />
            </div>

            <p className="mt-3 text-3xl font-extrabold">
              {completedEvents.toString().padStart(2, "0")}
            </p>
          </Card>
        </div>

        {/* Joined Events */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl">
                Your joined events
              </h2>

              <p className="mt-1 text-sm text-mut">
                Events you have registered to participate in
              </p>
            </div>

            <span className="text-sm font-semibold text-mut">
              {joinedEvents.length} events
            </span>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {joinedEvents.map((event) => (
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

                  {/* Action */}
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-line text-sm font-semibold transition hover:border-pri hover:bg-pri/10 hover:text-pri"
                    >
                      View event details
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Explore More */}
        <div className="mt-12 rounded-2xl border border-line bg-card p-6 text-center sm:p-10">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-pri/10">
            <TicketCheck className="size-6 text-pri" />
          </div>

          <h3 className="mt-4 text-xl font-extrabold">
            Want to make more impact?
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mut">
            Discover more community events and join initiatives that make a
            positive difference.
          </p>

          <Button
            asChild={false}
            className="mt-5 rounded-full bg-pri px-6 text-on hover:opacity-90"
          >
            <Link href="/events">Explore events</Link>
          </Button>
        </div>

      </div>
    </main>
  );
}