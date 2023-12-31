import React, {FC } from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { SignupForm } from './SignupForm';
import { TitleAndSubtitle } from './TitleAndSubtitle';

export const SignupPage: FC = () => {
  return (
    <div className="signup-page">
      {/* Header with slight variations */}
      <Header variant="signup" />

      <main className="container py-5">
        {/* Main Title and Subtitle */}
        <TitleAndSubtitle title='Sign Up' subtitle='Connect your Solana Wallet to Sign Up.' />

        {/* Signup Form */}
        <SignupForm />
      </main>

      {/* Footer with slight variations */}
      <Footer variant="signup" />
    </div>
  );
};