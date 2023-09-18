import React, { FC } from 'react';
import './SignupForm.scss';

export const SignupForm: FC = () => {
  return (
    <form className="signup-form">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" />
      </div>
      <button type="submit" className="btn btn-primary w-100">Submit</button>
    </form>
  );
}