# Refactor commit plan

Second commit plan for GoodPlanet. It covers the codebase review and refactor: removing unused code,
one API helper instead of sixteen copies of the same fetch code, a shared event form, a modular
Express server and the security fixes that came with it.

## Rules

- Every commit is authored by **Taslimul Hasan**. No co-author or tool attribution lines.
- One logical change per commit, written as a conventional commit (`refactor`, `fix`, `feat`, `chore`, `style`, `docs`).
- The order matters: a helper comes before the code that uses it, and files are deleted before the
  libraries they needed are removed.
- Dates run from **2026-12-20** (after the last commit of the first plan) to **2026-12-25**,
  Bangladesh time (UTC+6), and only ever go forward.
- Nothing is pushed by this plan. Pushing is a separate, manual step.

## Deploy the two repositories together

The refactored client and server depend on each other: the client no longer sends the user's email
or event data when joining, and the server no longer has `/booked/:id` or `/event/joined/check`.
Deploy both repositories at the same time.

## Summary

| | Count |
|---|---|
| Total commits | 31 |
| Frontend (`GoodPlanet`) | 23 |
| Server (`GoodPlanet-server`) | 8 |

Not committed on purpose: `AGENTS.md` (rewritten automatically by `next dev`) and the local `.env` files.

## Commits in order

### 1. docs: add refactor commit plan

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-20 15:16:20 +06
- **Files:**
  - `docs/plans/commit-plan-2.md`

Documents the planned refactor commits: order, scope, files and the reason behind each one.

### 2. chore(lint): allow plain img tags for user supplied image URLs

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-20 16:48:56 +06
- **Files:**
  - `eslint.config.mjs`

Event, cover and profile images are remote URLs typed in by users, so their hosts are
unknown and next/image cannot be configured for them. Turning the rule off removes 20
warnings that could never be fixed the intended way.

### 3. refactor(ui): remove unused form control components

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-20 18:07:29 +06
- **Files:**
  - `components/ui/button-group.tsx (removed)`
  - `components/ui/calendar.tsx (removed)`
  - `components/ui/checkbox.tsx (removed)`
  - `components/ui/combobox.tsx (removed)`
  - `components/ui/command.tsx (removed)`
  - `components/ui/direction.tsx (removed)`
  - `components/ui/field.tsx (removed)`
  - `components/ui/input-group.tsx (removed)`
  - `components/ui/input-otp.tsx (removed)`
  - `components/ui/kbd.tsx (removed)`
  - `components/ui/native-select.tsx (removed)`
  - `components/ui/radio-group.tsx (removed)`
  - `components/ui/slider.tsx (removed)`
  - `components/ui/switch.tsx (removed)`
  - `components/ui/toggle.tsx (removed)`
  - `components/ui/toggle-group.tsx (removed)`

16 generated shadcn components that nothing imports: button-group, calendar, checkbox,
combobox, command, direction, field, input-group, input-otp, kbd, native-select,
radio-group, slider, switch, toggle and toggle-group. They can be added back with
`npx shadcn add <name>`.

### 4. refactor(ui): remove unused layout, overlay and navigation components

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-21 12:05:47 +06
- **Files:**
  - `components/ui/accordion.tsx (removed)`
  - `components/ui/aspect-ratio.tsx (removed)`
  - `components/ui/breadcrumb.tsx (removed)`
  - `components/ui/carousel.tsx (removed)`
  - `components/ui/collapsible.tsx (removed)`
  - `components/ui/context-menu.tsx (removed)`
  - `components/ui/dialog.tsx (removed)`
  - `components/ui/drawer.tsx (removed)`
  - `components/ui/dropdown-menu.tsx (removed)`
  - `components/ui/hover-card.tsx (removed)`
  - `components/ui/menubar.tsx (removed)`
  - `components/ui/navigation-menu.tsx (removed)`
  - `components/ui/pagination.tsx (removed)`
  - `components/ui/resizable.tsx (removed)`
  - `components/ui/scroll-area.tsx (removed)`
  - `components/ui/separator.tsx (removed)`
  - `components/ui/sheet.tsx (removed)`
  - `components/ui/sidebar.tsx (removed)`
  - `components/ui/tabs.tsx (removed)`
  - `components/ui/tooltip.tsx (removed)`

