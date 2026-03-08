# Database

## Stack

- **ORM**: Drizzle ORM (`drizzle-orm`)
- **Driver**: Neon serverless HTTP (`drizzle-orm/neon-http`)
- **Database**: Neon PostgreSQL (serverless)
- **Migrations**: Drizzle Kit (`drizzle-kit`)

## Client

The database client is a singleton exported from `db/index.ts`. **Never create a second Drizzle instance.**

```ts
// db/index.ts
import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(process.env.DATABASE_URL!);
export { db };
```

Import it anywhere server-side as:

```ts
import { db } from "@/db";
```

## Schema

All table definitions live exclusively in `db/schema.ts`. Group related tables together and export each table object.

### Naming Conventions

- Table names: **plural snake_case** (e.g., `links`, `short_links`).
- Column names: **snake_case** (e.g., `created_at`, `user_id`).
- Drizzle table variable names: **camelCase singular** matching the table name (e.g., `links` table → `links` variable).

### Example Schema Pattern

```ts
// db/schema.ts
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
  slug: varchar("slug", { length: 20 }).notNull().unique(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
```

- Always export `$inferSelect` and `$inferInsert` types alongside each table.
- Use `defaultNow()` for `createdAt` columns, never set them manually.
- Use `text` for IDs — generate them with `crypto.randomUUID()` or a short-id library server-side.

## Queries

Use Drizzle's query builder. Avoid raw SQL unless strictly necessary.

```ts
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

// Select
const link = await db.select().from(links).where(eq(links.slug, slug)).limit(1);

// Insert
await db.insert(links).values({ id, url, slug, userId });

// Delete
await db.delete(links).where(eq(links.id, id));
```

- Always `await` queries — they are Promises.
- Use `limit(1)` when fetching a single row.
- Destructure the first element (`[0]`) after a single-row select and check for `undefined`.

## Migrations

```bash
# Push schema changes directly to the database (development)
npx drizzle-kit push

# Generate a migration SQL file
npx drizzle-kit generate

# Apply pending migrations
npx drizzle-kit migrate
```

- The `drizzle/` directory is auto-generated — do not edit migration files manually.
- The schema path is `./db/schema.ts` (configured in `drizzle.config.ts`).
- Always run `drizzle-kit push` after modifying `db/schema.ts` during development.

## Security

- Never expose `DATABASE_URL` to the client. It is server-side only (no `NEXT_PUBLIC_` prefix).
- All queries that write data must verify the authenticated user owns the resource being modified.
- Drizzle's parameterized queries protect against SQL injection — never concatenate user input into raw SQL strings.
