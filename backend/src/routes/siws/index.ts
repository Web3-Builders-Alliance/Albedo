import express, { Response, Request } from 'express';
import { createSignInData } from './signInInput';
import { verifySIWS } from './verifyOutput';

const router = express.Router();

const sendError = (res: Response, message: string, status: number = 400): void => {
  res.status(status).json({ message });
};

const validatePayload = (payload: Record<string, unknown>, fields: string[]): boolean => {
  const isValid = fields.every(field => payload.hasOwnProperty(field));
  if (!isValid) {
    console.log("Invalid Payload:", payload);
    console.log("Missing Fields:", fields.filter(field => !payload.hasOwnProperty(field)));
  }
  return isValid;
};

// A utility function to convert a comma-separated string to Uint8Array
const toUint8Array = (str: string): Uint8Array => {
  const arr = str.split(',').map(Number);
  console.log("Converted array:", arr);
  return new Uint8Array(arr);
};

// Endpoint for generating sign-in input
router.get('/signInInput', async (req: Request, res: Response) => {
  try {
    const signInInput = await createSignInData();
    res.json(signInInput);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      sendError(res, 'Failed to create sign-in input.', 500);
    }
  }
});

router.post('/verifyOutput', async (req: Request, res: Response) => {
  // Validate payload
  const requiredFields = ['input', 'output', 'signature', 'account'];
  if (!validatePayload(req.body, requiredFields)) {
    return sendError(res, "Missing required fields in payload");
  }
  
  try {
    // Log the raw API payload
    console.log("Raw API Payload:", req.body);
    console.log("signedMessage in output:", req.body.output.signedMessage);

    // Assuming the payload comes in a field named 'payload', adjust as needed
    const payload = req.body;
    
    // Debug to check the integrity of the received payload
    console.log("Debug: Full Payload:", JSON.stringify(payload, null, 2));
    
    // Debug to check individual suspicious fields
    console.log("Debug: signedMessage:", payload.signedMessage);
    console.log("Debug: signature:", payload.signature);
    console.log("Debug: publicKey:", payload.account ? payload.account.publicKey : "account object is missing");

    // Manually convert comma-separated strings to Uint8Array where needed
    payload.output.signedMessage = toUint8Array(payload.output.signedMessage as string);
    payload.output.signature = toUint8Array(payload.output.signature as string);
    payload.output.publicKey = toUint8Array(payload.output.publicKey as string);
    
    // Log the modified payload
    console.log("Modified Payload:", payload);
    
    // Call verifySIWS function (or however it's named in your setup)
    const isVerified = await verifySIWS(payload.input, payload.output);
    
    if (isVerified) {
      res.status(200).send("Verification successful");
    } else {
      res.status(401).send("Verification failed");
    }
    
  } catch (error) {
    console.error("Error type:", typeof error);
    console.error("Error content:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;