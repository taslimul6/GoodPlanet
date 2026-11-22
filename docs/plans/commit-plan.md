# Commit plan

Planned micro-commit history for GoodPlanet, covering everything built so far: bookmarks, sharing,
calendar, countdown, capacity and waitlist, status badges, dashboards, profile, follow and
profile photo upload.

## Rules

- Every commit is authored by **Taslimul Hasan**. No co-author or tool attribution lines.
- One logical change per commit, written as a conventional commit (`feat`, `fix`, `style`, `refactor`, `docs`, `chore`).
- Commits are ordered so each one builds on the previous ones (a component before the page that uses it,
  a server endpoint before the UI that calls it).
- Author and committer dates are spread randomly between **2026-11-22** and **2026-12-20**
  (Bangladesh time, UTC+6). Dates only ever go forward, so the history reads in the right order.
- Nothing is pushed by this plan. Pushing is a separate, manual step.

## Summary

| | Count |
|---|---|
| Total commits | 45 |
| Frontend (`GoodPlanet`) | 35 |
| Server (`GoodPlanet-server`) | 10 |
| Active days | 16 |

Not committed on purpose: `AGENTS.md` (rewritten automatically by `next dev`) and the local `.env` (secrets).

## Commits in order

### 1. docs: add 55 micro-feature plan

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-11-22 21:42:12 +06
- **Files:**
  - `docs/plans/features.md`

Lists every feature idea for GoodPlanet grouped by area (events, users, interaction,
notifications, admin, UI, impact, technical) and the recommended first five.

### 2. docs: add commit plan and history log

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-11-22 22:12:51 +06
- **Files:**
  - `docs/plans/commit-plan.md`

Documents the planned micro commits for the next weeks: order, scope, files and
the reason behind each commit, for both the frontend and the server repository.

### 3. feat(lib): add event date helpers

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-11-24 10:16:38 +06
- **Files:**
  - `lib/eventDate.ts`

Event dates are stored as YYYY-MM-DD without a time, so they are treated as all-day
events in local time.
- parseEventDate, getEventTiming (upcoming / today / ended)
- Google Calendar link and .ics file builders

### 4. feat(auth): read the user email from the verified JWT

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-11-24 12:06:43 +06
- **Files:**
  - `index.js (hunks 1, 2)`

verifyJWT now attaches the verified payload to req.user and a getEmail() helper
prefers that email over the client supplied `query` header. Older endpoints keep
working through the header fallback.

### 5. feat(saved): add bookmark endpoints for events

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-11-25 09:44:58 +06
- **Files:**
  - `index.js (hunks 3a, 12a)`

New savedEvents collection.
- GET /saved returns full event documents, newest first
- GET /saved/ids returns only ids (cheap check for lists)
- POST /saved is an idempotent upsert
- DELETE /saved/:eventId removes a bookmark

### 6. feat(events): add SaveBtn bookmark toggle

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-11-25 12:57:41 +06
- **Files:**
  - `components/events/SaveBtn.tsx`

Icon and button variants. Updates optimistically and rolls back if the request fails,
shows a toast, and asks guests to log in. A parent can pass initialSaved so a list
does not need one request per card.

### 7. feat(events): show a bookmark icon on event cards

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-11-25 13:22:51 +06
- **Files:**
  - `components/events/EventCard.tsx (hunks 1a, 2, 3a)`

EventCard accepts `saved` and `onSavedChange` and renders SaveBtn over the cover image.

### 8. feat(events): load saved event ids once on the events page

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-11-25 20:15:43 +06
- **Files:**
  - `src/app/events/page.tsx (hunks 1, 2, 3)`

One request to /saved/ids instead of one per card; the Set is updated when a card is
toggled so the UI stays in sync.

### 9. feat(saved): add saved events page

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-11-25 20:44:01 +06
- **Files:**
  - `src/app/events/saved/page.tsx`

/events/saved lists the bookmarked events with loading, error and empty states.
Unsaving a card removes it from the page right away.

### 10. feat(nav): link to saved events in the profile menu

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-11-27 16:02:56 +06
- **Files:**
  - `components/shared/NavBar.tsx (hunks 1, 3)`

Adds the Saved events entry with a bookmark icon.

### 11. feat(events): add ShareBtn popover

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-11-27 18:24:03 +06
- **Files:**
  - `components/events/ShareBtn.tsx`

Copy link (with a copied state), WhatsApp, Facebook and the native share sheet when the
browser supports it.

### 12. feat(events): add AddToCalendar popover

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-11-27 21:24:45 +06
- **Files:**
  - `components/events/AddToCalendar.tsx`

Opens Google Calendar with the event prefilled or downloads an .ics file for Apple and
Outlook. Events are created as all-day entries because they have no start time.

