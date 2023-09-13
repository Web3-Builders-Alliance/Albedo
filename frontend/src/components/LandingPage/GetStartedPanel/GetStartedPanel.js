import React, { useEffect, useRef } from 'react';
import './GetStartedPanel.css';
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
    <div ref={panelRef} className="get-started hidden">
      <img src={globaImage} alt="Globe" className="globe-image" />
      <h2>Unleash the Potential</h2>
      <p>Get started with Albedo, and experience the future of decentralized marketplaces today.</p>
      <a href="/login-signup" className="btn-primary">Get Started</a>
    </div>
  );
};

export default GetStartedPanel;