import React from 'react';
import './Footer.scss';
import twitterIcon from '../../assets/images/landingPage/twitter_icon.png';
import discordIcon from '../../assets/images/landingPage/discord_icon.png';
import linkedIcon from '../../assets/images/landingPage/linkedin_icon.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://twitter.com/albedo_sdk/status/1702022047440977998?s=20" target="_blank" rel="noopener noreferrer">
          <span className="icon"><img src={twitterIcon} alt="Twitter" /></span>
        </a>
        <a href="https://discord.com/channels/@me/1146482893359697970" target="_blank" rel="noopener noreferrer">
          <span className="icon"><img src={discordIcon} alt="Discord" /></span>
        </a>
        <a href="https://www.linkedin.com/in/kellenkjames/" target="_blank" rel="noopener noreferrer">
          <span className="icon"><img className='linkedin' src={linkedIcon} alt="LinkedIn" /></span>
        </a>
        <a href="https://www.linkedin.com/in/prakyath-reddy-k-704a8a144/" target="_blank" rel="noopener noreferrer">
          <span className="icon"><img className='linkedin' src={linkedIcon} alt="LinkedIn" /></span>
        </a>
      </div>
      <div className="copyright">
        <p>© 2023 Albedo - Revolutionizing Decentralized Marketplaces</p>
      </div>
    </footer>
  );
};

export default Footer;
