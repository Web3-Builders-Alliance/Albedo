import React, { FC } from 'react';
import './SignupForm.scss';

export const SignupForm: FC = () => {
  return (
    <form className="signup-form needs-validation" noValidate>
      {/* Email Field */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required />
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
        <input type="password" className="form-control" id="password" required />
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
