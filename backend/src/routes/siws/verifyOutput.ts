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

    // Debug: Log types and lengths of original objects
    console.log("Debug: Original types and lengths");
    console.log("Debug: Type of publicKey:", typeof publicKey, "Length:", publicKey.length);
    console.log("Debug: Type of signature:", typeof output.signature, "Length:", output.signature.length);
    console.log("Debug: Type of signedMessage:", typeof output.signedMessage, "Length:", output.signedMessage.length);

    const serializedOutput: SolanaSignInOutput = {
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

    // Debug: Log types and lengths of serialized objects
    console.log("Debug: Serialized types and lengths");
    console.log("Debug: Type of publicKey:", typeof serializedOutput.account.publicKey, "Length:", serializedOutput.account.publicKey.length);
    console.log("Debug: Type of signature:", typeof serializedOutput.signature, "Length:", serializedOutput.signature.length);
    console.log("Debug: Type of signedMessage:", typeof serializedOutput.signedMessage, "Length:", serializedOutput.signedMessage.length);

    // Log the inputs right before calling verifySignIn
    console.log("Debug: Input to verifySignIn:", JSON.stringify(input));
    console.log("Debug: SerializedOutput to verifySignIn:", JSON.stringify(serializedOutput));

    // Verify the inputs
    return verifySignIn(input, serializedOutput);
  } catch (error) {
    // Log the error along with its properties
    console.error("Error in verifySIWS: ", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return false;
  }
}