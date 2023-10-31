import { DarkModeToggle } from "../components/dark-mode-toggle";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <h1 className="font-serif text-2xl">BidBoom</h1>
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Navbar;
