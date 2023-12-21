"use client";

import { AuctionsFilterOptions } from "@/app/auction-list";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const AuctionsFilter = ({
  setSelectedOption: onChange,
}: {
  setSelectedOption: (value: AuctionsFilterOptions) => void;
}) => {
  return (
    <Tabs defaultValue="all" className="justify-center">
      <TabsList className="flex justify-center">
        <TabsTrigger
          value={AuctionsFilterOptions.All}
          onClick={() => {
            onChange(AuctionsFilterOptions.All);
          }}
        >
          Wszystkie
        </TabsTrigger>
        <TabsTrigger
          value={AuctionsFilterOptions.My}
          onClick={() => {
            onChange(AuctionsFilterOptions.My);
          }}
        >
          Oferuję
        </TabsTrigger>
        <TabsTrigger
          value={AuctionsFilterOptions.Bid}
          onClick={() => {
            onChange(AuctionsFilterOptions.Bid);
          }}
        >
          Licytuję
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AuctionsFilter;
