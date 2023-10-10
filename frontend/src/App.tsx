import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import { SignupPage } from './components/SignupPage/SignupPage';
import { PhantomInitPage } from './components/PhantomInitPage/PhantomInitPage';
// import { EmailVerificationPage } from './components/EmailVerificationPage/EmailVerificationPage';
import { SolanaWallet } from '../src/components/PhantomInitPage/SolanaWallet';
import { Dashboard } from './components/DashboardPage/Dashboard';

// Import your global styles
import '../src/styles/GlobalStyles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const App: FC = () => {
  return (
    <SolanaWallet>
      <Router>
        <div className="main-container">
          
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/initialize-phantom" element={<PhantomInitPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/verify-email" element={<EmailVerificationPage />} /> */}
            {/* Add other routes here */}
          </Routes>
            
        </div>
      </Router>
    </SolanaWallet>
  );
};
