"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Pencil, Trash2, TriangleAlert } from "lucide-react";
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
import { api } from "@/lib/apiClient";
import { Event } from "@/lib/event";

const linkClass =
  "inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-line text-sm font-medium transition hover:bg-pri/10";

const ManageActions = ({ event }: { event: Event }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleEventDelete = async () => {
    if (deleting) return;
    setDeleting(true);

    try {
      const response = await api(`/event/${event._id}`, { method: "DELETE" });

      if (!response.ok) throw new Error("delete failed");

      toast.success("Event deleted successfully");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mt-auto flex gap-2 pt-6">
      <Link href={`/events/${event._id}`} className={linkClass}>
        <ArrowRight className="size-4" />
        View
      </Link>

      <Link href={`/events/edit/${event._id}`} className={linkClass}>
        <Pencil className="size-4" />
        Edit
      </Link>

      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-10 flex-1 rounded-full border-red-500/30 text-red-600 hover:bg-red-500/10 hover:text-red-600"
      >
        <Trash2 className="size-4" />
        Delete
      </Button>

      <AlertDialog open={open} onOpenChange={(v) => !deleting && setOpen(v)}>
        <AlertDialogContent className="rounded-2xl border border-line bg-bg">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-red-500/10 text-red-600">
              <TriangleAlert />
            </AlertDialogMedia>
            <AlertDialogTitle className="text-lg font-extrabold">
              Delete this event?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-semibold text-fg">{event.title}</span> will
              be permanently removed, along with its participants and saved
              bookmarks. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="rounded-b-2xl border-line bg-card">
            <AlertDialogCancel disabled={deleting} className="rounded-full">
              Keep event
            </AlertDialogCancel>
            <Button
              onClick={handleEventDelete}
              disabled={deleting}
              className="rounded-full bg-red-600 text-white hover:bg-red-700"
            >
              {deleting ? "Deleting..." : "Yes, delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageActions;
