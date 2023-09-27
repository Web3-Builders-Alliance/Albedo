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
    console.log("Debug: Full request body:", req.body);  // Log the full request body
    const { input, output } = req.body;  // Destructure incoming payload
    console.log("Debug: Received at Backend - input:", input, "output:", output);

  // Validate payload
  if (!input) {
    console.error("Debug: Missing input."); // More specific logging
    return res.status(400).json({ message: "Missing required parameter 'input'." });
  }

  if (!output) {
    console.error("Debug: Missing output."); // More specific logging
    return res.status(400).json({ message: "Missing required parameter 'output'." });
  }

    console.log("Debug: Before verification - input:", input, "output:", output);
    const isValid = verifySIWS(input, output);  // Your custom SIWS verification logic

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