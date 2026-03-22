"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { insertLink, updateLink, deleteLink } from "@/data/links";

const slugSchema = z
  .string()
  .min(1, "Slug is required")
  .max(10, "Slug must be 10 characters or fewer")
  .regex(/^[a-zA-Z0-9_-]+$/, "Slug may only contain letters, numbers, hyphens, and underscores");

const createLinkSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  slug: slugSchema,
});

const editLinkSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().url("Please enter a valid URL"),
  slug: slugSchema,
});

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;
type EditLinkInput = z.infer<typeof editLinkSchema>;
type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

type ActionResult = { success: true } | { error: string };

export async function createLink(input: CreateLinkInput): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  try {
    await insertLink({
      url: parsed.data.url,
      slug: parsed.data.slug,
      userId,
      updatedAt: new Date(),
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("[createLink] DB error:", error);
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("unique") || message.includes("duplicate") || message.includes("23505")) {
      return { error: "That slug is already in use. Please choose a different one." };
    }
    return { error: "Failed to create link. Please try again." };
  }
}

export async function editLink(input: EditLinkInput): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = editLinkSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  try {
    await updateLink(parsed.data.id, userId, {
      url: parsed.data.url,
      slug: parsed.data.slug,
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("[editLink] DB error:", error);
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("unique") || message.includes("duplicate") || message.includes("23505")) {
      return { error: "That slug is already in use. Please choose a different one." };
    }
    return { error: "Failed to update link. Please try again." };
  }
}

export async function deleteLinkAction(input: DeleteLinkInput): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  try {
    await deleteLink(parsed.data.id, userId);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("[deleteLinkAction] DB error:", error);
    return { error: "Failed to delete link. Please try again." };
  }
}
