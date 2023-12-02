import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bid } from "./auction-component";

const BidsTable = ({
  bids,
  numOfWinners,
}: {
  bids: Bid[];
  numOfWinners: number;
}) => {
  return (
    <div className="flex flex-col items-center">
      {!bids || !bids.length ? (
        <p className="text-sm text-muted-foreground">
          Na razie nie ma licytujących
        </p>
      ) : (
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
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BidsTable;
