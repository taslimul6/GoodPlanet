import { CalendarCheck, Clock, Heart } from "lucide-react";

import { ProfileStats } from "./types";

type HeaderUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  bio?: string | null;
  createdAt?: Date | string | null;
};

export function Avatar({
  name,
  image,
  className = "size-24 text-3xl",
}: {
  name?: string | null;
  image?: string | null;
  className?: string;
}) {
  const initials = (name ?? "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={name ?? "Profile photo"}
      referrerPolicy="no-referrer"
      className={`${className} rounded-full object-cover ring-4 ring-pri/15`}
    />
  ) : (
    <div
      className={`${className} flex items-center justify-center rounded-full bg-pri/10 font-extrabold text-pri ring-4 ring-pri/15`}
      aria-label={name ?? "Profile photo"}
    >
      {initials || "?"}
    </div>
  );
}

export default function ProfileHeader({
  user,
  stats,
}: {
  user: HeaderUser;
  stats: ProfileStats | null;
}) {
  const since = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  const highlights = [
    { icon: CalendarCheck, label: "Events joined", value: stats?.joined },
    { icon: Clock, label: "Volunteer hours", value: stats?.volunteerHours },
    { icon: Heart, label: "Following", value: stats?.following },
  ];

  return (
    <div className="rounded-2xl border border-line bg-card p-6 sm:p-8">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
        <Avatar name={user.name} image={user.image} />

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-extrabold tracking-tight sm:text-3xl">
            {user.name}
          </h1>
          <p className="mt-1 truncate text-sm text-mut">{user.email}</p>

          <p className="mt-3 max-w-xl whitespace-pre-line text-sm leading-relaxed">
            {user.bio?.trim() ? (
              user.bio
            ) : (
              <span className="text-mut">
                No bio yet. Add a few words about yourself in Settings.
              </span>
            )}
          </p>

          {since && (
            <p className="mt-3 text-xs font-medium text-mut">
              Member since {since}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-6">
        {highlights.map(({ icon: Icon, label, value }) => (
          <div key={label} className="text-center">
            <Icon className="mx-auto size-5 text-pri" />
            <p className="mt-2 text-2xl font-extrabold">
              {value === undefined ? "–" : value}
            </p>
            <p className="text-xs text-mut">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
