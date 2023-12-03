export type Auction = {
  id: number;
  title: string;
  description: string;
  photo: string;
  num_of_winners: number;
  is_paid: boolean;
  is_collected: boolean;
  user: number;
  user_firstname: string;
  user_lastname: string;

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
