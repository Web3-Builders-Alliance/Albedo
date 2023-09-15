import React, { FC } from 'react';
import './Footer.scss';
import twitterIcon from '../../assets/images/landingPage/twitter_icon.png';
import discordIcon from '../../assets/images/landingPage/discord_icon.png';
import linkedIcon from '../../assets/images/landingPage/linkedin_icon.png';

export const Footer: FC = () => {
  return (
    <footer className="footer py-2">
      <div className='container'>
        <div className='row d-flex flex-column'>
          <div className='col-md-12'>
            <div className="social-icons d-flex align-items-center justify-content-center gap-5">
              <a href="https://twitter.com/albedo_sdk/status/1702022047440977998?s=20" target="_blank" rel="noopener noreferrer">
                <span className="icon"><img src={twitterIcon} alt="Twitter" /></span>
              </a>
              <a href="https://discord.com/channels/@me/1146482893359697970" target="_blank" rel="noopener noreferrer">
                <span className="icon"><img src={discordIcon} alt="Discord" /></span>
              </a>
              <a href="https://www.linkedin.com/in/kellenkjames/" target="_blank" rel="noopener noreferrer">
                <span className="icon"><img className='custom' src={linkedIcon} alt="LinkedIn" /></span>
              </a>
              <a href="https://www.linkedin.com/in/prakyath-reddy-k-704a8a144/" target="_blank" rel="noopener noreferrer">
                <span className="icon"><img className='custom' src={linkedIcon} alt="LinkedIn" /></span>
              </a>
            </div>
          </div>
          <div className='col-md-12 text-center'>
            <div className="copyright">
              <p>© 2023 Albedo - Revolutionizing Decentralized Marketplaces</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
