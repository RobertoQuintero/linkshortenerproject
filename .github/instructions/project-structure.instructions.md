---
description: Read this file before implementing any features or fixes. It defines the overall project structure, directory layout, and key conventions for file naming, path aliases, component types, and co-location.
---
# Project Structure

## Directory Layout

```
linkshortenerproject/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout — ClerkProvider, fonts, global header
│   ├── page.tsx            # Home page (marketing / link creation UI)
│   ├── globals.css         # Global CSS and Tailwind v4 theme tokens
│   └── [slug]/             # Dynamic redirect route (to be created)
│       └── route.ts        # Route handler that resolves short links
├── components/
│   └── ui/                 # shadcn/ui components — DO NOT EDIT MANUALLY
├── db/
│   ├── index.ts            # Drizzle client singleton (exports `db`)
│   └── schema.ts           # All table definitions (to be created)
├── lib/
│   └── utils.ts            # `cn()` utility and shared helpers
├── drizzle/                # Auto-generated migration SQL files
├── docs/                   # Agent instruction documents
├── public/                 # Static assets
├── drizzle.config.ts       # Drizzle Kit configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── components.json         # shadcn/ui configuration
└── AGENTS..md              # Root agent instructions
```

## Key Conventions

### File Naming

- **Pages and layouts**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` — Next.js conventions, lowercase.
- **Route handlers**: `route.ts` inside an `app/` segment folder.
- **React components**: `PascalCase.tsx` (e.g., `LinkCard.tsx`).
- **Utility files**: `camelCase.ts` (e.g., `utils.ts`, `formatDate.ts`).
- **Drizzle schema**: always `db/schema.ts` — single file.

### Path Aliases

All imports use the `@/` alias pointing to the workspace root.

```ts
import { db } from "@/db";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
```

Never use relative paths that cross directory boundaries (e.g., `../../db`).

### Server vs. Client Components

- **Default to Server Components.** Only add `"use client"` when the component uses browser APIs, React hooks, or event handlers.
- Keep data-fetching logic in Server Components or Route Handlers. Do not `fetch()` from Client Components.
- Place the `"use client"` directive at the very top of the file, before any imports.

### Co-location

- Feature-specific components that are not reusable belong in a `_components/` folder co-located with their route segment.
- Shared reusable components (non-UI-primitive) go in `components/`.
- Do not put business logic in `components/ui/` — those files are owned by shadcn.
