# Plan: Fix toasts not rendering on the website

## Root cause

`components/ui/sonner.tsx` defines a `Toaster` component, but it is never mounted in the app tree. `sonner`'s `toast()` calls are no-ops without a `<Toaster>` element present, so notifications never appear.

Evidence:
- `components/ui/sonner.tsx:7` defines `const Toaster = (...)`
- `grep "<Toaster"` across the repo returns no usages
- `src/app/layout.tsx` only renders `<NavBar />`, `{children}`, and `<Footer />`

## Fix

Mount the `Toaster` component in the root layout so it is available on every page.

### `src/app/layout.tsx`

1. Import `Toaster`:
   ```tsx
   import { Toaster } from "@/components/ui/sonner";
   ```
2. Render it inside `<body>`, e.g. after `{children}` and before `</body>`:
   ```tsx
   <Toaster />
   ```

## Verification

1. Run `npm run dev` (or the existing dev command).
2. Trigger a toast:
   - Log in, then create an event (`/events/add`) — success toast should appear on submit.
   - Delete an event from `/events/manage` — success/error toasts should appear.
3. Confirm toasts appear at the default position (bottom-right) and dismiss on action.

## Notes / Risks

- `Toaster` uses `next-themes`'s `useTheme`; ensure `NextThemesProvider` (or equivalent) wraps the tree so `theme` resolves. The current `layout.tsx` does not wrap with `next-themes`, so `theme` may be `undefined` and fall back to `system` — acceptable, but if dark/light toasts are broken, wrap `<body>` content with `NextThemesProvider` in `layout.tsx`.
- No API or data changes; UI-only change.