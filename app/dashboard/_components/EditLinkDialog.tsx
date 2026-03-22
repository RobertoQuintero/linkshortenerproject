"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Link } from "@/db/schema";
import { editLink } from "./actions";

type FormValues = {
  url: string;
  slug: string;
};

type EditLinkDialogProps = {
  link: Link;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditLinkDialog({
  link,
  open,
  onOpenChange,
}: EditLinkDialogProps): React.JSX.Element {
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { url: link.url, slug: link.slug },
  });

  React.useEffect(() => {
    if (open) {
      reset({ url: link.url, slug: link.slug });
      setServerError(null);
    }
  }, [open, link.url, link.slug, reset]);

  const onSubmit = async (data: FormValues): Promise<void> => {
    setServerError(null);
    const result = await editLink({ id: link.id, url: data.url, slug: data.slug });
    if ("error" in result) {
      setServerError(result.error);
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit short link</DialogTitle>
          <DialogDescription>
            Update the destination URL or the slug for this link.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-url">Destination URL</Label>
            <Input
              id="edit-url"
              type="url"
              placeholder="https://example.com"
              {...register("url", {
                required: "URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Please enter a valid URL",
                },
              })}
            />
            {errors.url && (
              <p className="text-sm text-destructive">{errors.url.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-slug">Slug</Label>
            <Input
              id="edit-slug"
              type="text"
              placeholder="my-link"
              maxLength={10}
              {...register("slug", {
                required: "Slug is required",
                maxLength: { value: 10, message: "Slug must be 10 characters or fewer" },
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message: "Slug may only contain letters, numbers, hyphens, and underscores",
                },
              })}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
          </div>

          {serverError && (
            <p className="text-sm text-destructive">{serverError}</p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Pencil className="size-4 mr-2" aria-hidden="true" />
              {isSubmitting ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
