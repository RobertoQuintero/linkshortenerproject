# Coding Standards

## TypeScript

- **Strict mode is always on** (`"strict": true` in `tsconfig.json`). Never disable it or use `@ts-ignore`.
- **Never use `any`.** Use `unknown` for truly unknown types and narrow with type guards.
- **Prefer `type` over `interface`** for object shapes unless you need declaration merging.
- Always provide explicit return types on exported functions and Server Actions.
- Use `satisfies` to validate object literals against a type without widening.

```ts
// Good
export async function getLink(slug: string): Promise<Link | null> { ... }

// Bad
export async function getLink(slug: string) { ... }
```

## React & Next.js

- **Default to Server Components.** Use `"use client"` only when required (hooks, browser APIs, event listeners).
- **Never `fetch()` inside Client Components.** Fetch in Server Components or Route Handlers and pass data as props.
- Use the Next.js `Image` component (`next/image`) for all `<img>` elements.
- Use the Next.js `Link` component (`next/link`) for all internal `<a>` navigation.
- Use `notFound()`, `redirect()`, and `permanentRedirect()` from `next/navigation` — never throw HTTP responses manually.
- Avoid `useEffect` for data derivation; compute values inline or in Server Components.

### Server Actions

- Define Server Actions in dedicated `actions.ts` files co-located with their route segment, or in a top-level `app/actions/` folder.
- Mark the file or function with `"use server"`.
- Validate all input at the action boundary. Never trust client-provided data.

```ts
"use server";
import { auth } from "@clerk/nextjs/server";

export async function createShortLink(url: string): Promise<{ slug: string }> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  // validate url ...
}
```

## Naming Conventions

| Construct | Convention | Example |
|---|---|---|
| React components | PascalCase | `LinkCard`, `ShortUrlInput` |
| Functions / variables | camelCase | `createShortLink`, `userId` |
| Constants (module-level) | SCREAMING_SNAKE_CASE | `BASE_URL` |
| TypeScript types | PascalCase | `Link`, `CreateLinkPayload` |
| Drizzle table objects | camelCase | `links`, `users` |
| Files (components) | PascalCase.tsx | `LinkCard.tsx` |
| Files (utilities) | camelCase.ts | `generateSlug.ts` |

## Error Handling

- Handle expected errors (validation, not-found) gracefully using `notFound()` or returning typed result objects.
- Use `try/catch` for genuinely unexpected failures (e.g., database errors) at the boundary, not throughout the call chain.
- Never expose raw database error messages to the client.

## Environment Variables

- Access via `process.env.VARIABLE_NAME` — never hardcode values.
- Required variables must fail fast with a clear error on startup, not silently be `undefined`.
- Variables consumed server-side only must not be prefixed with `NEXT_PUBLIC_`.

## Formatting & Linting

- The project uses ESLint with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- Do not disable ESLint rules inline unless absolutely unavoidable.
- Code style follows the project's existing patterns — no Prettier config is present, so match surrounding whitespace and indentation.
