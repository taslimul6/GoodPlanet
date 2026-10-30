
export default function Mission() {
  return (
    <section
      id="mission"
      className="bg-card border-y border-line py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-14 items-center">
        {/* Mission Images */}
        <div className="grid grid-cols-2 gap-4">
          <div className="im aspect-[3/4] rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=500&h=680&q=85"
              alt="Volunteers working together in a community"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="im aspect-[3/4] rounded-3xl overflow-hidden mt-10">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=500&h=680&q=85"
              alt="Community members supporting children"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission Content */}
        <div>
          <p className="text-pri font-bold text-sm">Our mission</p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Making it easy for ordinary people to do something good
          </h2>

          <p className="mt-5 text-mut leading-relaxed text-lg">
            GoodPlanet started in 2014 with twelve friends and one Saturday
            of street cleaning. Today we connect volunteers, donors and local
            leaders so that kindness turns into steady, visible change.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex gap-4">
              <span className="mt-1 size-7 shrink-0 grid place-items-center rounded-full bg-pri text-on text-sm">
                ✓
              </span>

              <p>
                <b>Local first.</b>{" "}
                <span className="text-mut">
                  Every project is led by people who live in the community.
                </span>
              </p>
            </li>

            <li className="flex gap-4">
              <span className="mt-1 size-7 shrink-0 grid place-items-center rounded-full bg-pri text-on text-sm">
                ✓
              </span>

              <p>
                <b>Fully transparent.</b>{" "}
                <span className="text-mut">
                  94% of every donation reaches the ground, and our ledger is
                  public.
                </span>
              </p>
            </li>

            <li className="flex gap-4">
              <span className="mt-1 size-7 shrink-0 grid place-items-center rounded-full bg-pri text-on text-sm">
                ✓
              </span>

              <p>
                <b>Built to last.</b>{" "}
                <span className="text-mut">
                  We train local leads so projects keep going without us.
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
