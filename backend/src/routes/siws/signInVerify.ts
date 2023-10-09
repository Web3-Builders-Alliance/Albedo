import type { SolanaSignInInput, SolanaSignInOutput, SolanaSignMessageInput, SolanaSignMessageOutput } from '@solana/wallet-standard-features';
import { ed25519 } from '@noble/curves/ed25519';

/**
* TODO: docs
*/
export function verifySignIn(input: SolanaSignInInput, output: SolanaSignInOutput): boolean {
  const {
      signedMessage,
      signature,
      account: { publicKey },
  } = output;
  
  const message = deriveSignInMessage(input, output);
  
  return !!message && verifyMessageSignature({ message, signedMessage, signature, publicKey });
}

/**
* TODO: docs
*/
export function deriveSignInMessage(input: SolanaSignInInput, output: SolanaSignInOutput): Uint8Array | null {
  const text = deriveSignInMessageText(input, output);
  if (!text) return null;
  return new TextEncoder().encode(text);
}

/**
* TODO: docs
*/

export function deriveSignInMessageText(input: SolanaSignInInput, output: SolanaSignInOutput):
string | null {
  console.log("Check the Signed Message Format:", new TextDecoder().decode(output.signedMessage));
  const parsed = parseSignInMessage(output.signedMessage);
  if (!parsed) {
    console.log("Debug: Failed at parsing signInMessage.");
    return null;
  }
  
  if (input.domain && input.domain !== parsed.domain) {
    console.log("Debug: Mismatch in domain. Expected:", input.domain, "Got:", parsed.domain);
    return null;
  }
  if (input.address && input.address !== parsed.address) {
    console.log("Debug: Mismatch in address. Expected:", input.address, "Got:", parsed.address);
    return null;
  }

  return createSignInMessageText(parsed);
}

/**
* TODO: docs
*/
export type SolanaSignInInputWithRequiredFields = SolanaSignInInput &
Required<Pick<SolanaSignInInput, 'domain' | 'address'>>;

/**
* TODO: docs
*/

export function parseSignInMessage(message: Uint8Array): SolanaSignInInputWithRequiredFields | null {
  const text = new TextDecoder().decode(message);
  return parseSignInMessageText(text);
}

// TODO: implement https://github.com/solana-labs/solana/blob/master/docs/src/proposals/off-chain-message-signing.md

// Modified version of the original SDK to include "only" the required fields
const DOMAIN = '(?<domain>[^\\n]+?) wants you to sign in with your Solana account:\\n';
const ADDRESS = '(?<address>[^\\n]+)(?:\\n|$)';
const MESSAGE = new RegExp(`^${DOMAIN}${ADDRESS}`);

/**
* TODO: docs
*/

export function parseSignInMessageText(text: string): SolanaSignInInputWithRequiredFields | null {
  const match = MESSAGE.exec(text);
  if (!match) return null;
  const groups = match.groups;
  if (!groups) return null;

  return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      domain: groups.domain!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      address: groups.address!,
      statement: groups.statement,
      uri: groups.uri,
      version: groups.version,
      nonce: groups.nonce,
      chainId: groups.chainId,
      issuedAt: groups.issuedAt,
      expirationTime: groups.expirationTime,
      notBefore: groups.notBefore,
      requestId: groups.requestId,
      resources: groups.resources?.split('\n- ').slice(1),
  };
}

/**
* TODO: docs
*/
export function createSignInMessage(input: SolanaSignInInputWithRequiredFields): Uint8Array {
  const text = createSignInMessageText(input);
  return new TextEncoder().encode(text);
}

/**
* TODO: docs
*/
export function createSignInMessageText(input: SolanaSignInInputWithRequiredFields): string {
  // ${domain} wants you to sign in with your Solana account:
  // ${address}
  //
  // ${statement}
  //
  // URI: ${uri}
  // Version: ${version}
  // Chain ID: ${chain}
  // Nonce: ${nonce}
  // Issued At: ${issued-at}
  // Expiration Time: ${expiration-time}
  // Not Before: ${not-before}
  // Request ID: ${request-id}
  // Resources:
  // - ${resources[0]}
  // - ${resources[1]}
  // ...
  // - ${resources[n]}
  
  let message = `${input.domain} wants you to sign in with your Solana account:\n`;
  message += `${input.address}`;
  
  if (input.statement) {
    message += `\n\n${input.statement}`;
  }
  
  const fields: string[] = [];
  if (input.uri) {
    fields.push(`URI: ${input.uri}`);
  }
  if (input.version) {
    fields.push(`Version: ${input.version}`);
  }
  if (input.chainId) {
    fields.push(`Chain ID: ${input.chainId}`);
  }
  if (input.nonce) {
    fields.push(`Nonce: ${input.nonce}`);
  }
  if (input.issuedAt) {
    fields.push(`Issued At: ${input.issuedAt}`);
  }
  if (input.expirationTime) {
    fields.push(`Expiration Time: ${input.expirationTime}`);
  }
  if (input.notBefore) {
    fields.push(`Not Before: ${input.notBefore}`);
  }
  if (input.requestId) {
    fields.push(`Request ID: ${input.requestId}`);
  }
  if (input.resources) {
    fields.push(`Resources:`);
    for (const resource of input.resources) {
      fields.push(`- ${resource}`);
    }
  }
  if (fields.length) {
    message += `\n\n${fields.join('\n')}`;
  }
  
  return message;
}

export function verifyMessageSignature({
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
  // TODO: implement https://github.com/solana-labs/solana/blob/master/docs/src/proposals/off-chain-message-signing.md
  
  return bytesEqual(message, signedMessage) && ed25519.verify(signature, signedMessage, publicKey);
}

/**
* TODO: docs
*/
export function verifySignMessage(input: SolanaSignMessageInput, output: SolanaSignMessageOutput): boolean {
  const {
    message,
    account: { publicKey },
  } = input;
  const { signedMessage, signature } = output;
  return verifyMessageSignature({ message, signedMessage, signature, publicKey });
}

/**
* @internal
*
* Type with a numeric `length` and numerically indexed elements of a generic type `T`.
*
* For example, `Array<T>` and `Uint8Array`.
*
* @group Internal
*/
export interface Indexed<T> {
  length: number;
  [index: number]: T;
}

/**
* @internal
*
* Efficiently compare {@link Indexed} arrays (e.g. `Array` and `Uint8Array`).
*
* @param a An array.
* @param b Another array.
*
* @return `true` if the arrays have the same length and elements, `false` otherwise.
*
* @group Internal
*/
export function arraysEqual<T>(a: Indexed<T>, b: Indexed<T>): boolean {
  if (a === b) return true;
  
  const length = a.length;
  if (length !== b.length) return false;
  
  for (let i = 0; i < length; i++) {
    if (a[i] !== b[i]) return false;
  }
  
  return true;
}

/**
* @internal
*
* Efficiently compare byte arrays, using {@link arraysEqual}.
*
* @param a A byte array.
* @param b Another byte array.
*
* @return `true` if the byte arrays have the same length and bytes, `false` otherwise.
*
* @group Internal
*/
export function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
  return arraysEqual(a, b);
}