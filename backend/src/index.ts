import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { signupRoute } from './routes/signup';
import { verifyEmailRoute } from './routes/emailVerification';

import siwsRoutes from '../src/routes/siws/index';

// Initialize express
const app = express();
const port = 3001; // You can choose another port if you like
const crypto = require('crypto');

// Enable CORS from frontend
app.use(cors({
  origin: 'http://localhost:3000', // replace with your application's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['x-auth-token'],
  optionsSuccessStatus: 204,
}));

// Middleware for parsing JSON
app.use(express.json()); 

// Register the signup route
app.post('/signup', signupRoute);

// Add verifyEmailRoute
app.post('/api/verify-token', verifyEmailRoute);

app.get('/api/getNonce', (req, res) => {
  const nonce = crypto.randomBytes(16).toString('hex');
  // Store this nonce in a database or in-memory data structure, tied to this user session.
  res.json({ nonce });
});

// Sign in With Solana routes
app.use('/api', siwsRoutes);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global Error:', err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});