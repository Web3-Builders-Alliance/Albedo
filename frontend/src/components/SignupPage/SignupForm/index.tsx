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
      
      // This function formats the nonce into a structured message
      const generateStructuredMessage = (
        domain: string, 
        publicKeyStr: string, 
        statement?: string, 
        uri?: string,
        version?: string, 
        chainId?: string, 
        nonce?: string, 
        issuedAt?: string,
        expirationTime?: string,
        notBefore?: string,
        requestId?: string,
        resources?: string[]
        ) => {
          let messageParts = [
            `${domain} wants you to sign in with your Solana account:`,
            publicKeyStr
          ];
          
          if (statement) messageParts.push(statement);
          if (uri) messageParts.push(`URI: ${uri}`);
          if (version) messageParts.push(`Version: ${version}`);
          if (chainId) messageParts.push(`Chain ID: ${chainId}`);
          if (nonce) messageParts.push(`Nonce: ${nonce}`);
          if (issuedAt) messageParts.push(`Issued At: ${issuedAt}`);
          if (expirationTime) messageParts.push(`Expiration Time: ${expirationTime}`);
          if (notBefore) messageParts.push(`Not Before: ${notBefore}`);
          if (requestId) messageParts.push(`Request ID: ${requestId}`);
          if (resources && resources.length > 0) {
            messageParts.push(`Resources:`, ...resources.map(resource => `- ${resource}`));
          }
          
          // Join all parts with a newline to create the final structured message
          return messageParts.join('\n');
        };
        
        // Fetch the SolanaSignInInput data and issuedAt from backend
        const fetchSignInData = async () => {
          const res = await fetch('http://localhost:3001/api/getSignInData');
          const signInData: SolanaSignInInput = await res.json();
          console.log("Frontend received nonce and issuedAt:", signInData.nonce, signInData.issuedAt);
          return signInData;
        }
        
        // Use the fetched data for the signing process
        const signInData = await fetchSignInData();
        const nonce = signInData.nonce; // gets the nonce from the backend
        
        if (!nonce) {
          throw new Error("Nonce is missing from the server response");
        }
        
        // Convert publicKey to a string representation
        const publicKeyStr = publicKey.toString();
        
        // Create a structured message using the nonce and the fetched issuedAt timestamp
        const structuredMessage = generateStructuredMessage(
          "http://localhost:3000",      // domain
          publicKeyStr,                 // publicKeyStr
          "Authentication statement.", // statement
          undefined,                    // uri - assuming you don't have it right now
          "1",                          // version
          "devnet",                     // chainId
          nonce,                        // nonce
          signInData.issuedAt,          // issuedAt from backend
          undefined,                    // expirationTime - assuming you don't have it right now
          undefined,                    // notBefore - assuming you don't have it right now
          undefined,                    // requestId - assuming you don't have it right now
          [                            // resources - you can add more URIs here if needed
          "https://github.com/solana-labs/wallet-standard",
          "https://phantom.app/learn/developers/sign-in-with-solana"
        ]
        );
        
        console.log("Structured Message:", structuredMessage);
        
        // Convert the structured message string to Uint8Array
        const signedMessageArray = new TextEncoder().encode(structuredMessage);
        console.log("Encoded structured message (Uint8Array):", signedMessageArray);
        
        //* Debug: Log before signing
        console.log("Constructed message (before signing):", new TextDecoder().decode(signedMessageArray));
        
        // Sign the nonce with the wallet's secret key
        let signedMessage: Uint8Array | undefined;
        if (typeof signMessage === 'function') {
          signedMessage = await signMessage(signedMessageArray);
        }
        console.log("Signature from signMessage (Uint8Array):", signedMessage);
        
        if (!signedMessage) {
          throw new Error("Failed to sign the nonce");
        }
        
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
          signedMessage: signedMessageArray,
        };
        
        const messageLength = outputData.signature.length;
        const signedMessageLength = outputData.signedMessage.length;
        
        console.log(`Message Length: ${messageLength}`);
        console.log(`Signed Message Length: ${signedMessageLength}`);
        
        if (messageLength !== signedMessageLength) {
          console.warn("Lengths of the two arrays are not equal!");
        } else {
          console.log("Lengths of the two arrays are equal.");
        }
        
        const payloadToSend = { input: signInData, output: outputData };
        console.log("Frontend, payload to send to server", payloadToSend);
        
        //* Critical Log:
        console.log("Frontend, signedMessage before sending to server:", new TextDecoder().decode(signedMessageArray));
        
        const verifyRes = await fetch('http://localhost:3001/api/verifyOutput', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payloadToSend),
      });
      
      // Check the Network
      console.log("Debug: Response URL and Status:", verifyRes.url, verifyRes.status);
      
      // Log the Payload
      console.log('Debug: Full Response:', verifyRes);
      
      let success;
      
      try {
        const text = await verifyRes.text();
        console.log("Raw response:", text);
        
        const data = JSON.parse(text);
        console.log("Parsed data:", data);
        success = data.success;
      } catch (error) {
        console.log('Error during fetch:', error);
      }
      
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