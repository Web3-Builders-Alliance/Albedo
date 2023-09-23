import React, { FC, useMemo, useCallback, PropsWithChildren } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { SolanaSignInInput } from "@solana/wallet-standard-features";

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const SolanaWallet: FC<PropsWithChildren> = ( {children} ) => {
  // Define the onError function
  const onError = useCallback((error: Error) => {
    console.error(error);
    alert(`An error occurred: ${error.message}`);
  }, []);
  
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  const autoSignIn = useCallback(async (adapter: any) => {
    // If the signIn feature is not available, return true
    if (!("signIn" in adapter)) return true;
    
    // Fetch the signInInput from the backend
    const createResponse = await fetch("http://localhost:3001/api/signInInput");

    const input: SolanaSignInInput = await createResponse.json();
    
    // Send the signInInput to the wallet and trigger a sign-in request
    const output = await adapter.signIn(input);
    
    // Verify the sign-in output against the generated input server-side
    let strPayload = JSON.stringify({ input, output });
    const verifyResponse = await fetch("http://localhost:3001/api/verifyOutput", {
      method: "POST",
      body: strPayload,
    });
    const success = await verifyResponse.json();
    
    // If verification fails, throw an error
    if (!success) throw new Error("Sign In verification failed!");
    
    return false;
  }, []);
  
  const wallets = useMemo(
    () => [
      /**
      * Wallets that implement either of these standards will be available automatically.
      *
      *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
      *     (https://github.com/solana-mobile/mobile-wallet-adapter)
      *   - Solana Wallet Standard
      *     (https://github.com/solana-labs/wallet-standard)
      *
      * If you wish to support a wallet that supports neither of those standards,
      * instantiate its legacy wallet adapter here. Common legacy adapters can be found
      * in the npm package `@solana/wallet-adapter-wallets`.
      */
      new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
    );

    return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={autoSignIn} onError={onError}>
              <WalletModalProvider>
                  {/* <WalletMultiButton />
                  <WalletDisconnectButton /> */}
                  {/* <SignupForm /> */}
                  { children }
                  { /* Your app's components go here, nested within the context providers. */ }
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}