import React, { FC } from 'react';
import './ContentSection.scss';
import contentImg from '../../../assets/images/landingPage/blockchain_tech.png'

export const ContentSection: FC = () => {
  return (
    <div className="content-container container">
      <div className="row">
        <div className="col-md-6 content-text">
          <h2>Welcome to Albedo: A Decentralized Marketplace for Data</h2>
          <p>
            Albedo redefines data marketplaces by integrating cutting-edge IoT sensors 
            with Solana's high-performance blockchain. Elevate your real-time data 
            transactions to new heights of security and verifiability.
          </p>
          <p>
            By seamlessly connecting data providers and consumers, we unlock a multitude 
            of escrow use-cases, all governed by transparent smart contracts. Experience 
            data interaction like never before, devoid of centralized limitations.
          </p>
          <p>
            Built to serve as a public good, Albedo’s versatile architecture can be 
            adapted across industries. Whether you’re in agriculture, healthcare, or logistics, 
            our platform ensures your data is trustworthy and actionable.
          </p>
        </div>
        <div className="col-md-6 content-img">
          <img src={contentImg} alt='Blockchain tech' className="img-fluid" />
        </div>
      </div>
    </div>
  );
};
