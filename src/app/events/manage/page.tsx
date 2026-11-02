import Link from "next/link";


import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { headers } from "next/headers";

import {
  CalendarDays,
  MapPin,
  Users,
  Plus,

} from "lucide-react";
import { auth } from "../../lib/auth";
import { Suspense } from "react";
import ManageActions from "@/components/events/manage/Actions";






export default function MyEventsPage() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <MyEventsPageContent />
    </Suspense>
  );
}

export async function MyEventsPageContent() {


  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session?.user?.email);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_API}/myEvents`,
    { method: "GET", cache: "no-store", headers: { query: session?.user?.email } }
  );

  const myEvents = await response.json();

  const sortedEvents = myEvents
    .slice()
    .sort((a: any, b: any) => {
      const aUpcoming = a.status === "Upcoming";
      const bUpcoming = b.status === "Upcoming";
      if (aUpcoming && !bUpcoming) return -1;
      if (!aUpcoming && bUpcoming) return 1;
      return a.date.localeCompare(b.date);
    });



  
  
  
  //end api call

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
              {/* {totalParticipants} */}
              122
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
            {sortedEvents.map((event) => (
              <Card
                key={event._id}
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
                 <ManageActions event={event} />
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}