import FeaturedEventCard from "./FeaturedEventCard";
import { Event } from "@/lib/event";

const Events = async () => {
  const api = process.env.FEATURED_API ?? "";
  const res = await fetch(api);
  const featuredData = (await res.json()) as Event[];



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

        <div id="ev" className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          
          {
            featuredData.map((event) => <FeaturedEventCard key={event._id} event={event} />)

          }
         

         
        </div>
      </div>
    </section>
  );
}


export default Events;