
export default function Footer() {
  return (
    <footer id="login" className="bg-fg text-bg dark:bg-card dark:text-fg">
      <div className="max-w-7xl mx-auto px-5 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        <div>
          <p className="text-xl font-extrabold">GoodPlanet</p>

          <p className="mt-3 opacity-70 max-w-xs leading-relaxed">
            Bringing people together to create lasting good for communities
            and for the planet.
          </p>

          <div className="flex gap-2 mt-5">
            <a
              href="#"
              aria-label="Facebook"
              className="size-10 grid place-items-center rounded-full border border-current/30 hover:bg-pri hover:text-on hover:border-pri transition font-bold"
            >
              f
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="size-10 grid place-items-center rounded-full border border-current/30 hover:bg-pri hover:text-on hover:border-pri transition font-bold"
            >
              in
            </a>

            <a
              href="#"
              aria-label="X"
              className="size-10 grid place-items-center rounded-full border border-current/30 hover:bg-pri hover:text-on hover:border-pri transition font-bold"
            >
              X
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="size-10 grid place-items-center rounded-full border border-current/30 hover:bg-pri hover:text-on hover:border-pri transition font-bold"
            >
              ▶
            </a>
          </div>
        </div>

        <div className="grid gap-2 content-start">
          <p className="font-bold mb-1">Explore</p>
          <a className="opacity-70 hover:opacity-100" href="#mission">
            Mission
          </a>
          <a className="opacity-70 hover:opacity-100" href="#initiatives">
            Initiatives
          </a>
          <a className="opacity-70 hover:opacity-100" href="#events">
            Events
          </a>
          <a className="opacity-70 hover:opacity-100" href="#stories">
            Stories
          </a>
        </div>

        <div className="grid gap-2 content-start">
          <p className="font-bold mb-1">Get involved</p>
          <a className="opacity-70 hover:opacity-100" href="#events">
            Volunteer
          </a>
          <a className="opacity-70 hover:opacity-100" href="#impact">
            Donate
          </a>
          <a className="opacity-70 hover:opacity-100" href="#">
            Start a chapter
          </a>
          <a className="opacity-70 hover:opacity-100" href="#">
            Partner with us
          </a>
        </div>

        <div className="grid gap-2 content-start">
          <p className="font-bold mb-1">Contact</p>
          <a className="opacity-70 hover:opacity-100" href="mailto:hello@goodplanet.org">
            hello@goodplanet.org
          </a>
          <span className="opacity-70">+880 2 5566 0142</span>
          <span className="opacity-70">
            House 12, Road 7, Dhanmondi, Dhaka 1209
          </span>
        </div>
      </div>

      <p className="border-t border-current/15 text-center text-sm opacity-60 py-5">
        © 2026 GoodPlanet Foundation. All rights reserved.
      </p>
    </footer>
  );
}
