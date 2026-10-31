
const FeaturedEventCard = ({ event }) => {
  const eventDate = new Date(event.date);

  const day = eventDate.getDate();
  const month = eventDate.toLocaleString("en-US", {
    month: "short",
  });

  return (
    <article className="hv bg-bg border border-line rounded-3xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-pri/10 transition">
      <div className="im relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image || "/placeholder-event.jpg"}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 left-4 bg-card rounded-xl px-3.5 py-2 text-center leading-none shadow">
          <b className="text-2xl block">{day}</b>
          <span className="text-xs font-semibold text-pri">{month}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-sm font-semibold text-pri flex items-center gap-1.5">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>

          {event.location}
        </p>

        <h3 className="mt-2 text-xl font-extrabold">
          {event.title}
        </h3>

        <p className="mt-2 text-mut flex-1">
          {event.description}
        </p>

        <a
          href={`/events/${event._id}`}
          className="mt-5 h-11 rounded-full bg-pri/10 text-pri font-bold hover:bg-pri hover:text-on transition flex items-center justify-center"
        >
          Register now
        </a>
      </div>
    </article>
  );
};

export default FeaturedEventCard;
