"use client";

import { useAuctions } from "@/app/swr/use-auctions";
import { Auction } from "@/lib/types/auction";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import useSWR from "swr";
import BidsSection from "./bids-section";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export type Bid = {
  value: number;
  bidder_firstname: string;
  bidder_lastname: string;
  bidder_id: number;
};

const AuctionComponent = ({ auction }: { auction: Auction }) => {
  const { data: session } = useSession({ required: true });

  const fetcher = (url: string) =>
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
        headers: { Authorization: "Bearer " + session?.access_token },
      })
      .then((res) => res.data);

  const {
    data: bids,
    error,
    isLoading,
    mutate,
  } = useSWR(`auction/${auction.id}/bids`, fetcher);

  const { mutate: mutateAuctions, isValidating } = useAuctions(
    session?.access_token ? session?.access_token : "",
  );

  const ref = useRef<HTMLDivElement>(null);
  const [initialEditHeight, setInitialEditHeight] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState(auction.description);

  const sortedBids = (bids as Bid[])?.sort((a, b) => b.value - a.value);

  const isUserCreator = session?.user?.pk === auction.user;

  return (
    <div className="flex w-full max-w-lg flex-col items-stretch gap-2">
      <h1 className="text-center text-2xl font-bold [text-wrap:balance]">
        {auction.title}
      </h1>
      <div className="text-center">
        <span className="italic">
          {auction.user_firstname}
          {auction.user_lastname ? ` ${auction.user_lastname}` : ""}
        </span>{" "}
        • do{" "}
        {auction.auction_end_data
          ? new Date(auction.auction_end_data).toLocaleString("pl-PL", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })
          : ""}
        <br />
        liczba zwycięzców: {auction.num_of_winners}
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pt-5">
          <CardTitle>Opis</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditMode ? (
            <textarea
              className="mb-[-7px] w-full whitespace-pre-wrap"
              autoFocus
              style={{ height: initialEditHeight }}
              onChange={(e) => {
                setDescription(e.currentTarget.value);
              }}
              value={description}
            ></textarea>
          ) : (
            <div className="whitespace-pre-wrap" ref={ref}>
              {isValidating ? description : auction.description}
            </div>
          )}
        </CardContent>
        {isUserCreator && (
          <CardFooter className="flex justify-between">
            {isEditMode ? (
              <>
                <Button
                  className="flex gap-2"
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => {
                    setIsEditMode(!isEditMode);
                  }}
                >
                  <span>Anuluj</span>
                </Button>
                <Button
                  className="flex gap-2 justify-self-end"
                  size={"sm"}
                  onClick={async () => {
                    axios({
                      method: "patch",
                      url:
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        `auction/${auction.id}/`,
                      headers: {
                        Authorization: "Bearer " + session?.access_token,
                      },
                      data: {
                        description: description,
                      },
                    });
                    mutateAuctions();
                    setIsEditMode(!isEditMode);
                  }}
                >
                  <span>Zapisz</span>
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="flex w-full gap-2"
                size={"sm"}
                onClick={() => {
                  setInitialEditHeight(
                    ref.current?.clientHeight ? ref.current.clientHeight : 0,
                  );
                  setIsEditMode(!isEditMode);
                }}
              >
                <Pencil className="h-4 w-4" />
                <span>{isEditMode ? "Zapisz" : "Edytuj"}</span>
              </Button>
            )}
          </CardFooter>
        )}
      </Card>

      <BidsSection
        auction={auction}
        bids={sortedBids}
        areBidsLoading={isLoading}
        numOfWinners={auction.num_of_winners}
        session={session}
        mutate={mutate}
      />
    </div>
  );
};

export default AuctionComponent;
