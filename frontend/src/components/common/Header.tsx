import React, { FC } from 'react';
import './Header.scss';

export const Header: FC = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">Albedo</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#how-it-works">How it Works</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#features">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn-secondary login-signup" href="#login">Login/Sign-Up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};