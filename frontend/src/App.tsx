import React, { FC } from 'react';
import './GlobalStyles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Exported Modules
import { Header } from './components/common/Header';
import { HeroSection } from './components/LandingPage/HeroSection/HeroSection';
import { ContentSection } from './components/LandingPage/ContentSection/ContentSection';
import { GetStartedPanel } from './components/LandingPage/GetStartedPanel/GetStartedPanel';
import { FeaturesPanel } from './components/LandingPage/FeaturesPanel/FeaturesPanel';
import { FAQPanel } from './components/LandingPage/FAQPanel/FAQPanel';
import { Footer } from './components/common/Footer';

export const App: FC = () => {
  return (
    <div className="main-container">
      <Header />
      <HeroSection />
      <ContentSection />
      <GetStartedPanel />
      <FeaturesPanel />
      <FAQPanel />
      <Footer />
      {/* Add other components here */}
    </div>
  );
};