"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/src/app/lib/auth-client";

import { Avatar } from "./ProfileHeader";

type SettingsUser = {
  name?: string | null;
  image?: string | null;
  bio?: string | null;
};

const BIO_MAX = 200;
const inputClass = "h-12 rounded-xl border-line bg-bg";

function Section({
  title,
  description,
  children,
  danger,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
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

/* ------------------------------ Edit profile ------------------------------ */

const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const PHOTO_MAX = 5 * 1024 * 1024; // 5 MB

function EditProfileForm({ user }: { user: SettingsUser }) {
  const [name, setName] = useState(user.name ?? "");
  const [bio, setBio] = useState(user.bio ?? "");

  // photo: the saved one, plus (optionally) a newly chosen file waiting to be uploaded
  const [image, setImage] = useState(user.image ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);

  // free the temporary preview URL when it is replaced / on unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const shownImage = preview ?? (removed ? null : image || null);

  const chooseFile = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;

    if (!PHOTO_TYPES.includes(picked.type)) {
      toast.error("Please choose a JPG, PNG, WEBP or GIF image.");
      e.target.value = "";
      return;
    }
    if (picked.size > PHOTO_MAX) {
      toast.error("The image must be 5 MB or smaller.");
      e.target.value = "";
      return;
    }

    setFile(picked);
    setPreview(URL.createObjectURL(picked));
    setRemoved(false);
  };

  const removePhoto = () => {
    setFile(null);
    setPreview(null);
    setRemoved(true);
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      // 1. upload the new photo (if any) to ImgBB through our server
      let nextImage: string | null = removed ? null : image || null;

      if (file) {
        const body = new FormData();
        body.set("image", file);

        const res = await fetch("/api/upload/avatar", { method: "POST", body });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data.url) {
          toast.error(data.error || "Could not upload the photo.");
          return;
        }
        nextImage = data.url as string;
      }

      // 2. save the profile
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: nextImage,
        bio: bio.trim(),
      });

      if (error) {
        toast.error(error.message || "Could not update your profile.");
        return;
      }

      setImage(nextImage ?? "");
      setFile(null);
      setPreview(null);
      setRemoved(false);
      if (fileInput.current) fileInput.current.value = "";
      toast.success("Profile updated");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Avatar name={name} image={shownImage} className="size-20 text-2xl" />

        <div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() => fileInput.current?.click()}
              className="h-10 rounded-full border-line px-5 text-sm font-semibold"
            >
              {shownImage ? "Change photo" : "Upload photo"}
            </Button>

            {shownImage && (
              <Button
                type="button"
                variant="outline"
                disabled={saving}
                onClick={removePhoto}
                className="h-10 rounded-full border-red-500/30 px-5 text-sm font-semibold text-red-600 hover:bg-red-500/10 hover:text-red-600"
              >
                Remove
              </Button>
            )}
          </div>

          <p className="mt-2 text-xs text-mut">
            JPG, PNG, WEBP or GIF, up to 5 MB.
            {file ? " Press Save changes to upload it." : ""}
          </p>

          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={chooseFile}
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-name">Full name</Label>
        <Input
          id="profile-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-bio">Bio</Label>
        <Textarea
          id="profile-bio"
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
          rows={4}
          placeholder="Tell the community a little about yourself..."
          className="rounded-xl border-line bg-bg"
        />
        <p className="text-right text-xs text-mut">
          {bio.length}/{BIO_MAX}
        </p>
      </div>

      <Button
        type="submit"
        disabled={saving}
        className="h-11 rounded-full bg-pri px-7 font-bold text-on hover:opacity-90"
      >
        {saving ? (file ? "Uploading..." : "Saving...") : "Save changes"}
      </Button>
    </form>
  );
}

/* ----------------------------- Change password ---------------------------- */

function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (next.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (next !== confirm) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    if (next === current) {
      toast.error("New password must be different from the current one.");
      return;
    }

    setSaving(true);
    const { error } = await authClient.changePassword({
      currentPassword: current,
      newPassword: next,
      revokeOtherSessions: true,
    });
    setSaving(false);

    if (error) {
      toast.error(error.message || "Could not change your password.");
      return;
    }

    toast.success("Password changed. Other devices were signed out.");
    setCurrent("");
    setNext("");
    setConfirm("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="pw-current">Current password</Label>
        <Input
          id="pw-current"
          type="password"
          autoComplete="current-password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pw-new">New password</Label>
          <Input
            id="pw-new"
            type="password"
            autoComplete="new-password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
            minLength={8}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pw-confirm">Confirm new password</Label>
          <Input
            id="pw-confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className={inputClass}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={saving}
        className="h-11 rounded-full bg-pri px-7 font-bold text-on hover:opacity-90"
      >
        {saving ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}

/* ----------------------------- Delete account ----------------------------- */

function DeleteAccount({ hasPassword }: { hasPassword: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [password, setPassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  const canDelete =
    typed === "DELETE" && (!hasPassword || password.length > 0) && !deleting;

  const handleDelete = async () => {
    if (!canDelete) return;
    setDeleting(true);

    const { error } = await authClient.deleteUser(
      hasPassword ? { password } : {}
    );

    if (error) {
      setDeleting(false);
      const expired = /expired|fresh/i.test(error.message ?? "");
      toast.error(
        expired
          ? "For safety, please sign in again and then retry."
          : error.message || "Could not delete your account."
      );
      return;
    }

    toast.success("Your account has been deleted.");
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <p className="text-sm text-mut">
        Deleting your account permanently removes your profile, the events you
        created, your registrations, saved events and follows. This cannot be
        undone.
      </p>

      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="mt-5 h-11 rounded-full border-red-500/30 px-6 font-semibold text-red-600 hover:bg-red-500/10 hover:text-red-600"
      >
        Delete my account
      </Button>

      <AlertDialog
        open={open}
        onOpenChange={(v) => {
          if (deleting) return;
          setOpen(v);
          if (!v) {
            setTyped("");
            setPassword("");
          }
        }}
      >
        <AlertDialogContent className="rounded-2xl border border-line bg-bg">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-red-500/10 text-red-600">
              <TriangleAlert />
            </AlertDialogMedia>
            <AlertDialogTitle className="text-lg font-extrabold">
              Delete your account?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently erase your account and everything linked to
              it, including events you created and their participants.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4">
            {hasPassword && (
              <div className="space-y-2">
                <Label htmlFor="del-password">Your password</Label>
                <Input
                  id="del-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="del-confirm">
                Type <span className="font-bold text-red-600">DELETE</span> to
                confirm
              </Label>
              <Input
                id="del-confirm"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                autoComplete="off"
                className={inputClass}
              />
            </div>
          </div>

          <AlertDialogFooter className="rounded-b-2xl border-line bg-card">
            <AlertDialogCancel disabled={deleting} className="rounded-full">
              Keep my account
            </AlertDialogCancel>
            <Button
              onClick={handleDelete}
              disabled={!canDelete}
              className="rounded-full bg-red-600 text-white hover:bg-red-700"
            >
              {deleting ? "Deleting..." : "Delete forever"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/* --------------------------------- Wrapper -------------------------------- */

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
