import React, { FC } from 'react';
import '../src/styles/GlobalStyles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Exported Modules
import { Header } from './components/common/Header';
import { HeroSection } from './components/LandingPage/HeroSection/HeroSection';
import { ContentSection } from './components/LandingPage/ContentSection/ContentSection';
import { MarketOpportunityPanel } from './components/LandingPage/MarketOpportunityPanel/MarketOpportunityPanel';
import { GetStartedPanel } from './components/LandingPage/GetStartedPanel/GetStartedPanel';
import { FeaturesPanel } from './components/LandingPage/FeaturesPanel/FeaturesPanel';
import { FAQPanel } from './components/LandingPage/FAQPanel/FAQPanel';
import { Footer } from './components/common/Footer';
import {SignupPage} from './components/SignupPage/SignupPage';

export const App: FC = () => {
  return (
    <div className="main-container">
      <SignupPage />
      {/* <Header variant='landing' />
      <HeroSection />
      <ContentSection />
      <MarketOpportunityPanel / >
      <GetStartedPanel />
      <FeaturesPanel />
      <FAQPanel />
      <Footer variant='landing' /> */}
      {/* Add other components here */}
    </div>
  );
};