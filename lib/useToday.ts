import { useSyncExternalStore } from "react";

import { todayISO } from "@/lib/eventDate";

const subscribe = () => () => {};

/**
 * Today's date (local time, YYYY-MM-DD) for client components.
 * It is an empty string while the page is prerendered on the server, because Next.js does
 * not allow reading the current time there, and the real date once the page is in the browser.
 */
export const useToday = () => useSyncExternalStore(subscribe, () => todayISO(), () => "");
