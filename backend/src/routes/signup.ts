import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const signupRoute = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate email and password (add your validation logic here)
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Simulate database
  const usersPath = path.join(__dirname, '../../users.json');
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

  // Check if user already exists
  if (users.some((user: { email: string }) => user.email === email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Add new user
  users.push({ email, password });
  fs.writeFileSync(usersPath, JSON.stringify(users));

  res.status(201).json({ message: 'User created', email });
};