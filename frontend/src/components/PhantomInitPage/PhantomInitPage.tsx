import React, { FC } from 'react';

export const PhantomInitPage: FC = () => {

  const connectPhantomWallet = async () => {
    // Here, we will put the logic to connect the Phantom wallet
    // For now, let's just log a message to the console
    console.log("Connect Wallet button clicked");
  };

  return (
    <div className='phantom-init-page'>
      <h1>Initialize Your Phantom Wallet</h1>
      <p>
        To proceed, you need to connect your Phantom Wallet.
        If you don't have Phantom Wallet, you can download it from their official website.
      </p>
      <button onClick={connectPhantomWallet}>
        Connect Wallet
      </button>
    </div>
  );
}