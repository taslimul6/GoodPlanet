
export default function Quote() {
  return (
    <section className="relative isolate overflow-hidden py-28 lg:py-40 text-center px-5 bg-fg">
      <img
        src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1600&h=900&q=85"
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover opacity-40"
      />

      <div className="max-w-3xl mx-auto text-white">
        <svg
          className="mx-auto mb-6 text-amb"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7 7h4v4c0 3-1.500 5-4 6l-1-1.500c1.500-.7 2-1.800 2-3H7V7zm8 0h4v4c0 3-1.500 5-4 6l-1-1.500c1.500-.7 2-1.800 2-3h-1V7z" />
        </svg>

        <blockquote className="text-2xl sm:text-4xl font-bold leading-snug">
          A better planet isn't built by a few heroes. It's built by millions
          of ordinary people doing one kind thing today.
        </blockquote>

        <p className="mt-8 font-semibold">
          Mira Hossain{" "}
          <span className="opacity-70 font-normal">
            · Co-founder, GoodPlanet
          </span>
        </p>
      </div>
    </section>
  );
}
