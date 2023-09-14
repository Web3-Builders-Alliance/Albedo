import React from 'react';
import './HeroSection.scss';

const HeroSection = () => {
  return (
    <div className='hero-container'>
      <h1>Albedo</h1>
      <p>Unlocking the Future of Decentralized Sensor Data</p>
      <a href="/login-signup" className='btn-primary'>Get Started</a>
    </div>
  );
};

export default HeroSection;