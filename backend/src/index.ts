import express from 'express';
import cors from 'cors';
import { signupRoute } from './routes/signup';

// Initialize express
const app = express();
const port = 3001; // You can choose another port if you like

// Enable CORS from frontend
app.use(cors({
  origin: 'http://localhost:3000'  // replace with your application's URL
}));

// Middleware for parsing JSON
app.use(express.json()); 

// Register the signup route
app.post('/signup', signupRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});