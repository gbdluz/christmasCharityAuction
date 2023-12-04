import { Auction } from "@/lib/types/auction";
import Link from "next/link";
import BidComponent from "./bid-component";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const AuctionCard = ({ auction }: { auction: Auction }) => {
  return (
    <Link href={`/auction/${auction.id}`}>
      <Card className="grid h-full transition-colors hover:bg-accent">
        <CardHeader className="pb-2">
          <CardTitle className="[text-wrap:balance]">{auction.title}</CardTitle>
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
        </CardHeader>
        <CardContent className="pb-3">
          <CardDescription className="line-clamp-2 whitespace-pre-wrap">
            {auction.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between self-end pb-4">
          {auction.top_bidder_firstname && auction.top_bid_value ? (
            <BidComponent
              bid={{
                bidder_firstname: `🥇 ${auction.top_bidder_firstname}`,
                bidder_lastname: auction.top_bidder_lastname
                  ? auction.top_bidder_lastname
                  : "",
                value: auction.top_bid_value,
                bidder_id: 0, // ask G to add this to the API
              }}
              isWinner={true}
              isUser={false}
            />
          ) : (
            <BidComponent
              bid={{
                bidder_firstname: "Cena wywoławcza:",
                bidder_lastname: "",
                value: auction.min_bid_value ? auction.min_bid_value : 10,
                bidder_id: 0,
              }}
              isWinner={false}
              isUser={false}
            />
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AuctionCard;
