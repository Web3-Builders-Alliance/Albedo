import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { sendEmail } from '../sendEmail';

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

  const wbaLogoUrl = 'https://avatars.githubusercontent.com/u/109991700?s=200&v=4';
  
  
  sendEmail(
    email, 
    'Welcome to Albedo', 
    
    `Welcome to Albedo, ${email}!\n\nWe're excited to have you join our community. You can now start exploring all the features and benefits that Albedo has to offer.\n\nShould you have any questions, feel free to reach out. We're here to help!\n\nBest regards,\nThe Albedo Team\n\n--------------------------------------\nIn Partnership with the Web3 Builders Alliance (WBA)`,
    
    `<h1>Welcome to Albedo, ${email}!</h1><p>We're excited to have you join our community. You can now start exploring some of the features and benefits that Albedo has to offer.</p><p>Should you have any questions, feel free to reach out. We're here to help!</p><br><p>Best regards,</p><p>The Albedo Team</p><hr><p><strong>In Partnership with the Web3 Builders Alliance (WBA)</strong></p><img src="${wbaLogoUrl}" alt="Web3 Builders Alliance Logo" width="150">`
  );
    
    res.status(201).json({ message: 'User created', email });
  };