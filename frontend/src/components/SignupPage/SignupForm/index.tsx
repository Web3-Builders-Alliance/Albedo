import React, { FC, useState, useCallback, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, Connection } from '@solana/web3.js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';

export const SignupForm: FC = () => {
  const { publicKey, sendTransaction, connected, signIn } = useWallet();
  const [message, setMessage] = useState('');
  
  // Initialize connection to Solana testnet
  const connection = useMemo(() => new Connection('https://api.devnet.solana.com/'), []);
  
  const signInSolana = useCallback(async () => {
    try {
      // Attempt to sign in if not connected
      if (!connected && typeof signIn === 'function') {
        await signIn();
      }

      // Validate wallet connection and other dependencies
      if (!publicKey || typeof sendTransaction !== 'function' || !connection) {
        throw new WalletNotConnectedError();
      }

      // Fetch the sign-in input data from backend
      const res = await fetch(process.env.REACT_APP_SIGNIN_ENDPOINT || 'http://localhost:3001/api/signInInput');
      if (!res.ok) throw new Error('Failed to fetch sign-in input');
      
      const signInInput: SolanaSignInInput = await res.json();

      // Generate a dummy transaction to get a signature
      const instruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: publicKey,
        lamports: 0,
      });
      
      // Create and send the transaction
      const transaction = new Transaction().add(instruction);
      const signature = await sendTransaction(transaction, connection);

      // Convert the `signature` to a `Unit8Array`
      const buffer = Buffer.from(signature, 'hex');
      const unit8Array = new Uint8Array(buffer);

      // Create output data for backend verification
      const outputData: SolanaSignInOutput = {
        account: {
          publicKey: new Uint8Array(),
          address: "",
          chains: [],
          features: []
        },
        signature: unit8Array,
        signedMessage: new Uint8Array()
      };
      
      // Send input and output data to backend for verification
      const verifyRes = await fetch('http://localhost:3001/api/verifyOutput', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ signInInput, outputData }),
      });
    
      const { success } = await verifyRes.json();
    
      // Update UI based on verification result
      setMessage(success ? 'Successfully signed in with Solana' : 'Failed to verify Solana sign-in');
    
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  }, [publicKey, sendTransaction, connection, signIn, connected]);

  return (
    <div className="signup-form d-flex flex-column align-items-center">
      {message && <div className="alert alert-info">{message}</div>}
  
      {connected ? (
        <>
          <div className="mb-3 alert alert-info">
            Connected with Public Key: {publicKey?.toBase58() || ""}
          </div>
          <WalletDisconnectButton className="btn btn-primary w-100 mb-3" />
        </>
      ) : (
        <WalletMultiButton className="btn btn-primary w-100" />
      )}
  
      <button
        type="button"
        disabled={!connected}
        className="btn btn-secondary mt-3"
        onClick={signInSolana}
      >
        Sign Up with Solana
      </button>
    </div>
  );
};
