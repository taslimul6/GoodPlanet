
export default function Stories() {
  return (
    <section
      id="stories"
      className="max-w-7xl mx-auto px-5 py-20 lg:py-28"
    >
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-pri font-bold text-sm">Community stories</p>

        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
          Real people, real change
        </h2>
      </div>

      <div id="st" className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Story 1 */}
      

        {/* Story 2 */}
        <a
          href="#"
          className="hv im relative block aspect-[4/5] rounded-3xl overflow-hidden group"
        >
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&h=875&q=85"
            alt="Tree planting in Kibera"
            loading="lazy"
            className="absolute inset-0"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25"></div>

          <div className="absolute top-4 inset-x-4 flex justify-between text-xs font-bold text-white">
            <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1">
              Reforestation
            </span>
            <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1">
              Nairobi
            </span>
          </div>

          <h3 className="absolute bottom-0 p-6 text-xl font-extrabold text-white leading-snug">
            Forty thousand roots in Kibera
          </h3>
        </a>

        {/* Story 3 */}
        <a
          href="#"
          className="hv im relative block aspect-[4/5] rounded-3xl overflow-hidden group"
        >
          <img
            src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=700&h=875&q=85"
            alt="Winter relief support"
            loading="lazy"
            className="absolute inset-0"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25"></div>

          <div className="absolute top-4 inset-x-4 flex justify-between text-xs font-bold text-white">
            <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1">
              Winter relief
            </span>
            <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1">
              Dhaka
            </span>
          </div>

          <h3 className="absolute bottom-0 p-6 text-xl font-extrabold text-white leading-snug">
            Coats for the first cold night
          </h3>
        </a>

        {/* Story 4 */}
        <a
          href="#"
          className="hv im relative block aspect-[4/5] rounded-3xl overflow-hidden group"
        >
          <img
            src="https://images.unsplash.com/photo-1758599668949-5118d71838fd?auto=format&fit=crop&w=700&h=875&q=85"
            alt="Beach clean-up"
            loading="lazy"
            className="absolute inset-0"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25"></div>

          <div className="absolute top-4 inset-x-4 flex justify-between text-xs font-bold text-white">
            <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1">
              Clean-up
            </span>
            <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1">
              Lisbon
            </span>
          </div>

          <h3 className="absolute bottom-0 p-6 text-xl font-extrabold text-white leading-snug">
            A beach that gave back
          </h3>
        </a>

        {/* Story 5 */}
        <a
          href="#"
          className="hv im relative block aspect-[4/5] rounded-3xl overflow-hidden group"
        >
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&h=875&q=85"
            alt="Children reading books"
            loading="lazy"
            className="absolute inset-0"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25"></div>

          <div className="absolute top-4 inset-x-4 flex justify-between text-xs font-bold text-white">
            <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1">
              Education
            </span>
            <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1">
              Medellín
            </span>
          </div>

          <h3 className="absolute bottom-0 p-6 text-xl font-extrabold text-white leading-snug">
            Reading hour, every Thursday
          </h3>
        </a>

        {/* Story 6 */}
        <a
          href="#"
          className="hv im relative block aspect-[4/5] rounded-3xl overflow-hidden group"
        >
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=700&h=875&q=85"
            alt="Community volunteers working together"
            loading="lazy"
            className="absolute inset-0"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25"></div>

          <div className="absolute top-4 inset-x-4 flex justify-between text-xs font-bold text-white">
            <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1">
              Community
            </span>
            <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1">
              Manila
            </span>
          </div>

          <h3 className="absolute bottom-0 p-6 text-xl font-extrabold text-white leading-snug">
            Neighbours who rebuilt a river walk
          </h3>
        </a>
      </div>
    </section>
  );
}
