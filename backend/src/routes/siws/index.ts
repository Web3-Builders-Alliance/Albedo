import express from 'express';
import { createSignInData } from './signInInput';
import { verifySIWS } from './verifyOutput';

const router = express.Router();

const sendError = (res, message, status = 400) => res.status(status).json({ message });

const validatePayload = (payload, fields) => fields.every(field => payload.hasOwnProperty(field));

// Endpoint for generating sign-in input
router.get('/signInInput', async (req, res) => {
  try {
    const signInInput = await createSignInData();
    res.json(signInInput);
  } catch (error) {
    console.error(error);
    sendError(res, 'Failed to create sign-in input.', 500);
  }
});

router.post('/verifyOutput', async (req, res) => {
  // Validate payload
  const requiredFields = ['input', 'output', 'signature', 'account'];
  if (!validatePayload(req.body, requiredFields)) {
    return sendError(res, "Missing required fields in payload");
  }
  
  const { input, output } = req.body;
  
  try {
    const signedMessageUint8Array = new Uint8Array(Object.values(output.signedMessage));
    
    const isValid = await verifySIWS(input, {
      ...output,
      signedMessage: signedMessageUint8Array,
    });
    
    if (isValid) {
      return res.json({ success: true });
    } else {
      throw new Error("Invalid sign-in data");
    }
  } catch (err) {
    console.error(err);
    sendError(res, err.message, 500);
  }
});

export default router;