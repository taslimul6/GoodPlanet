import { Event } from "@/lib/event";

export default function EventCard({ event }: { event: Event }) {
  const formatDate = (date: string | number | undefined) => {
    if (!date) return "Date not specified";

    const [year, month, day] = String(date).split("-").map(Number);
    const eventDate = new Date(year, month - 1, day);

    if (Number.isNaN(eventDate.getTime())) {
      return "Date not specified";
    }

    return eventDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <article className="group flex flex-col sm:flex-row bg-card border border-line rounded-2xl overflow-hidden hover:border-pri/50 hover:shadow-lg hover:shadow-pri/5 transition">
      <div className="relative h-52 sm:h-auto sm:w-44 md:w-48 shrink-0 overflow-hidden">
        <img
          src={event.image || "/placeholder-event.jpg"}
          alt={event.title || "Event"}
          className="w-full h-full object-cover"
        />

        {event.category && (
          <span className="absolute top-3 left-3 bg-card/95 text-fg text-xs font-bold px-3 py-1.5 rounded-full">
            {event.category}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-sm text-pri font-bold">
          <span>{formatDate(event.date)}</span>

          <span className="size-1 rounded-full bg-pri" />

          <span className="text-mut font-medium">
            {event.location}
          </span>
        </div>

        <h3 className="mt-2 text-xl font-extrabold tracking-tight">
          {event.title}
        </h3>

        <p className="mt-2 text-sm text-mut leading-relaxed">
          {event.description}
        </p>

        <a
          href={`/events/${event._id}`}
          className="inline-flex items-center gap-2 mt-4 text-pri text-sm font-bold hover:gap-3 transition-all"
        >
          View event
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}