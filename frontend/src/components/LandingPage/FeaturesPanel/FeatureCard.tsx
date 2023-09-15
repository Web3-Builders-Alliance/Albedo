import React, { FC } from 'react';
import './FeatureCard.scss';

interface FeatureCardProps {
  imageSrc: string,
  description: string
}

export const FeatureCard: FC<FeatureCardProps> = ( { imageSrc, description }) => {
  return (
    <div className='card feature-card text-center d-flex flex-direction-column'>
      <img src={imageSrc} alt='Feature' className='card-img-top feature-card-img' />
      <div className='card-body'>
        <p className='card-text feature-card-desc'>{description}</p>
      </div>
    </div>
  );
};