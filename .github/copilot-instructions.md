# GitHub Copilot Instructions — PM Gym

## Project Overview

**PM Gym** is a SaaS EdTech platform — "Duolingo for product thinking." Users develop product management skills through interactive branching scenarios, quizzes, and a gamified learning system. The app is currently in MVP development.

The Next.js app lives in the `pm-gym/` subdirectory. All code work happens there.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Database | PostgreSQL via Prisma ORM |
| Auth | Custom JWT-based auth (bcryptjs + jsonwebtoken) |
| Email | Nodemailer / Resend |
| Validation | Zod v4 |
| Runtime | Node.js (npm) |

---

## Project Structure

```
pm-gym/
├── app/                  # Next.js App Router pages & API routes
│   ├── api/auth/         # Login, register, verify-email, forgot/reset password, resend-verification
│   ├── api/user/         # /me (current user), /onboarding
│   ├── dashboard/        # Protected platform pages
│   ├── modules/          # Learning module pages
│   ├── scenarios/        # Interactive scenario pages
│   └── (auth pages)/     # login, register, verify-email, etc.
├── components/
│   ├── AmplitudeProvider.tsx  # Client component - wraps app for page-view tracking
│   ├── auth/             # AuthLayout, Button, Input, PasswordStrength, SocialAuthButtons
│   ├── platform/         # PlatformLayout, Sidebar
│   └── (landing)/        # Hero, Header, Footer, etc.
├── lib/
│   ├── amplitude.ts      # Analytics helpers: initAmplitude(), track(), identifyUser(), resetUser()
│   ├── auth.ts           # JWT helpers, password hashing, token verification
│   ├── email.ts          # Email sending (Nodemailer)
│   ├── prisma.ts         # Prisma client singleton
│   └── api.ts            # Shared API utilities
├── prisma/
│   ├── schema.prisma     # Full database schema
│   └── seed.ts           # Seed script
├── public/
│   └── data/
│       └── scenarios.json  # Static scenario content
└── _archive/             # Archived/unused routes (do not edit)
```

---

## Key Conventions

### TypeScript
- Use strict TypeScript everywhere.
- Always type function params and return values explicitly.
- Prefer `interface` for object shapes, `type` for unions/aliases.
- Never use `any` — use `unknown` if truly necessary.

### API Routes (App Router)
- All API routes live under `app/api/` as `route.ts` files.
- Use `NextRequest` / `NextResponse` from `next/server`.
- Validate all request bodies with Zod before processing.
- Return consistent JSON: `{ success: true, data: ... }` or `{ error: "message" }`.
- HTTP status codes: 200 success, 201 created, 400 bad input, 401 unauthenticated, 403 forbidden, 404 not found, 500 server error.

```ts
// Standard API route pattern
export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = MySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
  // ... logic
}
```

### Authentication
- Auth uses custom JWT tokens, **not** NextAuth sessions.
- JWT secret: `process.env.JWT_SECRET`.
- Tokens are sent by clients in the `Authorization: Bearer <token>` header.
- Use `lib/auth.ts` helpers (`verifyToken`, `hashPassword`, `comparePassword`).
- Email verification is required before a user can log in.
- Password reset uses single-use time-limited tokens stored in `PasswordResetToken`.

### Database (Prisma)
- Import the Prisma client from `lib/prisma.ts` (singleton pattern — do not re-instantiate).
- JSON array fields (`interests`, `objectives`, `prerequisites`, `tags`, `decisions`, etc.) are stored as serialised strings — always `JSON.parse()` / `JSON.stringify()` when reading/writing.
- Use `cuid()` for all IDs.
- `prisma.$disconnect()` is NOT needed per request; the singleton handles it.
- Database is **PostgreSQL** (both dev and prod). Run migrations with `npx prisma migrate dev`.

### Components
- Server Components by default; add `'use client'` only when needed (event handlers, hooks, browser APIs).
- Use Tailwind utility classes exclusively — no inline styles, no CSS modules.
- Follow the brand colour palette (see below).
- Import icons from `lucide-react`.

### Forms & Validation
- Use Zod for server-side validation in API routes.
- Client-side: basic HTML validation + Zod where useful.

### Environment Variables
- All secrets go in `.env.local` (never committed).
- Access via `process.env.VARIABLE_NAME`.
- Required vars: `DATABASE_URL`, `JWT_SECRET`, `SMTP_*` (email), `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_AMPLITUDE_API_KEY`.

### Analytics (Amplitude)
- Use `lib/amplitude.ts` helpers: `track(eventName, props)`, `identifyUser(userId, traits)`, `resetUser()`.
- `AmplitudeProvider` wraps the app and auto-tracks page views — do not add manual page-view calls.
- Amplitude is only initialised client-side; never call analytics helpers from Server Components or API routes.
- `NEXT_PUBLIC_AMPLITUDE_API_KEY` must be set; tracking silently no-ops if missing.

---

## Database Schema Summary

**Core models:** `User`, `Account`, `Session`, `PasswordResetToken`, `VerificationToken`

**Learning content:** `Module` → `Section` → `Lesson` → `Quiz`

**Resources:** `Resource` (templates, tools, guides, videos, articles — optionally linked to a `Module`)

**Gamification:** `Scenario`, `Achievement`

**Progress tracking:** `UserModuleProgress`, `UserLessonProgress`, `UserScenarioCompletion`, `QuizAttempt`, `UserAchievement`, `UserResourceBookmark`, `UserActivity`, `UserStats`

Key relationships:
- A `User` has many progress records, achievements, activities, and one `UserStats`.
- `Module` has many `Section`s and `Lesson`s.
- `Lesson` belongs to a `Module` and optionally a `Section`.

---

## Brand & Design System

### Colours (Tailwind custom / CSS vars)
| Token | Hex | Usage |
|---|---|---|
| Brand Blue | `#006EFF` | Primary CTAs, links, progress |
| Achievement Purple | `#8B5CF6` | Badges, gamification |
| Success Green | `#10B981` | Completed states, positive metrics |
| Action Orange | `#F59E0B` | Warnings, hints, in-progress |
| Alert Red | `#EF4444` | Errors, negative metrics |

### Typography
- **UI + Body:** Inter
- **Headings / Emphasis:** Manrope
- **Mono / Data:** JetBrains Mono

### Tone of Voice
- Address the user as "ты" (informal).
- Motivating, friendly, practical — like a mentor, not a lecturer.
- Celebrate wins; give constructive feedback on wrong decisions.
- Use gamification language: "Level up!", "Achievement unlocked", "+12% to Analytical Thinking".

### Motion
- Use Framer Motion for page transitions, modals, achievement unlocks.
- Fast interactions: 100–200 ms. Page transitions: 200–400 ms. Celebrations: 400–600 ms.

---

## Important Rules

1. **Never expose secrets** in client-side code (`NEXT_PUBLIC_` prefix only for public values).
2. **Validate all input** on the server with Zod before touching the database.
3. **Never trust JWT payload alone** — always re-fetch the user from the database when needed for sensitive operations.
4. **Dev-only routes** have been archived into `_archive/` — do not restore or reference them in production code.
5. **No `console.log` in production paths** — use proper error handling.
6. **Prisma migrations** are managed via `npx prisma migrate dev`. Do not manually edit migration SQL.
7. **Run dev server** from inside `pm-gym/`: `npm run dev` (port 3000).
8. **Seed the database** with `npm run db:seed` from `pm-gym/`.
9. **Vercel build** runs `npx prisma generate && next build` — always ensure Prisma client is generated before build.