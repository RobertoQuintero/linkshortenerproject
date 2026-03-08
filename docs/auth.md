# Authentication

## Non-Negotiable Rules

- **Clerk is the only authentication provider.** Never implement custom auth, NextAuth, Auth.js, or any other auth mechanism.
- `/dashboard` is a protected route. Users must be logged in to access it — unauthenticated users are redirected automatically by middleware.
- Authenticated users visiting `/` must be redirected to `/dashboard`.
- Sign-in and sign-up must **always** use `mode="modal"`. Never navigate to a dedicated `/sign-in` or `/sign-up` page.

## Provider

Authentication is handled by **Clerk** (`@clerk/nextjs` v7).

`ClerkProvider` wraps the entire app in `app/layout.tsx`. It must remain the outermost provider in the layout tree.

## Protecting Routes

### Middleware (recommended)

Create a `middleware.ts` at the project root to protect routes and handle redirects:

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/:slug"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  // Redirect authenticated users away from homepage to dashboard
  if (userId && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
```

### Server Components

```ts
import { auth, currentUser } from "@clerk/nextjs/server";

// Get userId only
const { userId } = await auth();
if (!userId) redirect("/sign-in");

// Get full user object
const user = await currentUser();
```

### Server Actions

Always check authentication at the top of every Server Action that mutates data:

```ts
"use server";
import { auth } from "@clerk/nextjs/server";

export async function deleteLink(id: string): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  // Verify the link belongs to userId before deleting
}
```

### Client Components

```tsx
"use client";
import { useUser, useAuth } from "@clerk/nextjs";

export function ProfileCard() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return null;
  return <p>{user?.emailAddresses[0].emailAddress}</p>;
}
```

## UI Components

Use these Clerk components directly from `@clerk/nextjs`:

| Component | Purpose |
|---|---|
| `<SignInButton mode="modal">` | Trigger sign-in modal — **always use `mode="modal"`** |
| `<SignUpButton mode="modal">` | Trigger sign-up modal — **always use `mode="modal"`** |
| `<UserButton />` | Avatar / account menu for signed-in users |
| `<SignedIn>` | Conditionally render for authenticated users |
| `<SignedOut>` | Conditionally render for unauthenticated users |

Never use `<SignInButton>` or `<SignUpButton>` without `mode="modal"`. Do not create `/sign-in` or `/sign-up` pages.

## User ID in the Database

- Store `userId` from Clerk's `auth()` in database rows that belong to a user.
- `userId` is a `string` prefixed with `user_` (e.g., `user_2abc123`).
- Always filter queries by `userId` when returning user-owned resources.

```ts
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

const { userId } = await auth();
const userLinks = await db.select().from(links).where(eq(links.userId, userId!));
```

## Environment Variables

The following Clerk environment variables must be present in `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is safe to expose to the browser.
- `CLERK_SECRET_KEY` is server-side only — never expose it to the client.
