import React from 'react';
import './GlobalStyles.css';
import Header from './components/common/Header';
import HeroSection from './components/LandingPage/HeroSection';
import ContentSection from './components/LandingPage/ContentSection/ContentSection';
import GetStartedPanel from './components/LandingPage/GetStartedPanel/GetStartedPanel';
// Import other components as needed

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <ContentSection />
      <GetStartedPanel />
      {/* Add other components here */}
    </div>
  );
}

export default App;