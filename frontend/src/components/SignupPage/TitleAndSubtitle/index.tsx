import React, { FC } from 'react';
import './TitleAndSubtitle.scss';

interface TitleAndSubtitleProps {
  title: string;
  subtitle: string;
}

export const TitleAndSubtitle: FC<TitleAndSubtitleProps> = ({title, subtitle}) => {
  return (
    <div className='title-and-subtitle text-center'>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}