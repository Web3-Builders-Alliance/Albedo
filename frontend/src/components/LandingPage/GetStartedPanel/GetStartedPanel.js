import React, { useEffect, useRef } from 'react';
import './GetStartedPanel.scss';
import globaImage from '../../../assets/images/landingPage/global_network.jpeg';

const GetStartedPanel = () => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const rect = panelRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        panelRef.current.classList.add('visible');
        panelRef.current.classList.remove('hidden');
      } else {
        panelRef.current.classList.add('hidden');
        panelRef.current.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={panelRef} className="get-started container hidden">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img src={globaImage} alt="Globe" className="img-fluid" />
        </div>
        <div className="col-md-6 text-center">
          <h2>Unleash the Potential</h2>
          <p>Get started with Albedo, and experience the future of decentralized marketplaces today.</p>
          <a href="/login-signup" className="btn btn-primary">Get Started</a>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPanel;