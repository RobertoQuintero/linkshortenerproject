import { db } from "@/db";
import { links } from "@/db/schema";
import type { Link, NewLink } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getLinksByUserId(userId: string): Promise<Link[]> {
  return db.select().from(links).where(eq(links.userId, userId)).orderBy(desc(links.updatedAt));
}

export async function insertLink(
  data: Omit<NewLink, "id" | "createdAt">
): Promise<void> {
  await db.insert(links).values(data);
}

export async function updateLink(
  id: number,
  userId: string,
  data: { url: string; slug: string }
): Promise<void> {
  await db
    .update(links)
    .set({ url: data.url, slug: data.slug, updatedAt: new Date() })
    .where(and(eq(links.id, id), eq(links.userId, userId)));
}

export async function deleteLink(id: number, userId: string): Promise<void> {
  await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)));
}

export async function getLinkBySlug(slug: string): Promise<Link | undefined> {
  const result = await db
    .select()
    .from(links)
    .where(eq(links.slug, slug))
    .limit(1);
  return result[0];
}
