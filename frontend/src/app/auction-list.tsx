"use client";

import AuctionCard from "@/components/auction-card";
import AuctionsFilter from "@/components/auctions-filter";
import { Loader } from "@/components/loader";
import { Auction } from "@/lib/types/auction";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { useBiddingAuctions, useWinningAuctions } from "./swr/use-auctions";

export enum AuctionsFilterOptions {
  My = "my",
  All = "all",
  Bid = "bid",
}

const AuctionList = () => {
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState<AuctionsFilterOptions>(
    AuctionsFilterOptions.All,
  );

  const auctionsFetcher = (url: string) =>
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
        headers: { Authorization: "Bearer " + session?.access_token },
      })
      .then((res) => res.data);

  const {
    data: auctions,
    error,
    isLoading,
  } = useSWR<Auction[]>(`auction/list`, auctionsFetcher);

  const { biddingAuctions: biddingAuctions } = useBiddingAuctions(
    session?.access_token || "",
  );

  const { winningAuctions } = useWinningAuctions(session?.access_token || "");

  if (isLoading) return <Loader />;

  if (!auctions) return <div>Failed to load data</div>;

  if (auctions.length === 0)
    return (
      <div className="text-center">
        Ups! Lista aukcji jest pusta… Może chcesz{" "}
        <Link
          href="/auction/add"
          className="underline underline-offset-4 hover:opacity-90"
        >
          dodać jakąś aukcję
        </Link>
        ? 😉
      </div>
    );

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full justify-center md:justify-start">
        <AuctionsFilter setSelectedOption={setSelectedOption} />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {auctions
          .sort((a, b) => b.id - a.id)
          .filter((auction) => {
            if (selectedOption === AuctionsFilterOptions.My) {
              return auction.user === session?.user?.pk;
            } else if (selectedOption === AuctionsFilterOptions.Bid) {
              return biddingAuctions?.auctions?.includes(auction.id);
            } else {
              return true;
            }
          })
          .map((auction) => {
            return (
              <AuctionCard
                key={auction.id}
                auction={auction}
                isBidding={
                  !!biddingAuctions?.auctions.find((a) => a === auction.id)
                }
                isWinning={
                  !!winningAuctions?.auctions.find((a) => a === auction.id)
                }
                userId={session?.user?.pk}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AuctionList;
