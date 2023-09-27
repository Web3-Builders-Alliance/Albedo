import { SolanaSignInInput } from "@solana/wallet-standard-features";
import crypto from 'crypto';

export const createSignInData = async (): Promise<SolanaSignInInput> => {
  const now: Date = new Date();
  const domain = "https://650f3566e678fa5c1fa8b6fb--splendorous-lolly-4434bd.netlify.app/";
  
  const currentDateTime = now.toISOString();
  const nonce = crypto.randomBytes(16).toString('hex');
  
  const signInData: SolanaSignInInput = {
    domain,
    statement: "Authentication statement.",
    version: "1",
    nonce,  // Use a cryptographically secure random number or string
    chainId: "devnet",  // Update this to your targeted chain
    issuedAt: currentDateTime,
    resources: ["https://example.com", "https://phantom.app/"],  // Add your resources here
  };

  return signInData;
};