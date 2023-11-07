export type Auction = {
  id: number;
  title: string;
  description: string;
  photo: string;
  numOfWinners: number;
  isPaid: boolean;
  isCollected: boolean;

  startPrice?: number;
  endDate?: Date;
  deadline?: Date;
};

export type AuctionWithBids = Auction & {
  bids: Bid[];
};

export type Bid = {
  id: number;
  auctionId: number;
  userId: number;
  price: number;
  date: Date;
};
