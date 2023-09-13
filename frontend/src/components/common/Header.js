import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
    <div className="logo">
      {/* Placeholder for Logo */}
      Albedo
    </div>
    <nav className='nav'>
      <ul className='nav-list'>
        <li className='nav-item'>
          <a className='link' href='#how-it-works'>How it Works</a>
        </li>
        <li className='nav-item'>
          <a className='link' href='#features'>Features</a>
        </li>
        <li className='nav-item'>
          <a className='btn-secondary login-signup' href='#login'>Login/Sign-Up</a>
        </li>
      </ul>
    </nav>
    </header>
  );
};

export default Header;