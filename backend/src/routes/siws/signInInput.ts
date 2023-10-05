import { SolanaSignInInput } from "@solana/wallet-standard-features";
import crypto from 'crypto';

export const createSignInData = async (): Promise<SolanaSignInInput> => {
  const now: Date = new Date();
  const domain = "http://localhost:3000";
  
  const currentDateTime = now.toISOString();
  const nonce = crypto.randomBytes(16).toString('hex');
  console.log("Backend generated nonce:", nonce);
  
  const signInData: SolanaSignInInput = {
    domain,
    statement: "Authentication statement.",
    version: "1",
    nonce,
    chainId: "devnet", 
    issuedAt: currentDateTime,
    resources: ["https://github.com/solana-labs/wallet-standard", "https://phantom.app/learn/developers/sign-in-with-solana"],  // Add your resources here
  };
  
  return signInData;
};