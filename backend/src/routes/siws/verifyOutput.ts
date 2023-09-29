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

    // Log the inputs right before calling verifySignIn
    console.log("Debug: Input to verifySignIn:", JSON.stringify(input));
    console.log("Debug: SerialisedOutput to verifySignIn:", JSON.stringify(serialisedOutput));

    // Verify the inputs
    return verifySignIn(input, serialisedOutput);
  } catch (error) {
    // Log the error along with its properties
    console.error("Error in verifySIWS: ", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return false;
  }
}