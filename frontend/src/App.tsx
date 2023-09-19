import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import { SignupPage } from './components/SignupPage/SignupPage';
import { PhantomInitPage } from './components/PhantomInitPage/PhantomInitPage';

// Import your global styles
import '../src/styles/GlobalStyles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const App: FC = () => {
  return (
    <Router>
      <div className="main-container">
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/initialize-phantom" element={<PhantomInitPage />} />
          {/* Add other routes here */}
        </Routes>
          
      </div>
    </Router>
  );
};
