# RentRequest
Next.js 15 + TypeScript + Tailwind + Supabase (Postgres, Auth, RLS). Languages: SQ (default), EN, DE.
## Setup
1. `npm install`; `cp .env.example .env.local` and fill it (see "Environment variables").
2. Supabase SQL editor, in order: `supabase/migrations/001_rentrequest_schema.sql`, `002_rentrequest_workflow.sql`, `003_upgrade.sql`; optionally `supabase/seed.sql` (DEMO data; link `/r/RR-DEMO00000001?t=demo-token`). Never run the seed in production.
3. First admin: Supabase Auth > Users > add user (auto-confirm). Then: `update profiles set role='admin' where id='<auth user id>';` (the profile row is created automatically).
4. `npm run dev` (customers: `/request`; staff sign in at `/login`; admin `/admin`; companies `/partner`).
## Environment variables
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only), `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPPORT_EMAIL`, `CRON_SECRET` (for `/api/cron/expire`), `RESEND_API_KEY` (optional; email provider is NOT wired yet).
## Companies
Public applications (`/partners`) are stored as `pending`. Admin > Applications > approve creates the company and invites the contact via Supabase Auth email (needs Supabase SMTP). Admin can also add companies and invite users at Admin > Companies. Unapproved companies see nothing.
## Test the full workflow
1. Submit `/request`, open the private link. 2. Admin: Under review > Contacting > assign companies (log contacts) > Collecting offers. 3. Company user at `/partner`: open request, submit offer (total is computed by the database). 4. Admin: offer Under review > Approved > Published (request becomes Offers available). 5. Customer reloads private page: compare and select. 6. Admin: Share chosen contact fields with the company (audit-logged), then Confirm (commission created) or "company cannot fulfil" (request reopens; republish a withdrawn offer or collect new ones). 7. Complete or cancel; Admin > Commissions for payment status/notes; CSV export.
## Tests
See `tests/README.md` (51 SQL/RLS checks on real Postgres via PGlite; 30 app smoke checks).
## Deploy
Any Node host (Vercel etc.): set the env vars, run the 3 migrations on the production project, `npm run build && npm start`. Schedule `GET /api/cron/expire` daily with `Authorization: Bearer $CRON_SECRET`. See `docs/OPERATIONS.md`.
## Known limitations
Email/WhatsApp not wired (notifications stored as `not_configured`); in-memory rate limiter (use Redis for multiple instances); admin screens translate nav/stats/statuses/main labels but some detailed admin labels (contact log, disclosure) are English/Albanian only; legal text is draft; no image upload (https image URLs only); `next lint` not configured; Supabase Auth flows and invite emails are untested here.
