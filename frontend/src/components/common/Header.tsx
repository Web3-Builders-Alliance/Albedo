import React, { FC } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import './Header.scss';

interface HeaderProps {
  variant: 'signup' | 'landing' | 'dashboard';
  publicKey?: string;  // Optional public key for 'dashboard' variant
}

export const Header: FC<HeaderProps> = ({ variant }) => {
  const { publicKey } = useWallet();
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Conditional content based on the 'variant' prop */}
        {variant === 'landing' && (
          <a className="navbar-brand fw-bold" href="/">Built on Solana</a>
        )}
        {variant === 'signup' && (
          <a className="navbar-brand fw-bold" href="/">Albedo</a>
        )}
        {variant === 'dashboard' && (
          <>
            <a className="navbar-brand fw-bold" href="/">Albedo</a>
            {/* Add your public key address display and Phantom Wallet icon here */}
            <div className="signed-in-indicator d-flex justify-content-center gap-1">
              <span className="phantom-icon"></span>
              <span className="public-key"><b>Wallet Connected:</b> {publicKey ? `${publicKey.toBase58().slice(0, 6)}...${publicKey.toBase58().slice(-6)}` : 'Loading...'}</span>
            </div>
          </>
        )}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#how-it-works">How it Works</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#features">Features</a>
            </li>
            {variant === 'landing' && (
            <li className="nav-item">
              <a className="nav-link btn-secondary login-signup" href="/signup">Sign-Up</a>
            </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};