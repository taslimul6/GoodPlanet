"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/src/app/lib/auth-client";

import { Avatar } from "../ProfileHeader";
import { inputClass, type SettingsUser } from "./shared";

const BIO_MAX = 200;
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const PHOTO_MAX = 5 * 1024 * 1024; // 5 MB

export default function EditProfileForm({ user }: { user: SettingsUser }) {
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
