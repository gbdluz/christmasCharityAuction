"use client";

import { useSession } from "next-auth/react";
import AuctionList from "./auction-list";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Unauthenticated</div>;

  return (
    <main className="container flex flex-col items-center justify-between gap-4 p-4">
      <AuctionList />
    </main>
  );
}
