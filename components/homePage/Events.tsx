
import FeaturedEventCard from "./FeaturedEventCard";
import { isPrerenderAbort } from "@/lib/apiServer";
import { Event } from "@/lib/event";

/** Featured events for the home page. An unreachable API must not break the whole page. */
async function loadFeatured(): Promise<Event[]> {
  try {
    const res = await fetch(process.env.FEATURED_API ?? "");
    if (!res.ok) return [];
    return (await res.json()) as Event[];
  } catch (err) {
    if (isPrerenderAbort(err)) throw err;
    console.error("Could not load featured events:", err);
    return [];
  }
}

const Events = async () => {
  const featuredData = await loadFeatured();

  return (
    <section
      id="events"
      className="bg-card border-y border-line py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-pri font-bold text-sm">Upcoming events</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Find your next good day
            </h2>
          </div>

          <p className="text-mut max-w-sm">
            Free to join. Tools, gloves and refreshments are provided.
          </p>
        </div>

        {featuredData.length > 0 ? (
          <div id="ev" className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredData.map((event) => (
              <FeaturedEventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p className="mt-12 rounded-2xl border border-line bg-bg px-5 py-12 text-center text-mut">
            New events are coming soon. Please check back shortly.
          </p>
        )}
      </div>
    </section>
  );
}


export default Events;