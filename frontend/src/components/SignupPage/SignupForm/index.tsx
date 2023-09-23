import React, { FC, useState, useCallback, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, Connection } from '@solana/web3.js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';

export const SignupForm: FC = () => {
  const { publicKey, sendTransaction, connected, signIn } = useWallet();
  const [message, setMessage] = useState('');
  
  const connection = useMemo(() => {
    return new Connection('https://api.testnet.solana.com/');
  }, []);
  
  const signInSolana = useCallback(async () => {
    console.log("About to call signIn()");
    console.log("Is connected?", connected);
    console.log("Type of signIn", typeof signIn);
    
    try {
      if (!connected && typeof signIn === 'function') {
        try {
          await signIn();
          console.log("signIn() called successfully");
        } catch (error: any) {
          console.log("signIn() failed:", error);
        }
        console.log("signIn() called successfully");
      }

      if (!publicKey || typeof sendTransaction !== 'function' || !connection) {
        throw new WalletNotConnectedError();
      }

      console.log("About to fetch signInInput");

      const res = await fetch(process.env.REACT_APP_SIGNIN_ENDPOINT || 'http://localhost:3001/api/signInInput');
      console.log("Fetched signInInput: ", res);

      if (!res.ok) throw new Error('Failed to fetch sign-in input');
      
      const signInInput: SolanaSignInInput = await res.json(); // Type-checking here

      console.log("Parsed signInInput: ", signInInput);
      
      // Generate a dummy transaction just to get a signature
      const instruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: publicKey,
        lamports: 0, // 0 lamports transfer means no "actual" transfer
      })
      
      // Create a transaction containing this instruction
      const transaction = new Transaction().add(instruction);
      
      // Sign and send the transaction, receiving the signature as the confirmation
      let signature: string | null = null;
      
      try {
        signature = await sendTransaction(transaction, connection);
        console.log("Transaction Signature: ", signature);
      } catch (err: any) {
        console.log("Error Sending Transaction: ", err);
        throw err;
      }
      
      // Check if `signInInput` and `signature` have values before the fetch call.
      console.log("Debug: signInInput:", signInInput, "Signature:", signature);
      
      const outputData: SolanaSignInOutput = {
        account: {
          publicKey: new Uint8Array(/* ... */),
          address: "",
          chains: [],
          features: []
        },
        signature: new Uint8Array(/* ... */),
        signedMessage: new Uint8Array(/* ... */)
      };
      
      //! Explicit logging to debug
      console.log("Preparing to send to backend: ", {
        input: signInInput, 
        signature: outputData
      });
      
      // Use the signature to authenticate the user on your backend
      const verifyRes = await fetch('http://localhost:3001/api/verifyOutput', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ signInInput, outputData }),
    });
    
    
    const { success } = await verifyRes.json();
    
    console.log('Verification response:', { success }); // <-- Add this log
    
    if (success) {
      setMessage('Successfully signed in with Solana');
    } else {
      setMessage('Failed to verify Solana sign-in');
    }
    
  } catch (err: any) {
    console.error("Detailed Error:", { message: err.message, stack: err.stack }); // <-- Add this log for more detail
    setMessage(`Error: ${err.message}`);
  }
}, [publicKey, sendTransaction, connection, signIn, connected]);

return (
  <div className="signup-form text-center">
  {/* Show Message */}
  {message && <div className="alert alert-info">{message}</div>}
  
  {connected ? (
    <>
    <div className="mb-3">
    Connected with Public Key: {publicKey?.toBase58() || ''}
    </div>
    <WalletDisconnectButton className="btn btn-primary w-100" />
    </>
    ) : (
      <>
      <WalletMultiButton className="btn btn-primary w-100" />
      </>
      )}
      
      {/* Optional: Add a button to trigger Solana-based sign-up */}
      <button 
      type="button"  
      disabled={!connected} 
      className="btn btn-secondary w-100 mt-3" 
      onClick={signInSolana}>
      Sign Up with Solana
      </button>
      </div>
      );
    };