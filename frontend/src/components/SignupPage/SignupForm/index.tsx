import React, { FC, useState } from 'react';
import './SignupForm.scss';

export const SignupForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch('http://localhost:3001/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'User created') {
      setMessage('Signup successful!');
      // Clear the form
      setEmail('');
      setPassword('');
    } else {
      setMessage('Signup failed. ' + data.message);
    }
  })
  .catch(error => {
    setMessage('An error occurred: ' + error);
  });
};

return (
  <form className="signup-form needs-validation" noValidate onSubmit={handleSubmit}>
  {/* Show Message */}
  {message && <div className='alert alert-info'>{message}</div>} 


  {/* Email Field */}
  <div className="mb-3">
  <label htmlFor="email" className="form-label">Email address</label>
  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" 
  value={email} 
  onChange={e => setEmail(e.target.value)} 
  required />
  <div className="invalid-feedback">
  Please provide a valid email.
  </div>
  <div className="valid-feedback">
  Looks good!
  </div>
  </div>
  
  {/* Password Field */}
  <div className="mb-3">
  <label htmlFor="password" className="form-label">Password</label>
  <input type="password" className="form-control" id="password" 
  value={password} 
  onChange={e => setPassword(e.target.value)} 
  required />
  <div className="invalid-feedback">
  Please provide a password.
  </div>
  <div className="valid-feedback">
  Looks good!
  </div>
  </div>
  
  {/* Submit Button */}
  <button type="submit" className="btn btn-primary w-100">Submit</button>
  </form>
  );
}
