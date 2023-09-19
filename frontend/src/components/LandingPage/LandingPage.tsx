import React, { FC } from 'react';
import { Header } from '../common/Header';
import { HeroSection } from './HeroSection/HeroSection';
import { ContentSection } from './ContentSection/ContentSection';
import { MarketOpportunityPanel } from './MarketOpportunityPanel/MarketOpportunityPanel';
import { GetStartedPanel } from './GetStartedPanel/GetStartedPanel';
import { FeaturesPanel } from './FeaturesPanel/FeaturesPanel';
import { FAQPanel } from './FAQPanel/FAQPanel';
import { Footer } from '../common/Footer';

export const LandingPage: FC = () => {
  return (
    <>
      <Header variant='landing' />
      <HeroSection />
      <ContentSection />
      <MarketOpportunityPanel />
      <GetStartedPanel />
      <FeaturesPanel />
      <FAQPanel />
      <Footer variant='landing' />
    </>
  );
};