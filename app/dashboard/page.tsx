import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/data/links";
import { CreateLinkDialog } from "./_components/CreateLinkDialog";
import { LinkCard } from "./_components/LinkCard";

export default async function DashboardPage(): Promise<React.JSX.Element> {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const links = await getLinksByUserId(userId);

  return (
    <main className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Links</h1>
        <CreateLinkDialog />
      </div>
      {links.length === 0 ? (
        <p className="text-muted-foreground">You have no links yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {links.map((link) => (
            <li key={link.id}>
              <LinkCard link={link} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
