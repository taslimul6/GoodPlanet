"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import {
  CalendarPlus,
  CalendarDays,
  CalendarCheck,
  LogOut,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authClient } from "@/src/app/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/events" },
  { name: "Stories", href: "/#stories" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-xl font-extrabold">
          <span className="grid size-9 place-items-center rounded-xl bg-pri text-on">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-4 16-9 16z" />
              <path d="M4 21c3-6 6-9 10-11" />
            </svg>
          </span>
          GoodPlanet
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-sm font-semibold text-mut md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="transition hover:text-pri"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="grid size-10 place-items-center rounded-full transition hover:bg-line"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
              </svg>
            )}
          </button>

          {session ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    className="h-10 max-w-44 gap-2 rounded-full border-line px-3"
                  >
                    <UserRound className="size-4 shrink-0" />
                    <span className="truncate">
                      {session.user?.name}
                    </span>
                  </Button>
                }
              />

              <PopoverContent
                align="end"
                className="w-60 rounded-xl border-line bg-bg p-2"
              >
                <PopoverHeader className="px-2 py-2">
                  <PopoverTitle className="truncate text-sm font-bold">
                    {session.user?.name}
                  </PopoverTitle>
                  <PopoverDescription className="truncate text-xs text-mut">
                    {session.user?.email}
                  </PopoverDescription>
                </PopoverHeader>

                <div className="my-2 h-px bg-line" />

                <div className="grid gap-1">
                  <a
                    href="/events/add"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-line"
                  >
                    <CalendarPlus className="size-4 text-mut" />
                    Create event
                  </a>

                  <a
                    href="/events/manage"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-line"
                  >
                    <CalendarDays className="size-4 text-mut" />
                    Manage events
                  </a>

                  <a
                    href="/events/joined"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-line"
                  >
                    <CalendarCheck className="size-4 text-mut" />
                    Joined events
                  </a>
                </div>

                <div className="my-2 h-px bg-line" />

                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </PopoverContent>
            </Popover>
          ) : (
            <a
              href="/login"
              className="hidden h-10 items-center rounded-full bg-pri px-5 text-sm font-bold text-on transition hover:opacity-90 sm:inline-flex"
            >
              Login
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid size-10 place-items-center rounded-full hover:bg-line md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="grid gap-1 border-t border-line bg-bg px-5 py-4 font-semibold md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="py-3"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {!session && (
            <a
              href="/login"
              className="py-3 text-pri"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </a>
          )}

          {session && (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 py-3 text-left text-sm font-semibold text-red-600"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          )}
        </div>
      )}
    </header>
  );
}