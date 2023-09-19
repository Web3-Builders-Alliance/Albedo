import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import { SignupPage } from './components/SignupPage/SignupPage';

// Import your global styles
import '../src/styles/GlobalStyles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const App: FC = () => {
  return (
    <Router>
      <div className="main-container">
        {/* <Header variant='landing' /> */}
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Add other routes here */}
        </Routes>
        
        {/* <Footer variant='landing' /> */}
      </div>
    </Router>
  );
};
