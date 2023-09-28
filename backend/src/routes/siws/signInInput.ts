import { SolanaSignInInput } from "@solana/wallet-standard-features";
import crypto from 'crypto';

export const createSignInData = async (): Promise<SolanaSignInInput> => {
  const now: Date = new Date();
  const domain = "http://localhost:3000";
  
  const currentDateTime = now.toISOString();
  const nonce = crypto.randomBytes(16).toString('hex');
  
  const signInData: SolanaSignInInput = {
    domain,
    statement: "Authentication statement.",
    version: "1",
    nonce,  // Use a cryptographically secure random number or string
    chainId: "devnet",  // Update this to your targeted chain
    issuedAt: currentDateTime,
    resources: ["https://github.com/solana-labs/wallet-standard", "https://phantom.app/learn/developers/sign-in-with-solana"],  // Add your resources here
  };
  
  return signInData;
};