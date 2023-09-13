import React from 'react';
import './FeatureCard.css';

const FeatureCard = ( { imageSrc, description }) => {
  return (
    <div className='feature-card'> 
      <img src={imageSrc} alt='Feature' className='feature-card-img' />
      <p className='feature-card-desc'>{description}</p>
    </div>
  );
};

export default FeatureCard;