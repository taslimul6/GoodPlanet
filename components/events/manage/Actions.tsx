"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Event } from "@/lib/event";

const ManageActions = ({ event }: { event: Event }) => {
  const router = useRouter();

  const handleEventDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API}/event/${event._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Event deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error deleting event");
    }
  };

  return (
    <div className="mt-auto flex gap-2 pt-6">
      <Link
        href={`/events/edit/${event._id}`}
        className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-line text-sm font-medium transition hover:bg-pri/10"
      >
        <Pencil className="size-4" />
        Edit
      </Link>

      <Button
        type="button"
        onClick={handleEventDelete}
        className="h-10 flex-1 rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="size-4" />
        Delete
      </Button>
    </div>
  );
};

export default ManageActions;