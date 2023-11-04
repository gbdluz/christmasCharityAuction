import { AuctionWithBids } from "@/lib/types/auction";
import Image from "next/image";
import AuctionModal from "./auction-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dialog, DialogTrigger } from "./ui/dialog";

const AuctionCard = ({ auction }: { auction: AuctionWithBids }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild className="cursor-pointer">
          <Card className="transition-colors hover:bg-accent">
            <CardHeader>
              <CardTitle>{auction.title}</CardTitle>
              <CardDescription>{auction.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={auction.photo}
                alt={auction.title}
                width={100}
                height={100}
              />
              <div>
                Current bid:{" "}
                {auction.bids.length
                  ? auction.bids[0].price
                  : auction.startPrice
                  ? auction.startPrice
                  : 0}
              </div>
            </CardContent>
            <CardFooter>
              <div>Ends in: {auction.endDate?.toString()}</div>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <AuctionModal auction={auction} />
      </Dialog>
    </>
  );
};

export default AuctionCard;
