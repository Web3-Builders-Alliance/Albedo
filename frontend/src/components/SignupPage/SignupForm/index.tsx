import React, { FC, useState, useCallback, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from "@solana/wallet-standard-features";

export const SignupForm: FC = () => {
  const { publicKey, connected, signMessage, signIn } = useWallet();
  const [message, setMessage] = useState("");

  const connection = useMemo(
    () => new Connection("https://api.devnet.solana.com/"),
    []
  );

  const signInSolana = useCallback(async () => {
    try {
      if (!connected && typeof signIn === "function") {
        await signIn();
      }

      if (!publicKey || !connection || !signMessage) {
        throw new WalletNotConnectedError();
      }

      // Check that signMessage is not undefined
      if (typeof signMessage !== "function") {
        throw new Error("signMessage function is not available");
      }

      // Convert publicKey to a JSON-serializable format
      const serializablePublicKey = Array.from(
        new Uint8Array(publicKey.toBuffer())
      );

      // This function formats the nonce into a structured message
      function generateStructuredMessage(
        domain: string,
        address: string,
        statement: string,
        uri: string | undefined,
        version: string,
        chainId: string,
        nonce: string,
        issuedAt: string | undefined,
        expirationTime: string | undefined,
        notBefore: string | undefined,
        requestId: string | undefined,
        resources: string[]
      ): string {
        // Start constructing the message string
        let message = `${domain} wants you to sign in with your Solana account:\n${address}\n\n${statement}\n\nVersion: ${version}\nChain ID: ${chainId}\nNonce: ${nonce}\n`;

        if (issuedAt) {
          message += `Issued At: ${issuedAt}\n`;
        }

        message += "Resources:\n";

        // Append resources
        for (const resource of resources) {
          message += `- ${resource}\n`;
        }

        return message;
      }

      // Fetch the SolanaSignInInput data and issuedAt from backend
      const fetchSignInData = async () => {
        const res = await fetch("http://localhost:3001/api/getSignInData");
        const originalSignInData: SolanaSignInInput = await res.json();

        // Convert publicKey to a string representation
        const publicKeyStr = publicKey.toString();

        // Create a new object with address property and all other properties from the original signInData
        const signInData = {
          ...originalSignInData,
          address: publicKeyStr,
        };

        console.log("signInData before sending:", signInData);
        return signInData;
      };

      // Use the fetched data for the signing process
      const signInData = await fetchSignInData();
      const nonce = signInData.nonce; // gets the nonce from the backend

      const { issuedAt, resources } = signInData;
      console.log("Frontend sending resources:", resources);

      if (!nonce) {
        throw new Error("Nonce is missing from the server response");
      }

      // Create a structured message using the nonce and the fetched issuedAt timestamp
      const structuredMessage = generateStructuredMessage(
        "http://localhost:3000", // domain
        signInData.address, // Address from the modified signInData
        "Authentication statement.", // statement
        undefined, // uri
        "1", // version
        "devnet", // chainId
        nonce, // nonce
        issuedAt, // issuedAt
        undefined, // expirationTime
        undefined, // notBefore
        undefined, // requestId
        resources as string[] // resources fetched from backend
      );

      console.log("Structured Message:", structuredMessage);

      // Convert the structured message string to Uint8Array
      const signedMessageArray = new TextEncoder().encode(structuredMessage);
      console.log(
        "Encoded structured message (Uint8Array):",
        signedMessageArray
      );

      //* Debug: Log before signing
      console.log(
        "Constructed message (before signing):",
        new TextDecoder().decode(signedMessageArray)
      );

      // Sign the nonce with the wallet's secret key
      let signedMessage: Uint8Array | undefined;
      if (typeof signMessage === "function") {
        signedMessage = await signMessage(signedMessageArray);
      }
      console.log("Signature from signMessage (Uint8Array):", signedMessage);

      if (!signedMessage) {
        throw new Error("Failed to sign the nonce");
      }

      // Create SolanaSignInOutput
      const signatureArray =
        signedMessage instanceof Uint8Array
          ? signedMessage
          : new Uint8Array(signedMessage);

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

      //* Critical Log: Frontend, signedMessage before sending to server:
      console.log(new TextDecoder().decode(signedMessageArray));

      const verifyRes = await fetch("http://localhost:3001/api/verifyOutput", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadToSend),
      });

      // Check the Network
      console.log(
        "Debug: Response URL and Status:",
        verifyRes.url,
        verifyRes.status
      );

      // Log the Payload
      console.log("Debug: Full Response:", verifyRes);

      let success;

      try {
        const text = await verifyRes.text();
        console.log("Raw response:", text);

        const data = JSON.parse(text);
        console.log("Parsed data:", data);
        success = data.success;
      } catch (error) {
        console.log("Error during fetch:", error);
      }

      setMessage(
        success
          ? "Successfully signed in with Solana"
          : "Failed to verify Solana sign-in"
      );
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