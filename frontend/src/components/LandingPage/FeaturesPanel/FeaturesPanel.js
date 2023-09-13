import React from 'react';
import FeatureCard from './FeatureCard';
import './FeaturesPanel.css';

const FeaturesPanel = () => {
  return (
    <div className="features-panel">
      <FeatureCard 
        imageSrc="path/to/image1.jpg" 
        description="Experience seamless IoT integration and unlock limitless opportunities for growth."
      />
      <FeatureCard 
        imageSrc="path/to/image2.jpg" 
        description="Blockchain security ensures your transactions are protected and transparent."
      />
      <FeatureCard 
        imageSrc="path/to/image3.jpg" 
        description="Harness the power of real-time data updates for smarter decision-making."
      />
    </div>
  );
};

export default FeaturesPanel;
