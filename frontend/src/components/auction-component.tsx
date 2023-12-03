"use client";

import { Auction as AuctionComponent } from "@/lib/types/auction";
import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import BidsSection from "./bids-section";
import { Separator } from "./ui/separator";

export type Bid = {
  value: number;
  bidder_firstname: string;
  bidder_lastname: string;
  bidder_id: number;
};

const AuctionComponent = ({ auction }: { auction: AuctionComponent }) => {
  const { data: session } = useSession({required:true});

  const fetcher = (url: string) =>
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
        headers: { Authorization: "Bearer " + session?.access_token },
      })
      .then((res) => res.data);

  const {
    data: bids,
    error,
    isLoading,
    mutate,
  } = useSWR(`auction/${auction.id}/bids`, fetcher);

  const sortedBids = (bids as Bid[])?.sort((a, b) => b.value - a.value);

  return (
    <div className="max-w-lg flex flex-col items-center gap-2">
      <h1 className="[text-wrap:balance] font-bold text-2xl">
        {auction.title}
      </h1>
      <div >
        <span className="italic">
          {auction.user_firstname}
          {auction.user_lastname ? ` ${auction.user_lastname}` : ""}
        </span>{" "}
        • do{" "}
        {auction.auction_end_data
          ? new Date(auction.auction_end_data).toLocaleString("pl-PL", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })
          : ""}
      </div>

      <div className="whitespace-pre-wrap my-2">
        {auction.description}
      </div>
      
      <Separator />

      {auction.min_bid_value ? (
        <p className="text-sm text-muted-foreground">
          Cena wywoławcza: {auction.min_bid_value} zł
        </p>
      ) : null}

      <BidsSection auction={auction} bids={sortedBids} numOfWinners={auction.num_of_winners} session={session} mutate={mutate} />
    </div>
  );
};

export default AuctionComponent;
