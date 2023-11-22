import { SignInButton } from "@/components/sign-in-button";
import { DarkModeToggle } from "../components/dark-mode-toggle";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <h1 className="font-serif text-2xl">BidBoom</h1>
        <div className="flex gap-2">
          <DarkModeToggle />
          <SignInButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