20 unused shadcn components: accordion, aspect-ratio, breadcrumb, carousel, collapsible,
context-menu, dialog, drawer, dropdown-menu, hover-card, menubar, navigation-menu,
pagination, resizable, scroll-area, separator, sheet, sidebar, tabs and tooltip.

### 5. refactor(ui): remove unused data and feedback components

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-21 12:18:52 +06
- **Files:**
  - `components/ui/alert.tsx (removed)`
  - `components/ui/attachment.tsx (removed)`
  - `components/ui/avatar.tsx (removed)`
  - `components/ui/bubble.tsx (removed)`
  - `components/ui/chart.tsx (removed)`
  - `components/ui/code-block.tsx (removed)`
  - `components/ui/empty.tsx (removed)`
  - `components/ui/item.tsx (removed)`
  - `components/ui/marker.tsx (removed)`
  - `components/ui/message-scroller.tsx (removed)`
  - `components/ui/message.tsx (removed)`
  - `components/ui/progress.tsx (removed)`
  - `components/ui/questionnaire.tsx (removed)`
  - `components/ui/skeleton.tsx (removed)`
  - `components/ui/spinner.tsx (removed)`
  - `components/ui/table.tsx (removed)`
  - `components/ui/toast.tsx (removed)`
  - `components/ui/trace.tsx (removed)`

18 unused shadcn components: alert, attachment, avatar, bubble, chart, code-block, empty,
item, marker, message-scroller, message, progress, questionnaire, skeleton, spinner,
table, toast and trace.
Only alert-dialog, badge, button, card, input, label, popover, select, sonner and
textarea are still used.

### 6. refactor: remove dead syntax highlighter and mobile hook

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-21 15:53:08 +06
- **Files:**
  - `lib/highlighter.tsx (removed)`
  - `hooks/use-highlighted-code.ts (removed)`
  - `hooks/use-mobile.ts (removed)`

lib/highlighter.tsx, hooks/use-highlighted-code.ts and hooks/use-mobile.ts were only used by
the components removed above.

### 7. chore(deps): drop nine unused libraries and add a typecheck script

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-21 19:26:50 +06
- **Files:**
  - `package.json`
  - `package-lock.json`

Removed: @shadcn/react, cmdk, date-fns, embla-carousel-react, input-otp, react-day-picker,
react-resizable-panels, recharts and shiki. Dependencies go from 23 to 14.
npm run typecheck runs tsc --noEmit.

### 8. refactor(server): move the MongoDB client and collections to src/config/db.js

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-12-21 22:05:08 +06
- **Files:**
  - `src/config/db.js`

One place that creates the client and exports the collections. Also declares the
eventLocks collection used to serialise joins on one event.

### 9. refactor(server): add JWT middleware and route wrappers

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-12-21 22:41:11 +06
- **Files:**
  - `src/middleware/auth.js`
  - `src/utils/http.js`

- verifyJWT creates the remote key set once, so keys are cached instead of being
  downloaded on every request
- getEmail reads the caller from the verified token only, never from a body or header
- route() and withEmail() wrap handlers: one place for error logging and the 500 response

### 10. refactor(server): add event helpers and a per-event lock

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-12-21 23:38:37 +06
- **Files:**
  - `src/utils/events.js`

capacity, volunteer hours, today (Bangladesh time), organizer key, a whitelist of event
fields, eventsByIds, withCounts and fillFromWaitlist.
withEventLock() serialises joins and waitlist promotions for one event with a lock
document, so two people taking the last seat at the same moment end with exactly one
winner. Before, both could be turned away.

### 11. refactor(server): add events routes with ownership checks

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-12-22 10:16:36 +06
- **Files:**
  - `src/routes/events.js`

