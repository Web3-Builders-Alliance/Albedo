import React from 'react';
import './GetStartedPanel.css';
import globaImage from '../../../assets/images/landingPage/global_network.jpeg';

const GetStartedPanel = () => {
  return (
    <div className="get-started">
      <img src={globaImage} alt="Globe" className="globe-image" />
      <h2>Unleash the Potential</h2>
      <p>Get started with Albedo, and experience the future of decentralized marketplaces today.</p>
      <a href="/login-signup" className="btn-primary">Get Started</a>
    </div>
  );
};

export default GetStartedPanel;