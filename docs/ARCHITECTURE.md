# Architecture — School Management System

Sprint 1 foundation for **Ecole Secour d'en haut de puit-sales**.

## Stack

React 19 + TypeScript, TanStack Start/Router, Tailwind CSS v4, shadcn/ui,
Lovable Cloud (PostgreSQL, Auth, Storage) — a modular monolith, no microservices.

## Layout

```
src/
  config/school.ts        Branding, logo, hero image, placeholder contact details
  config/navigation.ts    Role-aware sidebar definitions per workspace
  lib/roles.ts            Role model, role → workspace mapping, access helpers
  lib/school-data.ts      Data access layer (TanStack Query hooks over the DB)
  hooks/use-auth.tsx      Session, profile and role context
  components/
    branding/             Logo component (single place to rebrand)
    common/               StatCard, PageHeader, empty/error/loading/coming-soon states
    dashboard/            Shared dashboard shell + role-specific panels
    public/               Public website layout (header, footer, nav)
  routes/
    index|about|admissions|contact  Public website
    auth|reset-password             Authentication
    _authenticated/route.tsx        Auth gate (client-side, ssr:false)
    _authenticated/dashboard.tsx    Role-based redirect
    _authenticated/{student,teacher,admin,system}/  Workspaces
```

Each workspace has `index.tsx` (functional dashboard) and `$section.tsx`
(navigation sections; not-yet-built modules render a "coming in a future
update" state). Adding a real module means replacing one branch of that
switch or adding a dedicated route file — no rewrite required.

## Roles & access control

Roles live in `public.user_roles` (never on `profiles`) with the enum
`app_role`: `student, teacher, parent, admin, super_admin, system_admin`.
Security-definer functions `has_role`, `is_staff`, `is_admin` back every RLS
policy, so authorization is enforced in the database — the frontend only
hides navigation.

Workspaces implemented now: student, teacher, admin (admin/super_admin),
system (system_admin). Parent is in the model but has no dashboard yet.

## Database

| Table        | Purpose                                                    |
| ------------ | ---------------------------------------------------------- |
| `profiles`   | Person details for every account (created on signup)       |
| `user_roles` | Role assignments (source of truth for RBAC)                |
| `students`   | Student file: student number, DOB, class, status           |
| `teachers`   | Staff file: employee number, specialization, status        |
| `classes`    | Class name, academic year, level, capacity, main teacher   |
| `audit_logs` | Foundation for traceability of sensitive actions           |

Future modules (applications, documents, assignments, grades, attendance,
payments, notifications, messages, announcements, report cards) attach to
these tables through `student_id` / `teacher_id` / `class_id`.

## Adding demo accounts

1. Sign up through `/auth` with a development address
   (e.g. `teacher.demo@example.com`). The signup trigger creates a profile
   and grants the `student` role.
2. Grant another role with a database query:
   `insert into public.user_roles (user_id, role) values ('<auth user id>', 'teacher');`
3. Optionally create the matching `students` / `teachers` record.

Never store real personal data in development accounts.

## Conventions

- Colors, fonts and radii are semantic tokens in `src/styles.css`; components
  never hard-code colors.
- Every page ships loading, empty and error states (`components/common/states.tsx`).
- Business/data logic stays in `lib/`; components stay presentational.
- Schema changes go through migrations; existing data is preserved.
