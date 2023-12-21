"use client";

import { Auction } from "@/lib/types/auction";
import axios from "axios";
import { Session } from "next-auth";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { Bid } from "./auction-component";
import BidComponent from "./bid-component";
import { Loader } from "./loader";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const BidsSection = ({
  auction,
  bids,
  areBidsLoading,
  numOfWinners,
  session,
  mutate,
}: {
  auction: Auction;
  bids: Bid[];
  areBidsLoading: boolean;
  numOfWinners: number;
  session?: Session | null;
  mutate: KeyedMutator<any>;
}) => {
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

  const minNewBidValue = auction.top_bid_value
    ? auction.top_bid_value + 10
    : auction.min_bid_value
    ? auction.min_bid_value
    : 10;

  const [bidValue, setBidValue] = useState<number>(minNewBidValue);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Oferty</CardTitle>
        <CardDescription>
          {auction.min_bid_value ? (
            <span className="text-sm text-muted-foreground">
              Cena wywoławcza: {auction.min_bid_value} zł
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">
              Brak ceny wywoławczej
            </span>
          )}
        </CardDescription>
      </CardHeader>

      {areBidsLoading ? (
        <Loader />
      ) : (
        <>
          <CardContent>
            <div className="flex flex-col items-center gap-3">
              {!bids || !bids.length ? (
                <p className="text-sm text-muted-foreground">
                  Na razie nie ma licytujących
                </p>
              ) : (
                (bids ? bids : []).map((bid, index) => {
                  const isWinner = index < numOfWinners;
                  const isUser = bid.bidder_id === session?.user?.pk;

                  return (
                    <BidComponent
                      bid={bid}
                      isWinner={isWinner}
                      isUser={isUser}
                      key={index}
                    />
                  );
                })
              )}
            </div>
          </CardContent>

          {auction.user !== session?.user?.pk ? (
            <CardFooter className="border-t pt-3">
              <div className="flex w-full flex-col items-center gap-2">
                <div className="flex items-baseline gap-2">
                  <Label htmlFor="bid">Twoja oferta:</Label>
                  <div className="flex items-baseline gap-2">
                    <Input
                      type="number"
                      id="bid"
                      value={bidValue || ""}
                      onChange={(e) => setBidValue(e.target.valueAsNumber)}
                      className="w-28 pr-1 text-right"
                    />
                    <span>zł</span>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    handleBid(bidValue);
                  }}
                  disabled={
                    !bidValue ||
                    bidValue < minNewBidValue ||
                    (bids?.length > 0 &&
                      bids[0].bidder_id === session?.user?.pk)
                  }
                >
                  Licytuj
                </Button>
              </div>
            </CardFooter>
          ) : null}
        </>
      )}
    </Card>
  );
};

export default BidsSection;
