import React, { FC } from 'react';
import './HeroSection.scss';

export const HeroSection: FC = () => {
  return (
    <div className="hero-container text-center py-5">
      <h1 className="display-1 fw-bold mb-3">Albedo</h1>
      <p className="fs-3 fw-normal mb-4">Unlocking the Future of Decentralized Sensor Data</p>
      <a href="/login-signup" className="btn btn-primary btn-lg">Get Started</a>
    </div>
  );
};