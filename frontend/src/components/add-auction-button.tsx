"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AddAuctionButton() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      {session ? (
        <>
          <Button
            variant="outline"
            className="hidden gap-2 sm:flex"
            size="default"
            title="Utwórz aukcję"
            onClick={() => router.push("/auction/add")}
          >
            <Plus className="h-5 w-5" />
            <span>Utwórz aukcję</span>
          </Button>
          <Button
            variant="outline"
            className="sm:hidden"
            size="icon"
            title="Utwórz aukcję"
            onClick={() => router.push("/auction/add")}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </>
      ) : null}
    </>
  );
}
