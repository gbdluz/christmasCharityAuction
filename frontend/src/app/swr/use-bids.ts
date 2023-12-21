import { Bid } from "@/components/auction-component";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string, accessToken: string) =>
  axios
    .get(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
      headers: { Authorization: "Bearer " + accessToken },
    })
    .then((res) => res.data);

export function useBids(accessToken: string, auctionId: number) {
  const { data } = useSWR<{ bids: Bid[] }>(`auction/${auctionId}/bids`, () =>
    fetcher(`auction/${auctionId}/bids`, accessToken),
  );

  return {
    bids: data,
  };
}

export function useBidsForMultipleAuctions(
  accessToken: string,
  auctionIds: number[],
) {
  function multiFetcher(urls: string[], accessToken: string) {
    return Promise.all(urls.map((url) => fetcher(url, accessToken)));
  }

  const { data } = useSWR<Bid[][]>(
    auctionIds.map((id) => `auction/${id}/bids`),
    () =>
      multiFetcher(
        auctionIds.map((id) => `auction/${id}/bids`),
        accessToken,
      ),
  );

  return {
    auctionsBids: data,
  };
}
