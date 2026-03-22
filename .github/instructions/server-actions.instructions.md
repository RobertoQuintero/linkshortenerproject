---
description: Read this file before implementing any data mutations. It defines the rules for server actions, validation, authentication, and how they interact with data helpers.
applyTo: "**/*.ts,**/*.tsx"
---

# Server Actions

## Rules

- ALL data mutations must be done via server actions. Never mutate data directly from client components or server components.
- Server actions must **only** be called from client components.
- Server action files must be named `actions.ts` and co-located in the same directory as the client component that calls them.

## File Structure

```
app/
  dashboard/
    _components/
      create-link-form.tsx   ← client component
      actions.ts             ← server action (co-located)
```

## TypeScript

- ALL data passed into server actions must have explicit TypeScript types.
- **Never** use `FormData` as a parameter type. Define a typed object instead.

```ts
// ✅ correct
type CreateLinkInput = { url: string; slug: string };
export async function createLink(input: CreateLinkInput) { ... }

// ❌ wrong
export async function createLink(formData: FormData) { ... }
```

## Validation

- ALL inputs must be validated with **Zod** before any logic runs.

```ts
const schema = z.object({
  url: z.string().url(),
  slug: z.string().min(1).max(10),
});

const parsed = schema.safeParse(input);
if (!parsed.success) throw new Error("Invalid input");
```

## Authentication

- Every server action must verify a logged-in user **before** any database operation.

```ts
"use server";
import { auth } from "@clerk/nextjs/server";

export async function createLink(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  // proceed with mutation...
}
```

## Return Values

- Server actions must **never** throw errors. Always return a typed result object with either a `success` or `error` property.

```ts
type ActionResult = { success: true } | { error: string };

export async function createLink(input: CreateLinkInput): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  try {
    await insertLink({ ...parsed.data, userId });
    return { success: true };
  } catch {
    return { error: "Failed to create link" };
  }
}
```

## Database Operations

- Server actions must **never** use Drizzle queries directly.
- All database operations must go through helper functions located in the `/data` directory.

```ts
// ✅ correct
import { insertLink } from "@/data/links";
await insertLink({ ...parsed.data, userId });

// ❌ wrong
await db.insert(links).values({ ... });
```
