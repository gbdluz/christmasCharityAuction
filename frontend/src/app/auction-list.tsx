"use client";

import AuctionCard from "@/components/auction-card";
import { ComboboxDemo } from "@/components/auction-search";
import { Input } from "@/components/ui/input";
import { mockAuctions } from "@/lib/mock-data/auction";
import { Auction } from "@/lib/types/auction";
import { SORTBY } from "@/lib/types/sortby";
import { useState } from "react";

const AuctionList = () => {
  const [value, setValue] = useState(SORTBY.NEWEST);
  const [searchInput, setSearchinput] = useState("");
  const filteredAuctions = [...mockAuctions]
    .sort((a, b) => {
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
    })
    .filter((auction) => checkSearchInput(searchInput, auction));
  return (
    <div>
      <h1 className="text-center">Auction List</h1>
      <ComboboxDemo value={value} setValue={setValue} />
      <div className="flex justify-center">
        <Input
          value={searchInput}
          onChange={(e) => setSearchinput(e.target.value)}
          className="my-8 block w-[200px]"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAuctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </div>
  );
};

export default AuctionList;

const checkSearchInput = (input: string, auction: Auction) => {
  if (input.length === 0) {
    return true;
  }
  // we are checking title and description
  const { title } = auction;
  const { description } = auction;

  const engInput = replacePolishLetter(input);
  const engTitle = replacePolishLetter(title);
  const engDescription = replacePolishLetter(description);

  return engInput.every(
    (wordI) =>
      engTitle.some(
        (wordName) =>
          wordName.slice(0, wordI.length).toLocaleLowerCase() ===
          wordI.slice(0, wordI.length).toLocaleLowerCase(),
      ) ||
      engDescription.some(
        (wordName) =>
          wordName.slice(0, wordI.length).toLocaleLowerCase() ===
          wordI.slice(0, wordI.length).toLocaleLowerCase(),
      ),
  );
};

const replacePolishLetter = (polishWord: string) =>
  polishWord
    .split("")
    .map((letter) => {
      switch (letter) {
        case "ą":
          return "a";
        case "ć":
          return "c";
        case "ę":
          return "e";
        case "ł":
          return "l";
        case "ó":
          return "o";
        case "ś":
          return "s";
        case "ż":
          return "z";
        case "ź":
          return "z";
        default:
          return letter;
      }
    })
    .join("")
    .split(" ");
