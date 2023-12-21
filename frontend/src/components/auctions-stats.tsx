"use client";

import { useAuctions, useWinningAuctions } from "@/app/swr/use-auctions";
import { useBidsForMultipleAuctions } from "@/app/swr/use-bids";
import { Auction } from "@/lib/types/auction";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import { Card } from "./ui/card";

const AuctionsStats = () => {
  const { data: session } = useSession();
  const [value, setValue] = useState(0);

  // my auctions bids
  const { auctions } = useAuctions(
    session?.access_token ? session?.access_token : "",
  );

  const myAuctions = (auctions as Auction[])?.filter(
    (auction) => auction.user === session?.user?.pk,
  );

  const { auctionsBids: myAuctionsBids } = useBidsForMultipleAuctions(
    session?.access_token || "",
    myAuctions ? myAuctions.map((auction) => auction.id) : [],
  );

  console.log(myAuctionsBids);

  const myAuctionsWinningBidsValue = myAuctionsBids?.reduce(
    (acc, curr, index) => {
      const numOfWinners = myAuctions[index].num_of_winners;
      const winningBids = curr
        .sort((a, b) => b.value - a.value)
        .slice(0, numOfWinners);
      const sumOfWinningBids = winningBids.reduce(
        (acc, curr) => acc + curr.value,
        0,
      );
      return acc + sumOfWinningBids;
    },
    0,
  );

  // my winning bids
  const { winningAuctions } = useWinningAuctions(session?.access_token || "");

  const { auctionsBids: auctionsWithMyWinningBids } =
    useBidsForMultipleAuctions(
      session?.access_token || "",
      winningAuctions ? winningAuctions.auctions : [],
    );

  const myWinningBidsValue = auctionsWithMyWinningBids?.reduce((acc, curr) => {
    const myBid = curr.find((bid) => bid.bidder_id === session?.user?.pk);
    return myBid ? acc + myBid.value : acc;
  }, 0);

  // all winning bids
  const sumOfWinningBidsFetcher = (url: string) =>
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
        headers: { Authorization: "Bearer " + session?.access_token },
      })
      .then((res) => res.data.sum);

  const { data: sumOfWinningBids, isLoading } = useSWR<number>(
    `auction/sum_of_winning_bids`,
    sumOfWinningBidsFetcher,
  );

  if (sumOfWinningBids && sumOfWinningBids !== value) {
    console.log(sumOfWinningBids);
    setValue(sumOfWinningBids);
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {winningAuctions?.auctions && winningAuctions?.auctions.length > 0 ? (
        <>
          {" "}
          <Card className="w-72 bg-muted text-center">
            <div className="m-6">
              <div>
                Wygrywasz w{" "}
                <span className="font-bold">
                  {winningAuctions?.auctions.length}
                </span>
                <span>
                  {" "}
                  {new Intl.PluralRules("pl").select(
                    winningAuctions?.auctions.length,
                  ) === "few"
                    ? "aukcjach"
                    : "aukcji"}
                </span>
                <span>, za:</span>
              </div>
              <div className="text-4xl font-bold">
                {myWinningBidsValue
                  ? myWinningBidsValue.toLocaleString("pl", {
                      style: "currency",
                      currency: "PLN",
                      minimumFractionDigits: 0,
                    })
                  : 0}
              </div>
            </div>
          </Card>
        </>
      ) : null}

      {myAuctions?.length > 0 ? (
        <>
          <Card className="w-72 bg-muted text-center">
            <div className="m-6">
              <div>
                Oferujesz{" "}
                <span className="font-bold">{myAuctions?.length}</span>
                <span>
                  {" "}
                  {new Intl.PluralRules("pl").select(myAuctions?.length) ===
                  "few"
                    ? "aukcje"
                    : new Intl.PluralRules("pl").select(myAuctions?.length) ===
                      "one"
                    ? "aukcję"
                    : "aukcji"}
                </span>
                <span>, za:</span>
              </div>
              <div className="text-4xl font-bold">
                {myAuctionsWinningBidsValue
                  ? myAuctionsWinningBidsValue.toLocaleString("pl", {
                      style: "currency",
                      currency: "PLN",
                      minimumFractionDigits: 0,
                    })
                  : 0}
              </div>
            </div>
          </Card>
        </>
      ) : null}

      <Card className="w-72 bg-muted text-center">
        <div className="m-6">
          <div>W sumie zebraliśmy:</div>
          <div className="text-4xl font-bold">
            {!isLoading
              ? value.toLocaleString("pl", {
                  style: "currency",
                  currency: "PLN",
                  minimumFractionDigits: 0,
                })
              : "..."}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuctionsStats;
