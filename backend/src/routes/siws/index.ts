import express from 'express';
import { createSignInData } from './signInInput'; 
import { verifySIWS } from './verifyOutput';

const router = express.Router();

// Create sign-in input
router.get('/signInInput', async (req, res) => {
  try {
    const signInInput = await createSignInData();
    res.json(signInInput);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create sign-in input.' });
  }
});

// Verify sign-in output
router.post('/verifyOutput', (req, res) => {
  try {
    console.log("Inside verifyOutput route");  // Logging for debug
    
    const { input, output } = req.body;  // Destructure incoming payload
    
    // Validate payload
    if (!input || !output) {
      return res.status(400).json({ message: "Missing required parameters 'input' and/or 'output'." });
    }

    const isValid = verifySIWS(input, output);  // Your custom SIWS verification logic

    // Sending back validation result
    if (isValid) {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "Invalid sign-in data" });
    }
  } catch (error) {
    console.error("Error in verifyOutput:", error);
    return res.status(500).json({ message: 'Failed to verify sign-in output.' });
  }
});

export default router;