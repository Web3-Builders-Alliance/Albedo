import React, { FC, useEffect, useRef } from 'react';
import './MarketOpportunityPanel.scss';
import chartScreenshot from '../../../assets/images/landingPage/depin_market.jpeg';

export const MarketOpportunityPanel: FC = () => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (panelRef.current) {
        const rect = panelRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          panelRef.current.classList.add('visible');
          panelRef.current.classList.remove('hidden');
        } else {
          panelRef.current.classList.add('hidden');
          panelRef.current.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={panelRef} className="market-opportunity container py-5 hidden">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h2>Unlock the Untapped DePIN Market</h2>
          <p>
            Recent projections estimate the market for Decentralized Physical Infrastructure Networks (DePINs) at around $3.5 trillion by 2028. This includes sectors like Servers, Wireless, Sensors, and Energy.
          </p>
          <p>
            However, the real potential is much greater. Factors like Mobility, a growing Sensor market, and emerging Web3 technologies are set to expand the DePIN market significantly. It's not just a $3.5 trillion market; it's much bigger.
          </p>
          <p>
            From the Mobility sector with a current cap of $60 billion, to the Sensor sector projected to exceed $100 trillion in connected IoT sensors by 2030, the opportunities are immense.
          </p>
          <p>
            As we transition from Web2 to Web3, new markets will emerge, and existing ones will expand. The multiplier effect will take hold as different sectors intersect, making the DePIN market not just lucrative but also essential for future innovation.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img src={chartScreenshot} alt="Market Opportunity Chart" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};