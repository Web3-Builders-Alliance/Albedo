import React, { FC } from 'react';
import { SolanaWallet } from './SolanaWallet';
import { SendSOLToRandomAddress } from './SendSOLToRandomAddress';

export const PhantomInitPage: FC = () => {
  
  return (
    <div className='phantom-init-page'>
      <h1>Initialize Your Phantom Wallet</h1>
      <SolanaWallet />
      <SendSOLToRandomAddress />
    </div>
    );
  }