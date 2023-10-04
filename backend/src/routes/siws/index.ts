import express, { Response, Request } from 'express';
import { createSignInData } from './signInInput';
import { verifySIWS } from './verifyOutput';

const router = express.Router();

const sendError = (res: Response, message: string, status: number = 400): void => {
  res.status(status).json({ message });
};

const validatePayload = (payload: Record<string, any>, fields: string[]): boolean => {
  return fields.every(field => field.split('.').reduce((obj, key) => obj?.[key], payload) !== undefined);
};

// Endpoint for generating sign-in input
router.get('/signInInput', async (req: Request, res: Response) => {
  try {
    const signInInput = await createSignInData();
    res.json(signInInput);
  } catch (error: unknown) {
    console.error(error);
    sendError(res, 'Failed to create sign-in input.', 500);
  }
});

router.post('/verifyOutput', async (req: Request, res: Response) => {
  // Validate payload
  const requiredFields = ['input', 'output.account', 'output.signature'];
  if (!validatePayload(req.body, requiredFields)) {
    return sendError(res, "Missing required fields in payload");
  }
  
  const { input, output } = req.body;
  console.log("Incoming Payload:", req.body);
  
  try {
    if (!input || !output) {
      return sendError(res, "Missing input or output fields in payload");
    }
    
    // Convert objects back to Uint8Array
    output.account.publicKey = new Uint8Array(Object.values(output.account.publicKey));
    output.signature = new Uint8Array(Object.values(output.signature));
    output.signedMessage = new Uint8Array(Object.values(output.signedMessage));

    // Log before verifying
    console.log("Backend: publicKey is Uint8Array", output.account.publicKey instanceof Uint8Array);
    console.log("Backend: signature is Uint8Array", output.signature instanceof Uint8Array);
    console.log("Backend: signedMessage is Uint8Array", output.signedMessage instanceof Uint8Array);
    
    console.log("Debug: Value of signedMessage", output.signedMessage);
    
    // Call verifySIWS function
    const isVerified = await verifySIWS(input, output);
    
    // Additional logging for troubleshooting
    console.log('Debug: Verification Result:', isVerified);
    
    if (isVerified) {
      res.status(200).json({ message: 'Verification successful', success: true });
    } else {
      res.status(400).json({ message: 'Verification failed', success: false });
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    sendError(res, 'An unexpected error occurred', 500);
  }
});

export default router;