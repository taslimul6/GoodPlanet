
export default function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-20 lg:py-28">
      <div className="rounded-[2rem] bg-card border border-line p-8 sm:p-14 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Get good news in your inbox
          </h2>

          <p className="mt-4 text-mut text-lg">
            One short email a month with community stories, events near you and
            easy ways to help.
          </p>
        </div>

        <form id="nl">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="em"
              type="email"
              required
              aria-label="Email address"
              placeholder="Enter your email"
              className="flex-1 h-14 px-6 rounded-full bg-bg border border-line outline-none focus:border-pri transition"
            />

            <button className="h-14 px-8 rounded-full bg-pri text-on font-bold hover:opacity-90 transition">
              Subscribe
            </button>
          </div>

          <p
            id="nlm"
            className="mt-3 text-sm text-pri font-semibold min-h-5"
            role="status"
          />
        </form>
      </div>
    </section>
  );
}