### 13. feat(events): add Countdown timer

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-11-28 10:47:42 +06
- **Files:**
  - `components/events/Countdown.tsx`

Days, hours, minutes and seconds until the event starts. Renders nothing on the server
so markup matches on hydration, and switches to Happening today / Event ended.

### 14. feat(events): add save, share, calendar and countdown to the event page

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-11-28 14:51:36 +06
- **Files:**
  - `src/app/events/[id]/page.tsx (hunks 2, 3a, 6, 8, 9)`

Wires the new components into the sidebar and replaces the old Share button that did
nothing.

### 15. feat(events): add waitlist collection and capacity helpers

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-11-28 19:29:00 +06
- **Files:**
  - `index.js (hunks 3c)`

- waitlist collection
- capacityOf(): 0 / empty / invalid means unlimited
- withCounts(): bookedCount for many events with a single aggregate
- fillFromWaitlist(): moves people from the waitlist into free spots, oldest first

### 16. feat(events): return bookedCount from the event list endpoints

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-11-28 23:39:50 +06
- **Files:**
  - `index.js (hunks 4, 5)`

GET / and GET /featured now include bookedCount so cards can show Full or
N spots left without extra requests.

### 17. feat(events): enforce capacity when joining an event

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-11-29 18:34:49 +06
- **Files:**
  - `index.js (hunks 9, 10)`

Rejects a join with 409 { full: true } when the event is full. Because two people can
pass the check at the same moment, the bookings are counted again after the insert and
the new booking is removed if it went over capacity. Joining directly also clears the
user's waitlist entry.

### 18. feat(events): add cancel join endpoint

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-11-29 20:55:50 +06
- **Files:**
  - `index.js (hunks 11a)`

DELETE /event/join/:eventId. The path has two segments on purpose so it does not clash
with DELETE /event/:id. A freed spot is given to the first person on the waitlist.

### 19. feat(events): add capacity info and waitlist endpoints

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-12-01 09:52:51 +06
- **Files:**
  - `index.js (hunks 11b)`

- GET /event/capacity/:id: counts, spots left, my status and my waitlist position
- POST /event/waitlist
- DELETE /event/waitlist/:eventId

### 20. feat(events): promote waitlist on capacity change and clean up on delete

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-12-01 11:26:20 +06
- **Files:**
  - `index.js (hunks 6, 7, 8)`

Editing an event re-runs the waitlist promotion, so raising the capacity lets people in.
Deleting an event also removes its bookings, bookmarks and waitlist entries.

### 21. feat(events): add StatusBadge components

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-01 12:13:33 +06
- **Files:**
  - `components/events/StatusBadge.tsx`

TimingBadge (Upcoming / Ongoing today / Ended) and SpotsBadge (Full, or N spots left
when the event is almost full).

### 22. feat(events): show status badges on cards and the event banner

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-03 11:04:45 +06
- **Files:**
  - `components/events/EventCard.tsx (hunks 1b, 3b)`
  - `src/app/events/[id]/page.tsx (hunks 3c, 4)`

Cards get the badges at the bottom of the cover image. The event banner used to print
event.status, which is missing in the data and rendered an empty badge.

### 23. style(events): clamp event card description to three lines

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-03 11:33:12 +06
- **Files:**
  - `components/events/EventCard.tsx (hunks 4)`

Descriptions are longer now, the list cards stay compact.

### 24. style(home): clamp featured card description to two lines

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-03 16:06:00 +06
- **Files:**
  - `components/homePage/FeaturedEventCard.tsx`

Keeps the homepage cards the same height.

### 25. feat(types): add hours and bookedCount to Event

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-05 11:12:48 +06
- **Files:**
  - `lib/event.ts`

hours: volunteer hours credited to participants.
bookedCount: number of joined people, added by the list endpoints.

### 26. feat(events): add volunteer hours field to the add and edit forms

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-05 13:25:07 +06
- **Files:**
  - `src/app/events/add/page.tsx`
  - `src/app/events/edit/[id]/page.tsx (hunks 1, 2)`

Optional number from 1 to 24. When empty the profile counts 4 hours per finished event.

### 27. feat(events): add capacity bar, waitlist and cancel join to the event page

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-05 20:18:14 +06
- **Files:**
  - `components/events/JoinBtn.tsx`
  - `components/events/EventParticipants.tsx`

EventParticipants loads /event/capacity once and shows N / capacity joined with a
progress bar. JoinBtn handles four states: join, joined (with a confirm dialog to cancel),
event full (join the waitlist) and on the waitlist (leave it). Replaces the dead
joined-check request that had no token.

### 28. feat(events): show volunteer hours on the event page

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-08 09:54:21 +06
- **Files:**
  - `src/app/events/[id]/page.tsx (hunks 1, 7)`

Adds a Volunteer hours row to the event information card.

