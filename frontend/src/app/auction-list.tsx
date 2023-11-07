import AuctionCard from "@/components/auction-card";
import { mockAuctions } from "@/lib/mock-data/auction";

const AuctionList = () => {
  return (
    <div>
      <h1>Auction List</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockAuctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
