import express, { Response, Request } from 'express';
import { createSignInData } from './signInInput';
import { verifySIWS } from './verifyOutput';

const router = express.Router();

const sendError = (res: Response, message: string, status: number = 400): void => {
  res.status(status).json({ message });
};

const validatePayload = (payload: Record<string, any>, fields: string[]): boolean => {
  return fields.every(field => {
    const keys = field.split('.');
    let obj: any = payload;
    
    for (let key of keys) {
      obj = obj?.[key];
    }
    
    return obj !== undefined;
  });
};

// A utility function to convert a comma-separated string to Uint8Array
const toUint8Array = (str: unknown): Uint8Array | null => {
  if (typeof str !== 'string') {
    console.error('Expected string input for toUint8Array');
    return null;
  }
  const arr = str.split(',').map(Number);
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
  const requiredFields = ['input', 'output.account', 'output.signature'];
  if (!validatePayload(req.body, requiredFields)) {
    return sendError(res, "Missing required fields in payload");
  }
  
  try {
    // Log the raw API payload
    console.log("Raw API Payload:", req.body);
    console.log("signedMessage in output:", req.body.output.signedMessage);
    
    // Assuming the payload comes in a field named 'payload', adjust as needed
    const {input, output } = req.body;
    
    if (!input || !output) {
      return sendError(res, "Missing input or output fields in payload");
    }
    
    // Debug to check individual suspicious fields
    console.log("Debug: signedMessage:", output.signedMessage);
    console.log("Debug: signature:", output.signature);
    console.log("Debug: publicKey:", output.account ? output.account.publicKey : "account object is missing");
    
    // Log the modified payload
    console.log("Modified Payload:", output);
    const requiredFields = ['input', 'output', 'signature', 'account'];
    if (!validatePayload(output, requiredFields)) {
      return sendError(res, "Missing required fields in payload");
    }
    
    // Manually convert comma-separated strings to Uint8Array where needed
    if (typeof output.signedMessage === 'string') {
      output.signedMessage = toUint8Array(output.signedMessage);
    } else {
      console.error('Unexpected type for signedMessage');
    }

    if (typeof output.signature === 'string') {
      output.signature = toUint8Array(output.signature);
    } else {
      console.error('Unexpected type for signature');
    }

    if (typeof output.publicKey === 'string') {
      output.signature = toUint8Array(output.publicKey);
    } else {
      console.error('Unexpected type for public key');
    }
    
    // Call verifySIWS function (or however it's named in your setup)
    const isVerified = await verifySIWS(input, output);
    
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