import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const verifyEmailRoute = (req: Request, res: Response) => {
  // Read token from query params
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  // Simulate database
  const usersPath = path.join(__dirname, '../../users.json');
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  
  // Check if token is valid
  const user = users.find((user: { token: string }) => user.token === token);

  if (user) {
    // Mark the email as verified in the simulated database (you would update the real database here)
    user.emailVerified = true;
    fs.writeFileSync(usersPath, JSON.stringify(users));

    return res.status(200).json({ valid: true, message: 'Email verified successfully' });
  } else {
    return res.status(400).json({ valid: false, message: 'Invalid or expired token' });
  }
};