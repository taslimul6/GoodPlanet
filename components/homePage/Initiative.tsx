
export default function Initiatives() {
  return (
    <section
      id="initiatives"
      className="max-w-7xl mx-auto px-5 py-20 lg:py-28"
    >
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-pri font-bold text-sm">Our initiatives</p>

        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
          Five causes, one community
        </h2>

        <p className="mt-4 text-mut text-lg">
          Choose what matters to you. Each one has a chapter near you.
        </p>
      </div>

      <div
        id="init"
        className="mt-14 grid sm:grid-cols-2 lg:grid-cols-6 gap-6"
      >
        {/* Feed a child */}
        <article className="hv bg-card border border-line rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-pri/10 transition lg:col-span-2">
          <div className="im h-44 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=700&h=400&q=85"
              alt="Volunteers serving food"
            />
          </div>

          <div className="p-6">
            <span className="size-11 grid place-items-center rounded-xl bg-pri/10 text-2xl -mt-12 relative border-4 border-card">
              🍲
            </span>
            <h3 className="mt-4 text-xl font-extrabold">Feed a child</h3>
            <p className="mt-2 text-mut">
              Hot, healthy meals for children living on the street.
            </p>
            <a
              href="#events"
              className="inline-block mt-4 font-bold text-pri text-sm hover:underline"
            >
              Learn more
            </a>
          </div>
        </article>

        {/* Winter warmth */}
        <article className="hv bg-card border border-line rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-pri/10 transition lg:col-span-2">
          <div className="im h-44 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=700&h=400&q=85"
              alt="Winter clothing and warm supplies"
            />
          </div>

          <div className="p-6">
            <span className="size-11 grid place-items-center rounded-xl bg-pri/10 text-2xl -mt-12 relative border-4 border-card">
              🧥
            </span>
            <h3 className="mt-4 text-xl font-extrabold">Winter warmth</h3>
            <p className="mt-2 text-mut">
              Coats and blankets delivered before the cold arrives.
            </p>
            <a
              href="#events"
              className="inline-block mt-4 font-bold text-pri text-sm hover:underline"
            >
              Learn more
            </a>
          </div>
        </article>

        {/* Clean communities */}
        <article className="hv bg-card border border-line rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-pri/10 transition lg:col-span-2">
          <div className="im h-44 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&h=400&q=85"
              alt="Community clean-up initiative"
            />
          </div>

          <div className="p-6">
            <span className="size-11 grid place-items-center rounded-xl bg-pri/10 text-2xl -mt-12 relative border-4 border-card">
              🧹
            </span>
            <h3 className="mt-4 text-xl font-extrabold">
              Clean communities
            </h3>
            <p className="mt-2 text-mut">
              Neighbourhood clean-ups for safer, cleaner streets.
            </p>
            <a
              href="#events"
              className="inline-block mt-4 font-bold text-pri text-sm hover:underline"
            >
              Learn more
            </a>
          </div>
        </article>

        {/* Plant trees */}
        <article className="hv bg-card border border-line rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-pri/10 transition lg:col-span-3">
          <div className="im h-44 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&h=400&q=85"
              alt="Volunteers planting trees"
            />
          </div>

          <div className="p-6">
            <span className="size-11 grid place-items-center rounded-xl bg-pri/10 text-2xl -mt-12 relative border-4 border-card">
              🌳
            </span>
            <h3 className="mt-4 text-xl font-extrabold">Plant trees</h3>
            <p className="mt-2 text-mut">
              Native trees planted and cared for with local schools.
            </p>
            <a
              href="#events"
              className="inline-block mt-4 font-bold text-pri text-sm hover:underline"
            >
              Learn more
            </a>
          </div>
        </article>

        {/* Support education */}
        <article className="hv bg-card border border-line rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-pri/10 transition lg:col-span-3">
          <div className="im h-44 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&h=400&q=85"
              alt="Children learning together"
            />
          </div>

          <div className="p-6">
            <span className="size-11 grid place-items-center rounded-xl bg-pri/10 text-2xl -mt-12 relative border-4 border-card">
              📚
            </span>
            <h3 className="mt-4 text-xl font-extrabold">
              Support education
            </h3>
            <p className="mt-2 text-mut">
              School kits, tutors and libraries for every child.
            </p>
            <a
              href="#events"
              className="inline-block mt-4 font-bold text-pri text-sm hover:underline"
            >
              Learn more
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
