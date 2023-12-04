export type Auction = {
  id: number;
  title: string;
  user: number;
  user_firstname: string;
  user_lastname: string;
  description: string;
  // photo: null;
  num_of_winners: number;
  deadline?: Date;
  min_bid_value?: number;
  auction_end_data?: Date;
  is_paid: boolean; // not used I guess
  is_collected: boolean; // not used I guess
  top_bid_value?: number;
  top_bidder_firstname?: string;
  top_bidder_lastname?: string;
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
