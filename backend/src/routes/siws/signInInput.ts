import { SolanaSignInInput } from "@solana/wallet-standard-features";

export const createSignInData = async (): Promise<SolanaSignInInput> => {
  const now: Date = new Date();
  const uri = process.env.SERVER_URI || 'http://localhost:3001';
  const currentUrl = new URL(uri);
  const domain = currentUrl.host;

  // Convert the Date object to a string
  const currentDateTime = now.toISOString();

  // signInData can be kept empty in most cases: all fields are optional
  // const signInData: SolanaSignInInput = {};

  const signInData: SolanaSignInInput = {
    domain,
    statement:
      "Clicking Sign or Approve only means you have proved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee.",
    version: "1",
    nonce: "oBbLoEldZs",
    chainId: "mainnet",
    issuedAt: currentDateTime,
    resources: ["https://example.com", "https://phantom.app/"],
  };

  return signInData;
};