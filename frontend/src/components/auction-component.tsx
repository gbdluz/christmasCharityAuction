"use client";

import { Auction } from "@/lib/types/auction";
import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import BidsSection from "./bids-section";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export type Bid = {
  value: number;
  bidder_firstname: string;
  bidder_lastname: string;
  bidder_id: number;
};

const AuctionComponent = ({ auction }: { auction: Auction }) => {
  const { data: session } = useSession({ required: true });

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
    <div className="flex max-w-lg flex-col items-stretch gap-2">
      <h1 className="text-center text-2xl font-bold [text-wrap:balance]">
        {auction.title}
      </h1>
      <div className="text-center">
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
        <br />
        liczba zwycięzców: {auction.num_of_winners}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Opis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap">{auction.description}</div>
        </CardContent>
      </Card>

      <BidsSection
        auction={auction}
        bids={sortedBids}
        numOfWinners={auction.num_of_winners}
        session={session}
        mutate={mutate}
      />
    </div>
  );
};

export default AuctionComponent;
