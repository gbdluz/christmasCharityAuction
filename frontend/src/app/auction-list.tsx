"use client";

import AuctionCard from "@/components/auction-card";
import { ComboboxDemo } from "@/components/auction-search";
import { mockAuctions } from "@/lib/mock-data/auction";
import { SORTBY } from "@/lib/types/sortby";
import { useState } from "react";

const AuctionList = () => {
  const [value, setValue] = useState(SORTBY.NEWEST);
  const filteredAuctions = [...mockAuctions].sort((a, b) => {
    switch (value) {
      case SORTBY.CHEAPEST:
        return (
          a.bids[a.bids.length - 1]?.price - b.bids[b.bids.length - 1]?.price
        );
      case SORTBY.MOSTEPXENSIVE:
        return (
          b.bids[b.bids.length - 1]?.price - a.bids[a.bids.length - 1]?.price
        );
      case SORTBY.NEWEST:
        return a.bids[0]?.date.getTime() - b.bids[0]?.date.getTime();
      case SORTBY.OLDEST:
        return b.bids[0]?.date.getTime() - a.bids[0]?.date.getTime();
      default:
        return 0;
    }
  });
  return (
    <div>
      <h1 className="text-center">Auction List</h1>
      <ComboboxDemo value={value} setValue={setValue} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAuctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
