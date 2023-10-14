import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
// import { signupRoute } from './routes/signup';
// import { verifyEmailRoute } from './routes/emailVerification';
import { createSignInData } from './routes/siws/signInInput';

import siwsRoutes from '../src/routes/siws/index';

// Initialize express
const app = express();
const port = 3001; // You can choose another port if you like

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://albedo.digital/'];

// Enable CORS from frontend
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

// Middleware for parsing JSON
app.use(express.json());

// Global logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.path, req.body);
  next();
});

//! Archive: Register the signup route
// app.post('/signup', signupRoute);

//! Archve: Add verifyEmailRoute
// app.post('/api/verify-token', verifyEmailRoute);

// Sign in With Solana routes
app.use('/api', siwsRoutes);

// Endpoint to send the nonce to the frontend
app.get('/api/getSignInData', async (req, res) => {
  const signInData = await createSignInData();
  res.json(signInData);
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});