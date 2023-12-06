"use client";

import { useAuctions } from "@/app/swr/use-auctions";
import AuctionComponent from "@/components/auction-component";
import { Loader } from "@/components/loader";
import { Auction } from "@/lib/types/auction";
import { useSession } from "next-auth/react";

export default function AuctionPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession({ required: true });

  const { auctions, isError, isLoading } = useAuctions(
    session?.access_token ? session?.access_token : "",
  );

  const auctions2 = auctions as Auction[];

  const soughtAuction =
    auctions2 &&
    auctions2.find((auction) => auction.id === parseInt(params.id));

  if (status === "loading" || isLoading) return <Loader />;

  return (
    <main className="container flex flex-col items-center justify-between gap-4 p-4">
      {soughtAuction ? (
        <AuctionComponent auction={soughtAuction} />
      ) : (
        <div>Failed to load data</div>
      )}
    </main>
  );
}
