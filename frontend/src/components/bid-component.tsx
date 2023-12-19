import { Bid } from "./auction-component";
import { Badge } from "./ui/badge";

type props = {
  bid: Bid;
  isWinner: boolean;
  isUser?: boolean;
};

const BidComponent = ({ bid, isWinner, isUser }: props) => {
  return (
    <div className="flex w-full items-center justify-between gap-5">
      <div
        className={`${isWinner ? "font-bold" : "font-normal"} ${
          isUser ? "underline" : ""
        }`}
      >
        {bid.bidder_firstname} {bid.bidder_lastname}
      </div>
      <Badge
        variant={isWinner ? "defaultNoHover" : "outline"}
        className="whitespace-nowrap"
      >
        {bid.value.toLocaleString("pl")} zł
      </Badge>
    </div>
  );
};

export default BidComponent;
