# Agent Instructions — Link Shortener Project

This file is the root agent instructions document. It defines the coding standards, architecture decisions, and conventions all LLM agents must follow when assisting with this codebase.


## Project Overview

A full-stack link shortener web application built with the Next.js App Router. Users authenticate via Clerk, create short links stored in a Neon PostgreSQL database via Drizzle ORM, and are redirected when visiting a short URL.


## Non-Negotiable Rules



1. **TypeScript strict mode is always on.** Never use `any`. Prefer explicit return types on all exported functions.
2. **Never install new dependencies** without explicit user approval.
3. **Do not modify files inside `components/ui/`** — these are managed by the shadcn CLI.
4. **All database access goes through `db/index.ts`.** Never instantiate a new Drizzle client elsewhere.
5. **All schema definitions live in `db/schema.ts`.** Never define tables outside this file.
6. **Environment variables are never hardcoded.** Always access them via `process.env`.
7. **Use the `cn()` utility** from `@/lib/utils` for all conditional class name logic.
8. **Do not add comments** to code unless the logic is genuinely non-obvious.
9. **Never use `middleware.ts`.** This file is deprecated in Next.js 16 (the version used in this project). All middleware/proxy logic must live in `proxy.ts` instead.
