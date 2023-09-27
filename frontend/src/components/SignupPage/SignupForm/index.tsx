import React, { FC, useState, useCallback, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';

export const SignupForm: FC = () => {
  const { publicKey, connected, signMessage, signIn } = useWallet();
  const [message, setMessage] = useState('');
  
  const connection = useMemo(() => new Connection('https://api.devnet.solana.com/'), []);

  const signInSolana = useCallback(async () => {
    try {
      if (!connected && typeof signIn === 'function') {
        await signIn();
      }
  
      if (!publicKey || !connection || !signMessage) {
        throw new WalletNotConnectedError();
      }
      
      // Check that signMessage is not undefined
      if (typeof signMessage !== 'function') {
        throw new Error('signMessage function is not available');
      }
      
      // Convert publicKey to a JSON-serializable format
      const serializablePublicKey = Array.from(new Uint8Array(publicKey.toBuffer()));

      // Fetch the SolanaSignInInput data from backend
      const fetchSignInData = async () => {
        const res = await fetch('http://localhost:3001/api/getSignInData');
        const signInData: SolanaSignInInput = await res.json();
        return signInData;
      }

      // Use the fetched data for the signing process
      const signInData = await fetchSignInData();
      const nonce = signInData.nonce; // gets the nonce from the backend
      
      // Sign the nonce with the wallet's secret key
      let signedMessage: Uint8Array | undefined;
      if (typeof signMessage === 'function') {
        signedMessage = await signMessage(new TextEncoder().encode(nonce));
      }

      if (!signedMessage) {
        throw new Error("Failed to sign the nonce");
      }

      console.log("Debug: Type of publicKey", JSON.stringify(publicKey));
      console.log("Debug: Type of output.signature", JSON.stringify(signedMessage));
      console.log("Debug: Type of output.signature", JSON.stringify(nonce));

      // Create SolanaSignInOutput
      const signatureArray = signedMessage instanceof Uint8Array ? signedMessage : new Uint8Array(signedMessage);

      // Create SolanaSignInOutput
      const outputData: SolanaSignInOutput = {
        account: {
          publicKey: new Uint8Array(serializablePublicKey),
          address: publicKey.toBase58(),
          chains: ["solana:devnet"],
          features: [],
        },
        signature: signatureArray,
        signedMessage: new Uint8Array(new TextEncoder().encode(nonce)),
      };
      
      const verifyRes = await fetch('http://localhost:3001/api/verifyOutput', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ input: signInData, output: outputData }),
      });
    
      const { success } = await verifyRes.json();
      setMessage(success ? 'Successfully signed in with Solana' : 'Failed to verify Solana sign-in');
    
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  }, [publicKey, connection, signIn, connected, signMessage]);

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