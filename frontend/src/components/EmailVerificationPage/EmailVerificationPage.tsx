import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EmailVerificationPage: FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
      console.error("Token is missing from URL");
      // Redirect to an error page or display an error message
      return;
    }
    
    // Make an API call to verify the token
    axios.post('http://localhost:3001/api/verify-token', { token })
      .then(response => {
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
        console.error("An error occurred while verifying the token", error);
        // Redirect to an error page or display an error message
      });
  }, [navigate]);
  
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='text-center'>
        <h1>Verifying your email...</h1>
        {/* You can add a spinner here */}
      </div>
    </div>
  );
};