### 29. feat(dashboard): add shared dashboard components and server fetch helper

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-08 10:50:23 +06
- **Files:**
  - `lib/serverEvents.ts`
  - `components/events/dashboard.tsx`

- fetchUserEvents(): session and token in parallel, returns { events, failed }
- DashboardHeader, DashboardStats, DashboardEventCard, empty / error / skeleton states

### 30. refactor(dashboard): use shared components on joined and manage pages

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-08 22:48:37 +06
- **Files:**
  - `src/app/events/joined/page.tsx`
  - `src/app/events/manage/page.tsx`

Both pages shrink to a few lines, get stats (total, upcoming, past), proper empty and
error states, a skeleton while loading and badges based on the real date.

### 31. feat(manage): confirm before deleting an event

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-12 11:49:43 +06
- **Files:**
  - `components/events/manage/Actions.tsx`

Replaces the instant delete with a dialog that explains what is removed and shows a
deleting state.

### 32. feat(follow): add follow organizer endpoints

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-12-12 15:32:40 +06
- **Files:**
  - `index.js (hunks 3b, 3e, 12c)`

follows collection keyed by the organizer name (case-insensitive).
- GET /following with event and follower counts
- GET /follow/status/:organizer
- POST /follow, DELETE /follow/:organizer

### 33. feat(profile): add profile stats and volunteer hours endpoint

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-12-12 19:51:08 +06
- **Files:**
  - `index.js (hunks 3d, 12b)`

GET /profile/stats returns joined, upcoming, completed, created, saved and following
counts, total volunteer hours and a history of finished events. Events without hours
count as 4 hours; dates are compared in Bangladesh time.

### 34. feat(auth): add bio field and self-service account deletion

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-12 21:26:46 +06
- **Files:**
  - `src/app/lib/auth.ts`
  - `src/app/lib/auth-client.ts`

- bio as an additional user field
- deleteUser enabled; beforeDelete removes the user's events, bookings, bookmarks,
  follows and waitlist entries
- client plugin infers the bio field

### 35. feat(proxy): require login for the profile page

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-14 12:43:59 +06
- **Files:**
  - `src/proxy.ts`

Redirects guests from /profile to /login.

### 36. feat(profile): add profile types and header

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-14 17:11:06 +06
- **Files:**
  - `components/profile/types.ts`
  - `components/profile/ProfileHeader.tsx`

Avatar (photo or initials), name, email, bio, member since, and the joined events,
volunteer hours and following counts.

### 37. feat(profile): add overview tab with volunteer hours log

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-15 13:52:41 +06
- **Files:**
  - `components/profile/OverviewTab.tsx`

Six stat cards and a log of finished events with the hours earned for each.

### 38. feat(follow): add FollowBtn

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-15 14:11:26 +06
- **Files:**
  - `components/events/FollowBtn.tsx`

Follow / Following toggle with the follower count. Hidden for your own events.

### 39. feat(follow): add follow button to the organizer card

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-17 12:21:18 +06
- **Files:**
  - `src/app/events/[id]/page.tsx (hunks 3b, 5)`

Shows the button next to the organizer on the event page.

### 40. feat(profile): add following tab

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-17 13:34:36 +06
- **Files:**
  - `components/profile/FollowingTab.tsx`

Lists followed organizers with event and follower counts and an Unfollow button.

### 41. chore(env): document IMGBB_API_KEY

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-17 19:58:52 +06
- **Files:**
  - `.env.example`

Needed for profile photo uploads. The key itself stays in the ignored .env file.

### 42. feat(upload): add server route for avatar uploads to ImgBB

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-19 14:39:56 +06
- **Files:**
  - `src/app/api/upload/avatar/route.ts`

POST /api/upload/avatar checks the session, the file type (JPG, PNG, WEBP, GIF) and
size (5 MB), uploads to ImgBB from the server so the API key never reaches the browser
and returns the public URL.

### 43. feat(profile): add settings tab

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-19 21:58:12 +06
- **Files:**
  - `components/profile/SettingsTab.tsx`

- edit name and bio, upload or remove the profile photo (preview before saving)
- change password (hidden for Google-only accounts)
- delete account with a typed confirmation

### 44. feat(profile): add profile page with tabs

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-20 14:27:34 +06
- **Files:**
  - `src/app/profile/page.tsx`

/profile with Overview, Following and Settings tabs, backed by /profile/stats.

### 45. feat(nav): add My profile link to the profile menu

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-20 14:35:46 +06
- **Files:**
  - `components/shared/NavBar.tsx (hunks 2)`

## Checklist after all commits

- `git status` shows only `AGENTS.md` as modified in the frontend and a clean tree in the server.
- `npx tsc --noEmit` passes in the frontend, `node --check index.js` passes in the server.
- Review `git log --oneline` in both repositories, then push when ready.
