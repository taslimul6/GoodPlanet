"use client";

import { useState } from "react";
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
import { authClient } from "@/src/app/lib/auth-client";

import { inputClass } from "./shared";

export default function DeleteAccount({ hasPassword }: { hasPassword: boolean }) {
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
