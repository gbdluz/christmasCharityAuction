import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bid } from "./auction-modal";

const BidsTable = ({
  bids,
  numOfWinners,
}: {
  bids: Bid[];
  numOfWinners: number;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Licytujący</TableHead>
          <TableHead className="w-24 text-right">Oferta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(bids ? bids : []).map((bid, index) => {
          const isWinner = index < numOfWinners;
          return (
            <TableRow key={bid.value}>
              <TableCell
                className={`font-medium ${isWinner ? "font-bold" : ""}`}
              >
                {bid.bidder_firstname} {bid.bidder_lastname}
              </TableCell>
              <TableCell
                className={`text-right ${isWinner ? "font-bold" : ""}`}
              >
                {bid.value.toLocaleString("pl")} zł
              </TableCell>
            </TableRow>
          );
        })}
        <TableCaption>Na razie nie ma licytujących</TableCaption>
      </TableBody>
    </Table>
  );
};

export default BidsTable;
