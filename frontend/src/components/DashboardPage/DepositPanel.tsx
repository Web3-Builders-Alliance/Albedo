import React, { useState } from "react";
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

  // Placeholder function for deposit action
  const handleDeposit = () => {
    // On-chain deposit logic will go here
    console.log(`Depositing ${amount} SOL`);
  };

  return (
    <div className="deposit-panel">
      <Typography variant="h6">
        Deposit SOL
      </Typography>
      <Typography variant="body2">
        Deposit SOL into smart contract to access insurance coverage with DePIN sensor.
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
      <Button variant="contained" color="primary" onClick={handleDeposit}>
        Deposit
      </Button>
    </div>
  );
};
