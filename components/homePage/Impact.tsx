
export default function Impact() {
  return (
    <section id="impact" className="bg-pri text-on py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5">
        <div className="max-w-2xl">
          <p className="font-bold text-sm opacity-80">Our impact</p>

          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            A year of small acts, added up
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-3xl bg-white/10 p-6 sm:p-8">
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              3,100
            </p>
            <p className="mt-2 text-sm sm:text-base opacity-80">
              tonnes of waste removed
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-6 sm:p-8">
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              214K
            </p>
            <p className="mt-2 text-sm sm:text-base opacity-80">
              winter kits delivered
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-6 sm:p-8">
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              18,500
            </p>
            <p className="mt-2 text-sm sm:text-base opacity-80">
              children back in school
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-6 sm:p-8">
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              1.9M
            </p>
            <p className="mt-2 text-sm sm:text-base opacity-80">
              volunteer hours given
            </p>
          </div>
        </div>

        <div id="bars" className="mt-12 grid sm:grid-cols-2 gap-x-12 gap-y-6 text-sm font-semibold">
          <div>
            <div className="flex justify-between mb-2">
              <span>Feeding programmes</span>
              <span>34%</span>
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-amb"
                style={{ width: "88.4%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>Tree planting</span>
              <span>27%</span>
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-amb"
                style={{ width: "70.2%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>Clean-ups</span>
              <span>19%</span>
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-amb"
                style={{ width: "49.4%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>Education support</span>
              <span>13%</span>
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-amb"
                style={{ width: "33.8%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
