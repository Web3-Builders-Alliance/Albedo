import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

const preventDefault = (event: React.MouseEvent) => {
  event.preventDefault();
};

export const Deposits: React.FC = () => {
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        15 SOL
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 12 October, 2023
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}