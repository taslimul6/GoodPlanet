import type { ReactNode } from "react";

/** The user fields the settings forms need. */
export type SettingsUser = {
  name?: string | null;
  image?: string | null;
  bio?: string | null;
};

/** Shared look of the settings inputs. */
export const inputClass = "h-12 rounded-xl border-line bg-bg";

/** A titled card; `danger` gives it a red border (delete account). */
export function Section({
  title,
  description,
  children,
  danger,
}: {
  title: string;
  description: string;
  children: ReactNode;
  danger?: boolean;
}) {
  return (
    <section
      className={`rounded-2xl border bg-card p-5 sm:p-7 ${
        danger ? "border-red-500/30" : "border-line"
      }`}
    >
      <h2 className={`text-xl font-extrabold ${danger ? "text-red-600" : ""}`}>
        {title}
      </h2>
      <p className="mt-1 text-sm text-mut">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}
