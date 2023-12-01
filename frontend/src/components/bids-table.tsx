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
        {(bids ? bids : []).map((bid, index) => (
          <TableRow key={bid.value}>
            <TableCell className="font-medium">
              {bid.bidder_firstname} {bid.bidder_lastname}
            </TableCell>
            <TableCell className="text-right">
              {bid.value.toLocaleString("pl")} zł
            </TableCell>
          </TableRow>
        ))}
        {/* <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  );
};

export default BidsTable;
