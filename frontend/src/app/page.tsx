"use client";

import AuctionsStats from "@/components/auctions-stats";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signIn, useSession } from "next-auth/react";
import AuctionList from "./auction-list";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated")
    return (
      <div className="p-4 text-center">
        <Button
          variant="link"
          onClick={() => signIn("discord", { callbackUrl: "/" })}
          title="Zaloguj się"
        >
          <span>Zaloguj się, aby wziąć udział w licytacjach</span>
        </Button>
      </div>
    );

  return (
    <main className="container flex flex-col items-center justify-between gap-4 p-4">
      <h1 className="text-3xl font-bold">
        Cześć, {session?.user?.username}! 👋
      </h1>
      <p className="text-xl">
        Witamy Cię w aplikacji licytacyjnej postDA 2023 💒
      </p>
      <p className="text-xl">
        W tym roku zbieramy fundusze na{" "}
        <a
          className="text-primary underline underline-offset-4"
          href="https://www.siepomaga.pl/wchzws"
        >
          Wspólnotę Chleb Życia
        </a>{" "}
        🥖❤️
      </p>
      {/* <p className="text-xl">
        Jeśli macie pomysły na funkcję dla tej aplikacji, możecie je zgłaszać{" "}
        <a
          className="text-primary underline underline-offset-4 hover:opacity-90"
          href="https://docs.google.com/spreadsheets/d/1--VJbmBm0jpUfjtOI5xoTe6dhMpyXNLKB9u9wRiWii0/edit?usp=sharing"
        >
          tutaj
        </a>{" "}
        💡👨‍💻
      </p> */}
      <AuctionsStats />
      <Separator />
      <AuctionList />
    </main>
  );
}
