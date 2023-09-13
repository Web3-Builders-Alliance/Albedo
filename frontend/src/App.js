import React from 'react';
import './GlobalStyles.css';
import Header from './components/common/Header';
import HeroSection from './components/LandingPage/HeroSection';
import ContentSection from './components/LandingPage/ContentSection/ContentSection';
import GetStartedPanel from './components/LandingPage/GetStartedPanel/GetStartedPanel';
import FeaturesPanel from './components/LandingPage/FeaturesPanel/FeaturesPanel';
import FAQPanel from './components/LandingPage/FAQPanel/FAQPanel';
import Footer from './components/common/Footer';
// Import other components as needed

function App() {
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
}

export default App;