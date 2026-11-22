# GoodPlanet – Micro Feature Plan (55 Features)

## Events
1. Save/Bookmark event – হার্ট আইকনে ক্লিক করে পরে দেখার জন্য রাখা
2. Share button – link copy, WhatsApp, Facebook share
3. Add to Calendar – Google Calendar বা .ics ফাইল
4. Event capacity limit – সীট শেষ হলে "Full" badge ও waitlist
5. Countdown timer – ইভেন্ট শুরু হতে কত বাকি
6. Event status badge – Upcoming, Ongoing, Ended
7. Map location – Google Maps/Leaflet embed ও "Get Directions"
8. Image gallery – ইভেন্টে একাধিক ছবি, carousel দিয়ে (embla আছে)
9. Event duplicate – পুরনো ইভেন্ট copy করে নতুন বানানো
10. Recurring events – সাপ্তাহিক বা মাসিক ইভেন্ট
11. Tags/Hashtags – category ছাড়াও আলাদা tag
12. Sort ও filter – তারিখ, জনপ্রিয়তা, দূরত্ব, বিনামূল্যে/paid
13. Pagination বা infinite scroll
14. Cancel event – organizer বাতিল করলে participant-দের জানানো

## User
15. Profile page – avatar, bio, joined events count
16. Edit profile / change password
17. Volunteer hours tracker
18. Badges/Achievements – "First Event", "5 Events Joined"
19. Public organizer profile – organizer-এর সব ইভেন্ট একসাথে
20. Follow organizer
21. Forgot/Reset password ও Email verification
22. Delete account

## Interaction
23. Comments/Discussion ইভেন্টের পাতায়
24. Ratings ও review – ইভেন্ট শেষে feedback
25. Like/Reaction
26. Report event – ভুয়া বা অনুপযুক্ত ইভেন্টের জন্য
27. Invite friends – email বা link দিয়ে
28. Photo upload ইভেন্টের পরে, participant-রা দেবে

## Notification
29. Email confirmation – join করলে
30. Reminder email – ইভেন্টের ১ দিন আগে
31. In-app notification bell
32. Newsletter subscribe – NewsLetter component-কে MongoDB-র সাথে যুক্ত করা

## Organizer / Admin
33. Dashboard analytics – join সংখ্যা, view সংখ্যা (recharts আছে)
34. Participant list CSV export
35. Attendance check-in – QR code scan
36. Admin panel – ইভেন্ট approve/reject, user ban
37. Role system – user, organizer, admin
38. Draft event – publish করার আগে save করে রাখা

## UI / UX
39. Dark/Light toggle (`next-themes` আছে)
40. Skeleton loading (skeleton component আছে)
41. Empty state – "No events found" ছবি সহ (`empty.tsx` আছে)
42. Toast feedback সব action-এ (sonner আছে)
43. Search suggestions – `cmdk` দিয়ে Ctrl+K command menu
44. Breadcrumb navigation
45. Multi-language – বাংলা ও English
46. PWA support – মোবাইলে install

## Impact ও Gamification
47. Live impact counter – "১২০০ গাছ লাগানো হয়েছে"
48. Leaderboard – শীর্ষ volunteer
49. Donation/fundraising progress bar
50. Certificate generate – ইভেন্ট শেষে PDF

## Technical
51. Rate limiting ও input validation (Zod)
52. SEO metadata ও OpenGraph image প্রতি ইভেন্টে
53. Image upload (Cloudinary বা imgbb)
54. Error boundary ও custom 404 page
55. Unit/E2E test (Playwright)

## Recommended first 5
1. Save/Bookmark (#1)
2. Event capacity ও status badge (#4, #6)
3. User profile page (#15)
4. Email confirmation (#29)
5. Share + Add to Calendar (#2, #3)
