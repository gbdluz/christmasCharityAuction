import axios from "axios";
import useSWR from "swr";

export function useAuctions(accessToken: string) {
  const fetcher = ([url, accessToken]: [string, string]) =>
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => res.data);

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    [`auction/list`, accessToken],
    fetcher,
  );

  return {
    auctions: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
}

export function useBiddingAuctions(accessToken: string) {
  const biddingAuctionsFetcher = (url: string) =>
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => res.data);

  const { data } = useSWR<{ auctions: number[] }>(
    `user/bid_auctions/all`,
    biddingAuctionsFetcher,
  );

  return {
    biddingAuctions: data,
  };
}

export function useWinningAuctions(accessToken: string) {
  const winningAuctionsFetcher = (url: string) =>
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => res.data);

  const { data } = useSWR<{ auctions: number[] }>(
    `user/bid_auctions/winning`,
    winningAuctionsFetcher,
  );

  return {
    winningAuctions: data,
  };
}
