"use client";

import { AuctionWithBids } from "@/lib/types/auction";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import BidsTable from "./bids-table";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

export type Bid = {
  value: number;
  bidder_firstname: string;
  bidder_lastname: string;
  bidder_id: number;
};

const AuctionModal = ({ auction }: { auction: AuctionWithBids }) => {
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
  } = useSWR(`auction/${18}/bids`, fetcher);

  const sortedBids = (bids as Bid[])?.sort((a, b) => b.value - a.value);

  const handleBid = async (bidValue: number | undefined) => {
    if (!bidValue) return;
    await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "bid/",
      headers: { Authorization: "Bearer " + session?.access_token },
      data: { auction_id: 18, value: bidValue },
    });
  };

  const [bidValue, setBidValue] = useState<number | undefined>(undefined);

  // if (isLoading) return <div>Loading...</div>;

  // if (!data) return <div>Failed to load data</div>;

  return (
    <DialogContent className="max-h-full overflow-auto sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="[text-wrap:balance]">
          {auction.title}
        </DialogTitle>
        <p>
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
        </p>
        <DialogDescription className="whitespace-pre-wrap">
          {auction.description}
        </DialogDescription>
      </DialogHeader>
      {auction.min_bid_value ? (
        <p className="text-sm text-muted-foreground">
          Cena wywoławca: {auction.min_bid_value} zł
        </p>
      ) : null}

      <BidsTable bids={sortedBids} numOfWinners={auction.numOfWinners} />

      {auction.user !== session?.user?.pk ? (
        <div className="flex flex-col items-center gap-2">
          <Label htmlFor="bid">Licytuj:</Label>
          <div className="flex items-baseline gap-2">
            <Input
              type="number"
              id="bid"
              placeholder="Wpisz swoją ofertę"
              value={bidValue || ""}
              onChange={(e) => setBidValue(e.target.valueAsNumber)}
              className="pr-1 text-right"
            />
            <span>zł</span>
          </div>
          <Button
            onClick={() => {
              handleBid(bidValue);
            }}
            disabled={
              !bidValue ||
              (auction.min_bid_value &&
                bidValue < auction.min_bid_value + 10) ||
              (bids?.length && bidValue < bids[0].value + 10) ||
              (bids?.length && bids[0].bidder_id === session?.user?.pk)
            }
          >
            Licytuj
          </Button>
        </div>
      ) : null}
    </DialogContent>
  );
};

export default AuctionModal;
