import React, { FC } from 'react';
import { SolanaWallet } from './SolanaWallet';
import { SendSOLToRandomAddress } from './SendSOLToRandomAddress';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';

export const PhantomInitPage: FC = () => {
  
  return (
    <div className='phantom-init-page'>
      <Header variant='signup' />
      <div className='d-flex-column mb-4'>
        <SolanaWallet />
        <SendSOLToRandomAddress />
      </div>
      <Footer variant='signup' />
    </div>
    );
  }