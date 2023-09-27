import type {
  SolanaSignInInput,
  SolanaSignInOutput,
} from "@solana/wallet-standard-features";
import { verifySignIn } from "@solana/wallet-standard-util";

export function verifySIWS(
  input: SolanaSignInInput,
  output: SolanaSignInOutput
): boolean {
  try {
    // Logging the type of output.signature for debugging purposes
    console.log("Type of output.signature: ", typeof output.signature);
    const { publicKey, ...restAccount } = output.account;
    const serialisedOutput: SolanaSignInOutput = {
      account: {
        publicKey: new Uint8Array(publicKey),
        ...restAccount
      },
      signature: new Uint8Array(output.signature),
      signedMessage: new Uint8Array(output.signedMessage),
    };
    return verifySignIn(input, serialisedOutput);
  } catch (error) {
    // Logging any errors
    console.error("Error in verifySIWS: ", error);
    return false;
  }
}