import React, { FC, useState } from 'react';
import './SignupForm.scss';

export const SignupForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
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
  .then(data => console.log(data))
  .catch(error => console.log('Error:', error));
};

return (
  <form className="signup-form needs-validation" noValidate onSubmit={handleSubmit}>
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
