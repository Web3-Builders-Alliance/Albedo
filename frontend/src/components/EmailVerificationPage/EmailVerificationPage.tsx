import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';

export const EmailVerificationPage: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);  // Add this state
  
  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
      console.error("Token is missing from URL");
      setIsLoading(false);  // Hide spinner
      // Redirect to an error page or display an error message
      return;
    }
    
    // Make an API call to verify the token
    axios.post('http://localhost:3001/api/verify-token', { token })
      .then(response => {
        setIsLoading(false);  // Hide spinner
        if (response.data.valid) {
          console.log("Email verified successfully!");
          // Redirect to the PhantomInitPage
          navigate('/initialize-phantom');
        } else {
          console.error("Invalid token");
          // Redirect to an error page or display an error message
        }
      })
      .catch(error => {
        setIsLoading(false);  // Hide spinner
        console.error("An error occurred while verifying the token", error);
        // Redirect to an error page or display an error message
      });
  }, [navigate]);
  
  return (
    <div>
      <Header variant='signup' />
      <div className='d-flex justify-content-center align-items-center'>
        <h1>Verifying your email...</h1>
        {isLoading && (  // Show spinner only if isLoading is true
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      <Footer variant='signup' />
    </div>
  );
};
