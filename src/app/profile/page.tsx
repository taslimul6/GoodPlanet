"use client";

import { useEffect, useState } from "react";

import FollowingTab from "@/components/profile/FollowingTab";
import OverviewTab from "@/components/profile/OverviewTab";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SettingsTab from "@/components/profile/SettingsTab";
import { ProfileStats } from "@/components/profile/types";
import { api } from "@/lib/apiClient";
import { authClient } from "@/src/app/lib/auth-client";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "following", label: "Following" },
  { id: "settings", label: "Settings" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [tab, setTab] = useState<TabId>("overview");
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [failed, setFailed] = useState(false);

  const user = session?.user;
  const email = user?.email;

  useEffect(() => {
    if (!email) return;

    (async () => {
      try {
        const res = await api("/profile/stats");
        if (!res.ok) throw new Error("Failed to load stats");
        setStats(await res.json());
      } catch (err) {
        console.error(err);
        setFailed(true);
      }
    })();
  }, [email]);

  if (isPending || !user || !email) {
    return (
      <main className="min-h-screen bg-bg text-fg">
        <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
        <ProfileHeader
          user={{
            name: user.name,
            email: user.email,
            image: user.image,
            bio: (user as { bio?: string | null }).bio,
            createdAt: user.createdAt,
          }}
          stats={stats}
        />

        <div
          role="tablist"
          className="mt-8 flex gap-1 rounded-full border border-line bg-card p-1"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                tab === t.id
                  ? "bg-pri text-on"
                  : "text-mut hover:bg-bg hover:text-fg"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "overview" && <OverviewTab stats={stats} failed={failed} />}

          {tab === "following" && (
            <FollowingTab
              onCountChange={(count) => setStats((s) => (s ? { ...s, following: count } : s))}
            />
          )}

          {tab === "settings" && (
            <SettingsTab
              user={{
                name: user.name,
                image: user.image,
                bio: (user as { bio?: string | null }).bio,
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
