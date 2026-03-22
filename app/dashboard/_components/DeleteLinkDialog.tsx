"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Link } from "@/db/schema";
import { deleteLinkAction } from "./actions";

type DeleteLinkDialogProps = {
  link: Link;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteLinkDialog({
  link,
  open,
  onOpenChange,
}: DeleteLinkDialogProps): React.JSX.Element {
  const [isPending, setIsPending] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleDelete = async (): Promise<void> => {
    setIsPending(true);
    setServerError(null);
    const result = await deleteLinkAction({ id: link.id });
    setIsPending(false);
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
          <DialogTitle>Delete short link</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold">/{link.slug}</span>? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash2 className="size-4 mr-2" aria-hidden="true" />
            {isPending ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
