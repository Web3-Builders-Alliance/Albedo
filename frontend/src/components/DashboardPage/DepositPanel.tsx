import React, { useEffect, useState, useMemo } from "react";
import {
  PublicKey,
  Connection,
  Transaction,
  SystemProgram,
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

export const DepositPanel: React.FC = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);
  const [solBalance, setSolBalance] = useState<number | null>(null);

  const { publicKey, signTransaction } = useWallet();

  const connection = useMemo(() => {
    return new Connection("https://api.devnet.solana.com");
  }, []); // Empty dependency array because the connection URL doesn't change

  useEffect(() => {
    const fetchSolBalance = async () => {
      if (publicKey) {
        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSol = balanceInLamports / 1e9; // Convert lamports to SOL
        setSolBalance(balanceInSol);
      }
    };

    fetchSolBalance();

    // Optional: set up periodic fetching, e.g., every minute
    const interval = setInterval(fetchSolBalance, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [publicKey, connection]);

  const VAULT_PUBLIC_KEY = "8h5zTF7KiQ1KGrjWpXMWj3VT5bbWDj5M9E3pEhmXd4dv";
  const vaultPublicKey = new PublicKey(VAULT_PUBLIC_KEY);

  const handleDeposit = async () => {
    if (!publicKey) {
      console.error("Wallet not connected!");
      return;
    }

    setIsLoading(true);

    try {
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: vaultPublicKey,
        lamports: Number(amount) * 1e9, // Convert SOL to lamports
      });

      const transaction = new Transaction().add(transferInstruction);

      // Fetch the recent blockhash from the connection
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      if (publicKey && signTransaction) {
        transaction.feePayer = publicKey;
        let signedTransaction = await signTransaction(transaction);
        let txid = await connection.sendRawTransaction(
          signedTransaction.serialize()
        );
        console.log("Transaction ID", txid);
        setShowSuccess(true);
        setTxId(txid); // Store the transaction ID
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
              <Tooltip
                title={`Your current SOL balance is ${
                  solBalance ? solBalance.toFixed(2) : "[fetching...]"
                } SOL.`}
              >
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
          Deposit successful!
          {txId && (
            <div>
              <a
                href={`https://explorer.solana.com/tx/${txId}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View transaction on Solana explorer
              </a>
            </div>
          )}
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
