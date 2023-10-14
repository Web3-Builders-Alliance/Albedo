import { SolanaSignInInput } from "@solana/wallet-standard-features";
import crypto from 'crypto';

export const createSignInData = async (): Promise<SolanaSignInInput> => {
  const now: Date = new Date();
  // Dynamic domain based on environment
  const domain = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000'
    : 'https://albedo.digital';
  
  const currentDateTime = now.toISOString();

  // For demonstration purposes, let's assume the expirationTime is 24 hours from issuedAt.
  const expirationTime = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

  // For demonstration purposes, let's assume notBefore is 15 minutes prior to issuedAt.
  const notBefore = new Date(now.getTime() - 15 * 60 * 1000).toISOString();

  const nonce = crypto.randomBytes(16).toString('hex');
  console.log("Backend generated nonce:", nonce);

  const requestId = crypto.randomBytes(8).toString('hex');

  const signInData: SolanaSignInInput = {
    domain,
    statement: "Authentication statement.",
    version: "1",
    nonce,
    chainId: "devnet",
    issuedAt: currentDateTime,
    expirationTime,  // Optional
    notBefore,       // Optional
    requestId,       // Optional
    resources: [
      "https://github.com/solana-labs/wallet-standard",
      "https://phantom.app/learn/developers/sign-in-with-solana"
    ]
  };
  
  return signInData;
};
