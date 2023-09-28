import type {
  SolanaSignInInput,
  SolanaSignInOutput,
} from "@solana/wallet-standard-features";
import { verifySignIn, deriveSignInMessage, verifyMessageSignature } from "@solana/wallet-standard-util";

export function verifySIWS(
  input: SolanaSignInInput,
  output: SolanaSignInOutput
): boolean {
  try {
    const { publicKey, ...restAccount } = output.account;

    const serialisedOutput: SolanaSignInOutput = {
      account: {
        publicKey: output.account.publicKey instanceof Uint8Array ? 
                  output.account.publicKey : 
                  new Uint8Array(Object.values(output.account.publicKey)),
        ...restAccount
      },
      signature: output.signature instanceof Uint8Array ? 
                output.signature : 
                new Uint8Array(Object.values(output.signature)),
      signedMessage: output.signedMessage instanceof Uint8Array ? 
                    output.signedMessage : 
                    new Uint8Array(Object.values(output.signedMessage)),
    };
    // Verification process
    return verifySignIn(input, serialisedOutput);
  } catch (error) {
    
    // Logging any errors
    console.error("Error in verifySIWS: ", error);
    return false;
  }
}