"use client";

import { useEffect, useState } from "react";

import { authClient } from "@/src/app/lib/auth-client";

import ChangePasswordForm from "./settings/ChangePasswordForm";
import DeleteAccount from "./settings/DeleteAccount";
import EditProfileForm from "./settings/EditProfileForm";
import { Section, type SettingsUser } from "./settings/shared";

export default function SettingsTab({ user }: { user: SettingsUser }) {
  // null = still checking. Google-only accounts have no password.
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await authClient.listAccounts();
        setHasPassword(
          Array.isArray(data) && data.some((a) => a.providerId === "credential")
        );
      } catch {
        setHasPassword(true);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <Section
        title="Edit profile"
        description="Update how you appear to the community."
      >
        <EditProfileForm user={user} />
      </Section>

      <Section
        title="Password"
        description="Choose a strong password you do not use anywhere else."
      >
        {hasPassword === null ? (
          <div className="h-24 animate-pulse rounded-xl bg-muted" />
        ) : hasPassword ? (
          <ChangePasswordForm />
        ) : (
          <p className="text-sm text-mut">
            You signed in with Google, so there is no GoodPlanet password to
            change. Manage your password from your Google account instead.
          </p>
        )}
      </Section>

      <Section
        danger
        title="Delete account"
        description="Permanently remove your account and data."
      >
        {hasPassword === null ? (
          <div className="h-16 animate-pulse rounded-xl bg-muted" />
        ) : (
          <DeleteAccount hasPassword={hasPassword} />
        )}
      </Section>
    </div>
  );
}
