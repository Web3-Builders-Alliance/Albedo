import React, { useEffect, useRef } from 'react';
import FeatureCard from './FeatureCard';
import './FeaturesPanel.scss';
import image1 from "../../../assets/images/landingPage/iot_integration.jpeg";
import image2 from "../../../assets/images/landingPage/blockchain_security.jpeg";
import image3 from "../../../assets/images/landingPage/real_time_data.jpeg";

const FeaturesPanel = () => {
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
    <div ref={panelRef} className="features-panel hidden container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <FeatureCard 
            imageSrc={image1} 
            description="Experience seamless IoT integration and unlock limitless opportunities for growth."
          />
        </div>
        <div className="col-md-4">
          <FeatureCard 
            imageSrc={image2} 
            description="Blockchain security ensures your transactions are protected and transparent."
          />
        </div>
        <div className="col-md-4">
          <FeatureCard 
            imageSrc={image3} 
            description="Harness the power of real-time data updates for smarter decision-making."
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesPanel;