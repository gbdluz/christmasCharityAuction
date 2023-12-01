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
              <CardTitle className="[text-wrap:balance]">
                {auction.title}
              </CardTitle>
              <p>
                <span className="italic">{auction.user}</span> • do{" "}
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
        </DialogTrigger>
        <AuctionModal auction={auction} />
      </Dialog>
    </>
  );
};

export default AuctionCard;
