
export default function Events() {
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
          {/* Event 1 */}
          <article className="hv bg-bg border border-line rounded-3xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-pri/10 transition">
            <div className="im relative aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&h=500&q=85"
                alt="Volunteers planting trees"
              />
              <div className="absolute top-4 left-4 bg-card rounded-xl px-3.5 py-2 text-center leading-none shadow">
                <b className="text-2xl block">14</b>
                <span className="text-xs font-semibold text-pri">Nov</span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <p className="text-sm font-semibold text-pri flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Nairobi, Kenya
              </p>

              <h3 className="mt-2 text-xl font-extrabold">
                Seedling Saturday
              </h3>

              <p className="mt-2 text-mut flex-1">
                Plant 5,000 native trees along the Ngong corridor with six local schools.
              </p>

              <button className="mt-5 h-11 rounded-full bg-pri/10 text-pri font-bold hover:bg-pri hover:text-on transition">
                Register now
              </button>
            </div>
          </article>

          {/* Event 2 */}
          <article className="hv bg-bg border border-line rounded-3xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-pri/10 transition">
            <div className="im relative aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&h=500&q=85"
                alt="Winter warmth drive"
              />
              <div className="absolute top-4 left-4 bg-card rounded-xl px-3.5 py-2 text-center leading-none shadow">
                <b className="text-2xl block">21</b>
                <span className="text-xs font-semibold text-pri">Nov</span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <p className="text-sm font-semibold text-pri flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Dhaka, Bangladesh
              </p>

              <h3 className="mt-2 text-xl font-extrabold">
                Winter Warmth Drive
              </h3>

              <p className="mt-2 text-mut flex-1">
                Sort and hand out 3,000 coats and blankets before the cold snap.
              </p>

              <button className="mt-5 h-11 rounded-full bg-pri/10 text-pri font-bold hover:bg-pri hover:text-on transition">
                Register now
              </button>
            </div>
          </article>

          {/* Event 3 */}
          <article className="hv bg-bg border border-line rounded-3xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-pri/10 transition">
            <div className="im relative aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba9?auto=format&fit=crop&w=800&h=500&q=85"
                alt="Shoreline clean-up"
              />
              <div className="absolute top-4 left-4 bg-card rounded-xl px-3.5 py-2 text-center leading-none shadow">
                <b className="text-2xl block">28</b>
                <span className="text-xs font-semibold text-pri">Nov</span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <p className="text-sm font-semibold text-pri flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Lisbon, Portugal
              </p>

              <h3 className="mt-2 text-xl font-extrabold">
                Shoreline Sweep
              </h3>

              <p className="mt-2 text-mut flex-1">
                Dawn beach clean-up with a litter count and a hot breakfast for all.
              </p>

              <button className="mt-5 h-11 rounded-full bg-pri/10 text-pri font-bold hover:bg-pri hover:text-on transition">
                Register now
              </button>
            </div>
          </article>

          {/* Event 4 */}
          <article className="hv bg-bg border border-line rounded-3xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-pri/10 transition">
            <div className="im relative aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&h=500&q=85"
                alt="Community food distribution"
              />
              <div className="absolute top-4 left-4 bg-card rounded-xl px-3.5 py-2 text-center leading-none shadow">
                <b className="text-2xl block">06</b>
                <span className="text-xs font-semibold text-pri">Dec</span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <p className="text-sm font-semibold text-pri flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Mumbai, India
              </p>

              <h3 className="mt-2 text-xl font-extrabold">
                The Community Table
              </h3>

              <p className="mt-2 text-mut flex-1">
                Cook and serve 1,200 hot meals alongside street-children shelters.
              </p>

              <button className="mt-5 h-11 rounded-full bg-pri/10 text-pri font-bold hover:bg-pri hover:text-on transition">
                Register now
              </button>
            </div>
          </article>

          {/* Event 5 */}
          <article className="hv bg-bg border border-line rounded-3xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-pri/10 transition">
            <div className="im relative aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&h=500&q=85"
                alt="Children reading books"
              />
              <div className="absolute top-4 left-4 bg-card rounded-xl px-3.5 py-2 text-center leading-none shadow">
                <b className="text-2xl block">13</b>
                <span className="text-xs font-semibold text-pri">Dec</span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <p className="text-sm font-semibold text-pri flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Medellín, Colombia
              </p>

              <h3 className="mt-2 text-xl font-extrabold">
                Books Under the Trees
              </h3>

              <p className="mt-2 text-mut flex-1">
                An open-air reading day. Donate, sort and read with 200 kids.
              </p>

              <button className="mt-5 h-11 rounded-full bg-pri/10 text-pri font-bold hover:bg-pri hover:text-on transition">
                Register now
              </button>
            </div>
          </article>

          {/* Event 6 */}
          <article className="hv bg-bg border border-line rounded-3xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-pri/10 transition">
            <div className="im relative aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&h=500&q=85"
                alt="Urban forest restoration"
              />
              <div className="absolute top-4 left-4 bg-card rounded-xl px-3.5 py-2 text-center leading-none shadow">
                <b className="text-2xl block">17</b>
                <span className="text-xs font-semibold text-pri">Jan</span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <p className="text-sm font-semibold text-pri flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Vancouver, Canada
              </p>

              <h3 className="mt-2 text-xl font-extrabold">
                Urban Forest Day
              </h3>

              <p className="mt-2 text-mut flex-1">
                Restore a city ravine with 400 neighbours, boots and plenty of mulch.
              </p>

              <button className="mt-5 h-11 rounded-full bg-pri/10 text-pri font-bold hover:bg-pri hover:text-on transition">
                Register now
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
