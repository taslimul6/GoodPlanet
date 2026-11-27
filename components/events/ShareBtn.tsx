"use client";

import { Check, Link2, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ShareBtn({ title }: { title?: string }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => window.location.href;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy the link");
    }
  };

  const open = (url: string) =>
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");

  const shareWhatsApp = () =>
    open(
      `https://wa.me/?text=${encodeURIComponent(
        `${title ?? "Check out this event"} - ${getUrl()}`
      )}`
    );

  const shareFacebook = () =>
    open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        getUrl()
      )}`
    );

  const shareNative = async () => {
    try {
      await navigator.share({ title, url: getUrl() });
    } catch {
      /* user cancelled */
    }
  };

  const item =
    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-line";

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className="mt-3 flex h-10 w-full items-center justify-center rounded-full border border-line text-sm font-medium transition hover:bg-muted"
          >
            <Share2 className="mr-2 size-4" />
            Share event
          </button>
        }
      />

      <PopoverContent align="center" className="w-56 gap-1 rounded-xl border border-line bg-bg p-2 shadow-lg">
        <button type="button" onClick={copyLink} className={item}>
          {copied ? (
            <Check className="size-4 text-pri" />
          ) : (
            <Link2 className="size-4 text-mut" />
          )}
          {copied ? "Copied!" : "Copy link"}
        </button>
        <button type="button" onClick={shareWhatsApp} className={item}>
          <span className="size-4 text-center text-xs font-bold text-mut">
            W
          </span>
          WhatsApp
        </button>
        <button type="button" onClick={shareFacebook} className={item}>
          <span className="size-4 text-center text-xs font-bold text-mut">
            f
          </span>
          Facebook
        </button>
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button type="button" onClick={shareNative} className={item}>
            <Share2 className="size-4 text-mut" />
            More...
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}
