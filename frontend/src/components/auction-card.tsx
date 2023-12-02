import { Auction } from "@/lib/types/auction";
import Link from "next/link";
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
      <Card className="h-full transition-colors hover:bg-accent">
        <CardHeader>
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
        <CardContent>
          <CardDescription className="line-clamp-3 whitespace-pre-wrap">
            {auction.description}
          </CardDescription>
        </CardContent>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </Link>
  );
};

export default AuctionCard;
