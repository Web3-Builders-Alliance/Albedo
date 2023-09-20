import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { sendEmail } from '../sendEmail';
import { v4 as uuidv4 } from 'uuid';

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

  // Generate a unique token for email verification
  const verificationToken = uuidv4();

  // Add new user
  users.push({ email, password, token: verificationToken });
  fs.writeFileSync(usersPath, JSON.stringify(users));

  // WBA logo for email signature
  const wbaLogoUrl = 'https://avatars.githubusercontent.com/u/109991700?s=200&v=4';

  
  // Send a verification email with the token
  const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;
  
  sendEmail(
    email, // to
    'Welcome to Albedo', // subject
    
    // text (fallback)
    `Welcome to Albedo, ${email}!\n\nWe're excited to have you join our community. You can now start exploring all the features and benefits that Albedo has to offer.\n\nTo get started, please verify your email address by clicking the following link: ${verificationLink}\n\nShould you have any questions, feel free to reach out. We're here to help!\n\nBest regards,\nThe Albedo Team\n\n--------------------------------------\nIn Partnership with the Web3 Builders Alliance (WBA)`,
    
    // html
    `<h1>Welcome to Albedo, ${email}!</h1><p>We're excited to have you join our community. You can now start exploring some of the features and benefits that Albedo has to offer.</p><p>To get started, <a href="${verificationLink}">please verify your email address</a>.</p><p>Should you have any questions, feel free to reach out. We're here to help!</p><br><p>Best regards,</p><p>The Albedo Team</p><hr><p><strong>In Partnership with the Web3 Builders Alliance (WBA)</strong></p><img src="${wbaLogoUrl}" alt="Web3 Builders Alliance Logo" width="150">`
  );
    
    res.status(201).json({ message: 'User created', email });
  };