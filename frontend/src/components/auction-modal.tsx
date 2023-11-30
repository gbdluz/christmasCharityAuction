import { AuctionWithBids } from "@/lib/types/auction";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const AuctionModal = ({ auction }: { auction: AuctionWithBids }) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{auction.title}</DialogTitle>
        <DialogDescription>{auction.description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AuctionModal;
