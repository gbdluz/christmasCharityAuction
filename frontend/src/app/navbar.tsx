import { AddAuctionButton } from "@/components/add-auction-button";
import { SignInButton } from "@/components/sign-in-button";
import Image from "next/image";
import Link from "next/link";
import { DarkModeToggle } from "../components/dark-mode-toggle";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-darkmode.svg"
              alt="logo"
              width={27}
              height={36}
              className="hidden dark:block"
            />
            <Image
              src="/logo-lightmode.svg"
              alt="logo"
              width={27}
              height={36}
              className="block dark:hidden"
            />
            <h1 className="hidden font-serif text-2xl sm:block">
              <span className="hidden md:inline">świąteczna licytacja </span>
              <span className="hidden sm:inline">postDA</span>
            </h1>
          </div>
        </Link>
        <div className="flex gap-2">
          <DarkModeToggle />
          <AddAuctionButton />
          <SignInButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
