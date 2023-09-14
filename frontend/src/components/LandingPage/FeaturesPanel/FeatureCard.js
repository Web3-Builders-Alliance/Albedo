import React from 'react';
import './FeatureCard.scss';

const FeatureCard = ( { imageSrc, description }) => {
  return (
    <div className='card feature-card text-center'>
      <img src={imageSrc} alt='Feature' className='card-img-top feature-card-img' />
      <div className='card-body'>
        <p className='card-text feature-card-desc'>{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;