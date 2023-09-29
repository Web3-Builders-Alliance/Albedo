import express from 'express';
import { createSignInData } from './signInInput';
import { verifySIWS } from './verifyOutput';
import { deriveSignInMessage, createSignInMessageText } from "@solana/wallet-standard-util";
import { ed25519 } from '@noble/curves/ed25519';

function mockVerifyMessageSignature({
  message,
  signedMessage,
  signature,
  publicKey,
}: {
  message: Uint8Array;
  signedMessage: Uint8Array;
  signature: Uint8Array;
  publicKey: Uint8Array;
}): boolean {
  console.log("Checking if message equals signedMessage:", bytesEqual(message, signedMessage));
  console.log("Verifying signature against signedMessage and publicKey:", ed25519.verify(signature, signedMessage, publicKey));
  
  return bytesEqual(message, signedMessage) && ed25519.verify(signature, signedMessage, publicKey);
}

// Helper function to check if two Uint8Arrays are equal
function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}

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

router.post('/verifyOutput', async (req, res) => {
  try {
    // Destructure incoming payload
    const { input, output } = req.body;
    console.log("Received address:", output.account.address);  // <-- Log this

    // Validate the essential parts of the payload
    if (!input || !output) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    // Recreate the message
    const reconstructedMessage = createSignInMessageText({
      ...(input as any),
      address: output.account.address
    });
    console.log("Backend - Reconstructed Message:", reconstructedMessage);

    // Ensure types are correct for the verification process
    if (Array.isArray(output.signature)) {
        output.signature = new Uint8Array(output.signature);
    }
    if (Array.isArray(output.signedMessage)) {
        output.signedMessage = new Uint8Array(output.signedMessage);
    }
    if (Array.isArray(output.account.publicKey)) {
        output.account.publicKey = new Uint8Array(output.account.publicKey);
    }

    // Logging Signature and Public Key
    console.log("Backend - Signature received:", output.signature);
    console.log("Backend - Public Key for verification:", output.account.publicKey);

    const derivedMessage = deriveSignInMessage(input, output);
    
    if (!derivedMessage) {
        console.log("Error: deriveSignInMessage returned null.");
        res.status(400).send("Verification failed: Unable to derive message.");
        return;
    }

    // Temporary: Using mock verification for testing
    const isValid = mockVerifyMessageSignature({
        message: derivedMessage,
        signedMessage: output.signedMessage,
        signature: output.signature,
        publicKey: output.account.publicKey // <-- It's already a Uint8Array
    });

    // Respond based on verification result
    if (isValid) {
      return res.json({ success: true });
    } else {
      throw new Error("Invalid sign-in data");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in verifyOutput: ${error.message}`);
      res.status(error.message === 'Invalid sign-in data' ? 400 : 500).json({ message: error.message });
    } else {
      console.error("An unknown error occurred in verifyOutput.");
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
});

export default router;