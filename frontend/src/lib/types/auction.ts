export type Auction = {
  id: number;
  title: string;
  description: string;
  photo: string;
  numOfWinners: number;
  is_paid: boolean;
  is_collected: boolean;
  user: number;

  min_bid_value?: number;
  auction_end_data?: Date;
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