- only the creator can edit or delete an event (403 otherwise)
- a new event always belongs to the caller; only whitelisted fields can be written
- invalid ids return 404 instead of a 500
- deleting an event removes its bookings, bookmarks and waitlist entries

### 12. refactor(server): add bookings routes

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-12-22 13:20:33 +06
- **Files:**
  - `src/routes/bookings.js`

Join (under the event lock), cancel, capacity info, waitlist and joined events.
Bookings now store only { eventId, email, joinedAt } and /bookedEvents returns the live
event documents, so edits show up right away. The caller's email comes from the token.
Removes /booked/:id (it exposed every participant's email) and /event/joined/check.

### 13. refactor(server): add saved, follow and profile routes

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-12-22 19:27:28 +06
- **Files:**
  - `src/routes/saved.js`
  - `src/routes/follow.js`
  - `src/routes/profile.js`

The same endpoints as before, split into their own files and using the shared wrappers.

### 14. refactor(server): replace the 740 line index.js with a small entry file

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-12-22 20:25:06 +06
- **Files:**
  - `index.js`
  - `package.json`
  - `.gitignore`
  - `.env.example`

index.js now only creates the app, mounts the routers and listens (or exports the app on
Vercel). Adds npm start / npm run dev and a .env.example. PORT can be set.

### 15. refactor(lib): add api() and apiServer() helpers for the Express API

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-22 21:36:10 +06
- **Files:**
  - `lib/apiClient.ts`
  - `lib/apiServer.ts`
  - `lib/getTokenFromClient.ts`
  - `lib/getTokenFromServer.ts`

One place that knows the API base URL and adds the Bearer token. The server reads the
user from the token, so the old `query` email header is no longer needed.
isPrerenderAbort() lets code that catches request errors ignore the signal Next.js uses
while prerendering. getTokenFromClient / getTokenFromServer are tidied.

### 16. feat(lib): add todayISO and the useToday hook

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-22 22:27:04 +06
- **Files:**
  - `lib/eventDate.ts`
  - `lib/useToday.ts`

Next.js does not allow reading the current time while a client component is prerendered.
useToday() returns an empty string on the server and today's date in the browser,
without a hydration mismatch.

### 17. refactor(events): use api() in SaveBtn, FollowBtn and FollowingTab

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-22 23:22:58 +06
- **Files:**
  - `components/events/SaveBtn.tsx`
  - `components/events/FollowBtn.tsx`
  - `components/profile/FollowingTab.tsx`

Removes the token handling, the base URL constant and the email header from each of them.

### 18. refactor(events): use api() in JoinBtn and EventParticipants

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-22 23:23:48 +06
- **Files:**
  - `components/events/JoinBtn.tsx`
  - `components/events/EventParticipants.tsx`

Joining now sends only the event id; the server builds the booking from the token and the
event, so the client can no longer join on behalf of somebody else.

### 19. fix(events): load the event page data in parallel and show not-found

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-23 12:32:39 +06
- **Files:**
  - `lib/serverEvents.ts`
  - `src/app/events/[id]/page.tsx`

The event and its seat count load together through apiServer(). An unknown or invalid
id shows the not-found page; before, the page crashed on `event.image`. The dashboard
loader no longer swallows the prerender signal.

### 20. refactor(events): events and saved pages use api() and derive their state

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-23 13:38:12 +06
- **Files:**
  - `src/app/events/page.tsx`
  - `src/app/events/saved/page.tsx`

- the public event list is fetched without a token
- upcoming events are filtered with getEventTiming instead of a today string kept in state
- the saved page uses null as its loading state instead of setting state in an effect
Both pages now pass the React Hooks lint rule.

### 21. refactor(manage): delete events and load the profile through api()

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-23 14:14:48 +06
- **Files:**
  - `components/events/manage/Actions.tsx`
  - `src/app/profile/page.tsx`

### 22. feat(events): add EventForm shared by the add and edit pages

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-23 17:47:04 +06
- **Files:**
  - `components/events/EventForm.tsx`

The two pages repeated about 250 lines of the same form. EventForm holds the fields and the
validation (required fields, a date that is not in the past, whole numbers for capacity
and hours, an http(s) image link) and shows a saving state to stop double submits.

### 23. refactor(events): add and edit pages use EventForm

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-23 19:21:45 +06
- **Files:**
  - `src/app/events/add/page.tsx`
  - `src/app/events/edit/[id]/page.tsx`

Add shrinks from 396 to 32 lines and edit from 468 to 70. Failed saves now show an error
toast; before, a failed create did nothing.

### 24. refactor(profile): split SettingsTab into focused forms

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-24 10:21:39 +06
- **Files:**
  - `components/profile/SettingsTab.tsx`
  - `components/profile/settings/shared.tsx`
  - `components/profile/settings/EditProfileForm.tsx`
  - `components/profile/settings/ChangePasswordForm.tsx`
  - `components/profile/settings/DeleteAccount.tsx`

531 lines become a 67 line wrapper plus EditProfileForm, ChangePasswordForm, DeleteAccount
and a shared file with the Section card and input style.

### 25. refactor(nav): build the NavBar menus from lists and use Link

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-24 12:02:36 +06
- **Files:**
  - `components/shared/NavBar.tsx`

The five profile menu entries become a list. Links use next/link, so moving around no
longer reloads the page, and the profile popover closes after a click.

### 26. fix(auth): share the Google button and show sign in and sign up errors

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-24 13:36:24 +06
- **Files:**
  - `components/auth/GoogleButton.tsx`
  - `src/app/login/page.tsx`
  - `src/app/signup/page.tsx`

The Google button and its icon were copied into both pages. Wrong passwords or an email that
is already taken used to fail silently; now a toast explains it. Internal links use Link.

### 27. fix(home): escape apostrophes and keep the page up when the API is down

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-24 14:24:05 +06
- **Files:**
  - `components/homePage/Quote.tsx`
  - `components/homePage/Events.tsx`

Quote and the login page used raw apostrophes (react/no-unescaped-entities). The featured
events section shows a friendly message instead of crashing the whole home page when the
API cannot be reached.

### 28. refactor(dashboard): reuse TimingBadge and drop leftover lint comments

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-24 22:41:57 +06
- **Files:**
  - `components/events/dashboard.tsx`
  - `components/profile/ProfileHeader.tsx`

The dashboard card had its own copy of the Upcoming / Today / Ended badge table.

### 29. refactor(auth): tidy the auth config and comment the route guard

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-25 10:05:32 +06
- **Files:**
  - `src/app/lib/auth.ts`
  - `src/app/lib/auth-client.ts`
  - `src/app/api/auth/[...all]/route.ts`
  - `src/proxy.ts`

- account data cleanup moves into deleteUserData()
- proxy.ts: the comment now matches what it does (the /events list is public on purpose)
- comments on the auth client and the Better Auth route

### 30. docs(server): rewrite the README

- **Repo:** GoodPlanet-server (backend)
- **Date:** 2026-12-25 15:36:06 +06
- **Files:**
  - `README.md`

Structure, endpoint table, authentication and ownership rules, data model, setup and
deployment. The old file was saved as UTF-16 and unreadable on GitHub; it is UTF-8 now.

### 31. docs: update the README for the new structure

- **Repo:** GoodPlanet (frontend)
- **Date:** 2026-12-25 20:49:12 +06
- **Files:**
  - `README.md`

Project structure, tech stack (removed libraries), security notes and the typecheck script.

## Checklist after all commits

- `git status` shows only `AGENTS.md` as modified in the frontend and a clean tree in the server.
- Frontend: `npm run lint`, `npm run typecheck` and `npm run build` pass.
- Server: `node --check` passes for every file and the API starts.
- Review `git log --oneline` in both repositories, then push when ready.
