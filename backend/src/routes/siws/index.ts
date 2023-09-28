import express from 'express';
import { createSignInData } from './signInInput';
import { verifySIWS } from './verifyOutput';

const router = express.Router();

// Endpoint for generating sign-in input
router.get('/signInInput', async (req, res) => {
  try {
    const signInInput = await createSignInData();
    console.log("Debug: Generated signInInput ->", signInInput);
    console.log("Debug: Serialized signInInput ->", JSON.stringify(signInInput));
    res.json(signInInput);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create sign-in input.' });
  }
});

// Verify sign-in output
router.post('/verifyOutput', (req, res) => {
  try {
    // Logging the entire request body for debugging purposes
    console.log("Debug: Entered try block");
    console.log("Debug: Full request body:", req.body);

    // Destructure incoming payload
    const { input, output } = req.body;

    // Log the received data for debugging
    console.log("Debug: Received at Backend - input:", input, "output:", output);

    // Log types of input and output
    console.log(`Debug: Type of input: ${typeof input}, Type of output: ${typeof output}`);

    // Before verifySIWS function call
    console.log("Before verifySIWS - Output signature content:", output.signature);

    // Your custom SIWS verification logic
    const isValid = verifySIWS(input, output);

    // After verifySIWS function call
    console.log("After verifySIWS - Output signature content:", output.signature);

    // Sending back validation result
    if (isValid) {
      return res.json({ success: true });
    } else {
      console.error("Debug: Invalid sign-in data."); // More specific logging
      return res.status(400).json({ success: false, message: "Invalid sign-in data" });
    }
  } catch (error) {
    console.error("Error in verifyOutput:", error);
    return res.status(500).json({ message: 'Failed to verify sign-in output.' });
  }
});

export default router;