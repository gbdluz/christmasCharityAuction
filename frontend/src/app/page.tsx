import AuctionList from "./auction-list";

export default function Home() {
  return (
    <main className="container flex flex-col items-center justify-between gap-4 p-4">
      <AuctionList />
    </main>
  );
}
