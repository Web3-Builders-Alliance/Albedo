import React, { FC, useState, useCallback, useMemo, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';


export const SignupForm: FC = () => {
  const { publicKey, connected, signMessage, signIn } = useWallet();
  const [message, setMessage] = useState('');
  const [nonce, setNonce] = useState<Uint8Array | null>(null);

  useEffect(() => {
    // Fetch the nonce from the backend API
    const fetchNonce = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/getNonce');
        if (res.ok) {
          const { nonce } = await res.json();
          setNonce(Uint8Array.from(nonce));
        } else {
          throw new Error('Failed to fetch nonce');
        }
      } catch (error) {
        console.error(`Error fetching nonce: ${error}`);
      }
    };

    fetchNonce();
  }, []);
  
  const connection = useMemo(() => new Connection('https://api.devnet.solana.com/'), []);

  const signInSolana = useCallback(async () => {
    try {
      if (!connected && typeof signIn === 'function') {
        await signIn();
      }
  
      if (!publicKey || !connection || !signMessage) {
        throw new WalletNotConnectedError();
      }
  
      // Make sure nonce is fetched
      if (!nonce) {
        throw new Error('Nonce not fetched');
      }
  
      // Check that signMessage is not undefined
      if (typeof signMessage !== 'function') {
        throw new Error('signMessage function is not available');
      }
  
      // Sign the nonce
      const signedNonce = await signMessage(nonce);

      // Convert publicKey to a JSON-serializable format
      const serializablePublicKey = Array.from(new Uint8Array(publicKey.toBuffer()));

      const createFrontendSignInData = async (): Promise<SolanaSignInInput> => {
        const now = new Date();
        const currentDateTime = now.toISOString();
        const nonce = crypto.getRandomValues(new Uint8Array(16)).join('');
      
        const signInData: SolanaSignInInput = {
          domain: "https://650f3566e678fa5c1fa8b6fb--splendorous-lolly-4434bd.netlify.app",
          statement: "Authentication statement.",
          version: "1",
          nonce,
          chainId: "devnet",
          issuedAt: currentDateTime,
          resources: ["https://example.com", "https://phantom.app/"]
        };
      
        return signInData;
      };

      // Create SolanaSignInOutput
      const outputData: SolanaSignInOutput = {
        account: {
          publicKey: new Uint8Array(serializablePublicKey),
          address: publicKey.toBase58(),
          chains: ["solana:devnet"],
          features: [],
        },
        signature: new Uint8Array(signedNonce),
        signedMessage: nonce,
      };

      const verifyRes = await fetch('http://localhost:3001/api/verifyOutput', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ input: createFrontendSignInData, output: outputData }),
      });
    
      const { success } = await verifyRes.json();
      setMessage(success ? 'Successfully signed in with Solana' : 'Failed to verify Solana sign-in');
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  }, [publicKey, connection, signIn, connected, nonce, signMessage]);

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
        disabled={!connected || !nonce}
        className="btn btn-secondary mt-3"
        onClick={signInSolana}
      >
        Sign Up with Solana
      </button>
    </div>
  );
};