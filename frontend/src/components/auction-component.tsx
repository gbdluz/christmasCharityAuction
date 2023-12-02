"use client";

import { Auction as AuctionComponent } from "@/lib/types/auction";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import BidsTable from "./bids-table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export type Bid = {
  value: number;
  bidder_firstname: string;
  bidder_lastname: string;
  bidder_id: number;
};

const AuctionComponent = ({ auction }: { auction: AuctionComponent }) => {
  const { data: session } = useSession();

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

  const handleBid = async (bidValue: number | undefined) => {
    if (!bidValue) return;
    await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "bid/",
      headers: { Authorization: "Bearer " + session?.access_token },
      data: { auction_id: auction.id, value: bidValue },
    });
    mutate();
  };

  const calcMinNewBidValue = () => {
    if (!auction.min_bid_value) return 10;
    if (!sortedBids?.length) return auction.min_bid_value;
    return sortedBids[0].value + 10;
  };

  const minNewBidValue = calcMinNewBidValue();

  console.log("minNewBidValue", minNewBidValue);
  console.log("sortedBids", sortedBids);

  const [bidValue, setBidValue] = useState<number>(minNewBidValue);

  // if (isLoading) return <div>Loading...</div>;

  // if (!data) return <div>Failed to load data</div>;

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
      

      {auction.min_bid_value ? (
        <p className="text-sm text-muted-foreground">
          Cena wywoławcza: {auction.min_bid_value} zł
        </p>
      ) : null}

      <Separator />

      <BidsTable bids={sortedBids} numOfWinners={auction.numOfWinners} />

      <Separator />

      {auction.user !== session?.user?.pk ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-2">
          <Label htmlFor="bid">Twoja oferta:</Label>
          <div className="flex items-baseline gap-2">
            <Input
              type="number"
              id="bid"
              value={bidValue || ""}
              onChange={(e) => setBidValue(e.target.valueAsNumber)}
              className="pr-1 text-right w-28"
            />
            <span>zł</span>
          </div></div>
          <Button
            onClick={() => {
              handleBid(bidValue);
            }}
            disabled={
              !bidValue ||
              bidValue < minNewBidValue ||
              (bids?.length && bids[0].bidder_id === session?.user?.pk)
            }
          >
            Licytuj
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default AuctionComponent;
