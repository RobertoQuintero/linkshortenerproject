"use client";

import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Link } from "@/db/schema";
import { EditLinkDialog } from "./EditLinkDialog";
import { DeleteLinkDialog } from "./DeleteLinkDialog";

type LinkCardProps = {
  link: Link;
};

export function LinkCard({ link }: LinkCardProps): React.JSX.Element {
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <CardTitle>{link.slug}</CardTitle>
              <CardDescription className="truncate">{link.url}</CardDescription>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon"
                aria-label={`Edit link ${link.slug}`}
                onClick={() => setEditOpen(true)}
              >
                <Pencil className="size-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label={`Delete link ${link.slug}`}
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Created: {new Date(link.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      <EditLinkDialog link={link} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteLinkDialog link={link} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </>
  );
}
