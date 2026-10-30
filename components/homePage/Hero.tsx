import React from 'react';

const Hero = () => {
    return (
        <section className="max-w-7xl mx-auto px-5 pt-12 lg:pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
      {/* Hero Content */}
      <div>
        <span className="inline-flex items-center gap-2 text-sm font-semibold bg-pri/10 text-pri rounded-full px-4 py-1.5">
          <span className="size-2 rounded-full bg-pri"></span>
          128,000+ volunteers in 41 countries
        </span>

        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">
          Together, we make the planet a{" "}
          <span className="text-pri">kinder place</span> to live.
        </h1>

        <p className="mt-6 text-lg text-mut max-w-xl leading-relaxed">
          Join neighbours near you to feed street children, share winter
          clothes, clean up communities and plant trees. Everyone is welcome,
          and no experience is needed.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#events"
            className="h-12 px-7 inline-flex items-center rounded-full bg-pri text-on font-bold hover:opacity-90 hover:-translate-y-0.5 transition"
          >
            Join an event
          </a>

          <a
            href="#impact"
            className="h-12 px-7 inline-flex items-center rounded-full border-2 border-line font-bold hover:border-pri hover:text-pri transition"
          >
            See our impact
          </a>
        </div>

        {/* Statistics */}
        <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
          <div>
            <dd className="text-3xl font-extrabold">
              <span>2.4M</span>
            </dd>
            <dt className="text-sm text-mut">Meals served</dt>
          </div>

          <div>
            <dd className="text-3xl font-extrabold">
              <span>860K</span>
            </dd>
            <dt className="text-sm text-mut">Trees planted</dt>
          </div>

          <div>
            <dd className="text-3xl font-extrabold">
              <span>312</span>
            </dd>
            <dt className="text-sm text-mut">Local chapters</dt>
          </div>
        </dl>
      </div>

      {/* Hero Images */}
      <div className="relative">
        <div className="im aspect-[4/5] sm:aspect-[5/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-pri/20">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&h=1000&q=85"
            alt="Volunteers planting trees together"
            className="w-full h-full object-cover transition-transform duration-700"
          />
        </div>

        {/* Floating Info Card */}
        <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-card border border-line rounded-2xl p-4 shadow-xl flex items-center gap-3">
          <span className="size-12 grid place-items-center rounded-xl bg-amb/15 text-2xl">
            🍲
          </span>

          <div>
            <p className="font-extrabold">1,200 meals</p>
            <p className="text-sm text-mut">served this weekend</p>
          </div>
        </div>

        {/* Small Floating Image */}
        <div className="im hidden sm:block absolute -top-6 -right-6 size-32 rounded-2xl overflow-hidden border-4 border-bg shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=300&h=300&q=85"
            alt="Community volunteers"
            className="w-full h-full object-cover transition-transform duration-700"
          />
        </div>
      </div>
    </section>
    );
};

export default Hero;