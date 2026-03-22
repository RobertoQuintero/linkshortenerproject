"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
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
import { createLink } from "./actions";

type FormValues = {
  url: string;
  slug: string;
};

export function CreateLinkDialog(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues): Promise<void> => {
    setServerError(null);
    const result = await createLink(data);
    if ("error" in result) {
      setServerError(result.error);
    } else {
      reset();
      setOpen(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean): void => {
    setOpen(nextOpen);
    if (!nextOpen) {
      reset();
      setServerError(null);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4 mr-2" aria-hidden="true" />
        Create Link
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new short link</DialogTitle>
            <DialogDescription>
              Enter the destination URL and choose a short slug (up to 10 characters).
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="url">Destination URL</Label>
              <Input
                id="url"
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
                <p className="text-xs text-destructive">{errors.url.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="slug">Short slug</Label>
              <Input
                id="slug"
                placeholder="my-link"
                {...register("slug", {
                  required: "Slug is required",
                  maxLength: { value: 10, message: "Slug must be 10 characters or fewer" },
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+$/,
                    message: "Only letters, numbers, hyphens, and underscores allowed",
                  },
                })}
              />
              {errors.slug && (
                <p className="text-xs text-destructive">{errors.slug.message}</p>
              )}
            </div>

            {serverError && (
              <p className="text-xs text-destructive">{serverError}</p>
            )}

            <DialogFooter showCloseButton>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating…" : "Create Link"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
