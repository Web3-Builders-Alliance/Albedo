import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './FAQPanel.css';

export default function BasicAccordion() {
  return (
    <div className='faq-section'>
      <h2>FAQ</h2>
      <Accordion className='accordion'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className='title'>What is Albedo?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Albedo is a decentralized marketplace that leverages IoT sensors and blockchain technology to facilitate seamless interactions between data providers and consumers. Our platform aims to revolutionize how sensor data is verified, shared, and utilized, making it easier for you to bring or consume real-world data in a secure and transparent manner.

          Example: Imagine a smart city where parking spots are equipped with IoT sensors. These sensors provide real-time data on parking availability. As a Data Provider, you can monetize this data by listing it on Albedo. On the flip side, as a Data Consumer, you can access this data to find parking spots easily and pay for them securely through smart contracts.

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className='accordion'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className='title'>How Does Albedo Ensure Data Reliability?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Reliability is at the core of what we do. All sensor data that comes into Albedo is first verified by trusted data oracles. Once verified, the data is stored on the blockchain, ensuring it is immutable and trustworthy. This rigorous verification process allows us to provide high-quality, reliable data to consumers.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className='accordion'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className='title'>How Can I Get Started as a Data Provider or Consumer?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Getting started is easy. Simply sign up on our platform and choose your role as either a Data Provider or Consumer. If you're a Data Provider, you can begin uploading data from your IoT sensors following our easy-to-use guidelines. As a Data Consumer, you can browse the marketplace to find the data that suits your needs and access it in real-time.

          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}