import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Transaction Data
function createTransactionData(
  id: number,
  date: string,
  transactionType: string,
  txID: string,
  fromAddress: string,
  amount: number
) {
  return { id, date, transactionType, txID, fromAddress, amount };
}

const transactions = [
  createTransactionData(
    0,
    "16 Mar, 2023",
    "Deposit",
    "TXID123456789",
    "SOL_abcdefghij1",
    3.44
  ),
  createTransactionData(
    1,
    "17 Mar, 2023",
    "Withdrawal",
    "TXID123456788",
    "SOL_abcdefghij2",
    0.99
  ),
  createTransactionData(
    2,
    "18 Mar, 2023",
    "Deposit",
    "TXID123456787",
    "SOL_abcdefghij3",
    4.81
  ),
  createTransactionData(
    3,
    "19 Mar, 2023",
    "Withdrawal",
    "TXID123456786",
    "SOL_abcdefghij4",
    1.39
  ),
  createTransactionData(
    4,
    "20 Mar, 2023",
    "Deposit",
    "TXID123456785",
    "SOL_abcdefghij5",
    2.79
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const Orders: React.FC = () => (
  <React.Fragment>
    <Title>Recent Transactions</Title>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Transaction Type</TableCell>
          <TableCell>TxID</TableCell>
          <TableCell>From Address</TableCell>
          <TableCell align="right">Amount (SOL)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.transactionType}</TableCell>
            <TableCell>{transaction.txID}</TableCell>
            <TableCell>{transaction.fromAddress}</TableCell>
            <TableCell align="right">{`${transaction.amount} SOL`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
      See more orders
    </Link>
  </React.Fragment>
);

export default Orders;
