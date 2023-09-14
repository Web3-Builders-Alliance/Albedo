import React, { useEffect, useRef } from 'react';
import './FAQPanel.scss';

export default function BasicAccordion() {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const rect = panelRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        panelRef.current.classList.add('visible');
        panelRef.current.classList.remove('hidden');
      } else {
        panelRef.current.classList.add('hidden');
        panelRef.current.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={panelRef} className="accordion hidden" id="accordionExample">
      <h2 id='#how-it-works'>FAQ</h2>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            What Is Albedo?
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <p>
              Albedo is a decentralized marketplace that leverages IoT sensors and blockchain technology
              to facilitate seamless interactions between data providers and consumers. Our platform aims
              to revolutionize how sensor data is verified, shared, and utilized, making it easier for you
              to bring or consume real-world data in a secure and transparent manner.
              Example: Imagine a smart city where parking spots are equipped with IoT sensors. These sensors
              provide real-time data on parking availability. As a Data Provider, you can monetize this data
              by listing it on Albedo. On the flip side, as a Data Consumer, you can access this data to find
              parking spots easily and pay for them securely through smart contracts.
            </p>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            How Does Albedo Ensure Data Reliability?
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <p>
            Reliability is at the core of what we do. All sensor data that comes into Albedo is first verified by trusted data oracles. Once verified, the data is stored on the blockchain, ensuring it is immutable and trustworthy. This rigorous verification process allows us to provide high-quality, reliable data to consumers.
            </p>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="true"
            aria-controls="collapseThree"
          >
            How Can I Get Started as a Data Provider or Consumer?
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <p>
            Getting started is easy. Simply sign up on our platform and choose your role as either a Data Provider or Consumer. If you're a Data Provider, you can begin uploading data from your IoT sensors following our easy-to-use guidelines. As a Data Consumer, you can browse the marketplace to find the data that suits your needs and access it in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}