---
description: Read this file before implementing any features or fixes. It defines the tech stack, core frameworks, database, authentication, UI, styling, and build tools for the project.
---
# Tech Stack

## Core Framework

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.x | Full-stack React framework — App Router only |
| `react` | 19.x | UI library |
| `react-dom` | 19.x | React DOM renderer |
| `typescript` | 5.x | Language — strict mode enabled |

## Database

| Package | Version | Purpose |
|---|---|---|
| `drizzle-orm` | 0.45.x | Type-safe ORM for PostgreSQL |
| `drizzle-kit` | 0.31.x | CLI for schema diffing and migrations |
| `@neondatabase/serverless` | 1.x | Neon serverless PostgreSQL driver |
| `dotenv` | 17.x | Load `.env` for migration scripts |

- The database is **Neon PostgreSQL** (serverless).
- Drizzle uses the `neon-http` driver (`drizzle-orm/neon-http`).
- The schema file is at `db/schema.ts`. The migrations output directory is `drizzle/`.
- Run migrations with: `npx drizzle-kit push` (dev) or `npx drizzle-kit generate` + `npx drizzle-kit migrate` (CI).

## Authentication

| Package | Version | Purpose |
|---|---|---|
| `@clerk/nextjs` | 7.x | Authentication and user management |

- Clerk wraps the app in `ClerkProvider` inside `app/layout.tsx`.
- Use Clerk's `Show`, `SignInButton`, `SignUpButton`, `UserButton` components for UI.
- Use `auth()` / `currentUser()` from `@clerk/nextjs/server` in Server Components and Route Handlers.
- Use `useUser()` / `useAuth()` hooks in Client Components.

## UI & Styling

| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | 4.x | Utility-first CSS framework |
| `shadcn` | 4.x | Component CLI — installs into `components/ui/` |
| `radix-ui` | 1.x | Headless primitives used by shadcn |
| `class-variance-authority` | 0.7.x | Variant-based class management for components |
| `clsx` | 2.x | Conditional class merging |
| `tailwind-merge` | 3.x | Resolves Tailwind class conflicts |
| `tw-animate-css` | 1.x | CSS animation utilities for Tailwind |
| `lucide-react` | 0.577.x | Icon library |

- The shadcn style is `radix-nova` with `neutral` base color and CSS variables enabled.
- See [ui-components.md](ui-components.md) for usage patterns.

## Build Tools

| Package | Purpose |
|---|---|
| `tsx` | Run TypeScript scripts directly (used for Drizzle CLI) |
| `eslint` + `eslint-config-next` | Linting — Core Web Vitals + TypeScript rules |
| `@tailwindcss/postcss` | PostCSS plugin for Tailwind v4 |
