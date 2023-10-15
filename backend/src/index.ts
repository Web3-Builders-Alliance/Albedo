import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createSignInData } from './routes/siws/signInInput';
import siwsRoutes from '../src/routes/siws/index';

// Initialize express
const app = express();
const port = 3001;

// List of allowed origins; added 'https://albedo.digital/' as an example
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://albedo.digital', 'https://albedo.digital/signup'];

// Updated CORS middleware 
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`Origin ${origin} not allowed by CORS`);
      callback(null, false);
    }
  },
  credentials: true,  // Added this line to handle credentials
}));

// Middleware for parsing JSON
app.use(express.json());

// Global logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.path, req.body);
  next();
});

// Sign in With Solana routes
app.use('/api', siwsRoutes);

// Endpoint to send the nonce to the frontend
app.get('/api/getSignInData', async (req, res) => {
  const signInData = await createSignInData();
  res.json(signInData);
});

// Listening on the designated port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});