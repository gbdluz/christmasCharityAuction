import AuctionList from "./auction-list";

export default function Home() {
  return (
    <main className="flex flex-col items-center container justify-between gap-4 p-4">
      <div>This is our auctions list page:</div>
      <AuctionList />
    </main>
  );
}
