import React, { useState } from "react";
import {
  PublicKey,
  Connection,
  TransactionInstruction,
  Transaction,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Button,
  TextField,
  Typography,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const PROGRAM_ID = "8S8mQYkYKfhHJyUQU75CDEFHHMMqydbY859dQQXNCME1";
const programId = new PublicKey(PROGRAM_ID);

export const DepositPanel: React.FC = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { publicKey, signTransaction } = useWallet();
  const connection = new Connection("https://api.devnet.solana.com");

  const handleDeposit = async () => {
    if (!publicKey) {
      console.error("Wallet not connected!");
      return;
    }

    setIsLoading(true);

    try {
      const vaultPublicKey = new PublicKey(programId);
      const dataBuffer = Buffer.from(
        Uint8Array.of(...new Array(8).fill(amount))
      );
      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: publicKey, isSigner: true, isWritable: true },
          { pubkey: vaultPublicKey, isSigner: false, isWritable: true },
        ],
        programId: programId,
        data: dataBuffer,
      });

      const transaction = new Transaction().add(instruction);

      // Fetch the recent blockhash from the connection
      const { blockhash } = await connection.getLatestBlockhash();

      // Set the blockhash to the transaction
      transaction.recentBlockhash = blockhash;

      if (publicKey && signTransaction) {
        transaction.feePayer = publicKey;
        let signedTransaction = await signTransaction(transaction);
        let txid = await connection.sendRawTransaction(
          signedTransaction.serialize()
        );
        console.log("Transaction ID", txid);
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("There was an error sending the transaction", error);
      setErrorMessage((error as Error).message);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="deposit-panel">
      <Typography variant="h6">Deposit SOL</Typography>
      <Typography variant="body2">
        Deposit SOL into smart contract to access insurance coverage with DePIN
        sensor.
      </Typography>
      <TextField
        label="Amount"
        type="number"
        variant="outlined"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Your current SOL balance is [X] SOL.">
                <InfoIcon color="action" />
              </Tooltip>
            </InputAdornment>
          ),
        }}
        style={{ margin: "10px 0" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleDeposit}
        disabled={isLoading}
      >
        Deposit
        {isLoading && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
      </Button>

      {showSuccess && (
        <div className="alert alert-success mt-3" role="alert">
          Deposit successful! Please check the transaction in Solana explorer
          for details.
        </div>
      )}

      {showError && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
