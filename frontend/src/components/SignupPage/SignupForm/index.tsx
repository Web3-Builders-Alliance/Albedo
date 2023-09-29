import React, { FC, useState, useCallback, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';
import { createSignInMessageText } from "@solana/wallet-standard-util";

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

      // Sign the entire Message, nonce, domain, details, etc.
      const messageToBeSigned = createSignInMessageText({
        ...(signInData as any),
        address: publicKey.toBase58()
      });
    
      console.log("Frontend - Entire Message to be signed:", messageToBeSigned);
      
      // Sign the nonce with the wallet's secret key
      let signedMessage: Uint8Array | undefined;
      //! restore after if (typeof signMessage === 'function') {
      //   signedMessage = await signMessage(new TextEncoder().encode(nonce));
      // }
      if (typeof signMessage === 'function') {
        signedMessage = await signMessage(new TextEncoder().encode(nonce));
      }

      if (!signedMessage) {
        throw new Error("Failed to sign the nonce");
      }

      // Create SolanaSignInOutput
      const signatureArray = signedMessage instanceof Uint8Array ? signedMessage : new Uint8Array(signedMessage);

      // Logging the signature
      console.log("Frontend - Signature:", signatureArray);
      
      // Create SolanaSignInOutput
      const outputData: SolanaSignInOutput = {
        account: {
          publicKey: new Uint8Array(serializablePublicKey),
          address: publicKey.toBase58(),
          chains: ["solana:devnet"],
          features: [],
        },
        signature: signatureArray, //! Signature is empty on the backend
        signedMessage: new Uint8Array(new TextEncoder().encode(messageToBeSigned)),
      };

      // Does this produce the correct address every time.
      console.log("Address:", outputData.account.address);

      // Log the output
      console.log("Output payload being sent: ", outputData);
      const verifyRes = await fetch('http://localhost:3001/api/verifyOutput', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ input: signInData, output: outputData }),
      });

      console.log('Debug: Full Response:', verifyRes);
      
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