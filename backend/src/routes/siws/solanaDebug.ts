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
  
  // Log the raw signedMessage
  console.log("Inside verifySignIn - Raw signedMessage (Uint8Array):", signedMessage);
  
  // Decode and log the signedMessage
  const interpretedMessage = new TextDecoder().decode(signedMessage);
  console.log("Inside verifySignIn - Interpreted Message (decoded):", interpretedMessage);
  
  // Reconstruct the original message using the input object
  const resourcesString = input.resources ? input.resources.map(res => `- ${res}`).join('\n') : '';
  const reconstructedMessage = `${input.domain} wants you to sign in with your Solana account:\n${input.address}\n${input.statement}\nVersion: ${input.version}\nChain ID: ${input.chainId}\nNonce: ${input.nonce}\nIssued At: ${input.issuedAt}\nResources:\n${resourcesString}`;
  
  // Compare the reconstructed message with the interpreted message
  if (interpretedMessage !== reconstructedMessage) {
    console.error("Mismatch detected!");
    console.log("Interpreted Message:", interpretedMessage);
    console.log("Reconstructed Message:", reconstructedMessage);
  } else {
    console.log("Messages match!");
  }
  
  //* Debug: Verify the Address in the Input Data
  console.log("Debug: Address in input:", input.address);
  
  //! Critical part that is failing is input vs parsed output
  const message = deriveSignInMessage(input, output);
  if (message) {
    console.log("Derived message (from SDK):", new TextDecoder().decode(message));
  } else {
    console.log("Derived message (from SDK) is null");
  }
  
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
  if (input.statement !== parsed.statement) {
    console.log("Debug: Mismatch in statement length. Expected length:", input.statement, "Got", parsed.statement);
    return null;
  }
  if (input.uri !== parsed.uri) {
    console.log("Debug: Mismatch in uri. Expected:", input.uri, "Got:", parsed.uri);
    return null;
  }
  if (input.version !== parsed.version) {
    console.log("Debug: Mismatch in version. Expected:", input.version, "Got:", parsed.version);
    return null;
  }
  if (input.chainId !== parsed.chainId) {
    console.log("Debug: Mismatch in chainId. Expected:", input.chainId, "Got:", parsed.chainId);
    return null;
  }
  if (input.nonce !== parsed.nonce) {
    console.log("Debug: Mismatch in nonce. Expected:", input.nonce, "Got:", parsed.nonce);
    return null;
  }
  if (input.issuedAt !== parsed.issuedAt) {
    console.log("Debug: Mismatch in issuedAt. Expected:", input.issuedAt, "Got:", parsed.issuedAt);
    return null;
  }
  if (input.expirationTime !== parsed.expirationTime) {
    console.log("Debug: Mismatch in expirationTime. Expected:", input.expirationTime, "Got:", parsed.expirationTime);
    return null;
  }
  if (input.notBefore !== parsed.notBefore) {
    console.log("Debug: Mismatch in notBefore. Expected:", input.notBefore, "Got:", parsed.notBefore);
    return null;
  }
  if (input.requestId !== parsed.requestId) {
    console.log("Debug: Mismatch in requestId. Expected:", input.requestId, "Got:", parsed.requestId);
    return null;
  }
  if (input.resources) {
    if (!parsed.resources) {
      console.log("Debug: No parsed resources found");
      return null;
    }
    if (!arraysEqual(input.resources, parsed.resources)) {
      console.log("Debug: Mismatch in resources. Expected:", input.resources, "Got:", parsed.resources);
      return null;
    }
  } else if (parsed.resources) {
    console.log("Debug: Input doesn't have resources, but parsed message does.");
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
  console.log("Provided message to parseSignInMessage:", message);
  const text = new TextDecoder().decode(message);
  console.log("Inside parseSignInMessage - decoded text:", text);
  return parseSignInMessageText(text);
}

// TODO: implement https://github.com/solana-labs/solana/blob/master/docs/src/proposals/off-chain-message-signing.md
const DOMAIN = '(?<domain>[^\\n]+?) wants you to sign in with your Solana account:\\n';
const ADDRESS = '(?<address>[^\\n]+)(?:\\n|$)';
const STATEMENT = '(?:\\n(?<statement>[\\S\\s]*?)(?:\\n|$))??';
const URI = '(?:\\nURI: (?<uri>[^\\n]+))?';
const VERSION = '(?:\\nVersion: (?<version>[^\\n]+))?';
const CHAIN_ID = '(?:\\nChain ID: (?<chainId>[^\\n]+))?';
const NONCE = '(?:\\nNonce: (?<nonce>[^\\n]+))?';
const ISSUED_AT = '(?:\\nIssued At: (?<issuedAt>[^\\n]+))?';
const EXPIRATION_TIME = '(?:\\nExpiration Time: (?<expirationTime>[^\\n]+))?';
const NOT_BEFORE = '(?:\\nNot Before: (?<notBefore>[^\\n]+))?';
const REQUEST_ID = '(?:\\nRequest ID: (?<requestId>[^\\n]+))?';
const RESOURCES = '(?:\\nResources:(?<resources>(?:\\n- [^\\n]+)*))?';
const FIELDS = `${URI}${VERSION}${CHAIN_ID}${NONCE}${ISSUED_AT}${EXPIRATION_TIME}${NOT_BEFORE}${REQUEST_ID}${RESOURCES}`;
const MESSAGE = new RegExp(`^${DOMAIN}${ADDRESS}${STATEMENT}${FIELDS}\\n*$`);

/**
* TODO: docs
*/
export function parseSignInMessageText(text: string): SolanaSignInInputWithRequiredFields | null {
  console.log("Parsing text in parseSignInMessageText:", text);
  // 1. Basic check: Match domain and address
  const SIMPLE_MESSAGE = /^(?<domain>[^\n]+?) wants you to sign in with your Solana account:\n(?<address>[^\n]+)/;
  const simpleMatch = SIMPLE_MESSAGE.exec(text);
  
  // After the simple match:
  if (simpleMatch && !simpleMatch.groups?.address) {
    console.log("Debug: Address not found in simple match!");
  } else {
    console.log("Debug: Failed to extract the statement using STATEMENT_ONLY_REGEX.");
  }
  
  if (!simpleMatch) {
    console.log("Debug: Simple regex match failed for domain and address!");
    return null;
  } else {
    console.log("Debug: Simple regex matched. Domain:", simpleMatch.groups?.domain, "Address:", simpleMatch.groups?.address);
  }
  
  // 2. Advanced match: Domain, address, statement, version, chainId, nonce, issuedAt
  const DOMAIN_ADDRESS_STATEMENT = /^(?<domain>[^\n]+?) wants you to sign in with your Solana account:\n(?<address>[^\n]+)\n(?<statement>[^\n]+)\nVersion: (?<version>\d+)\nChain ID: (?<chainId>[^\n]+)\nNonce: (?<nonce>[^\n]+)\nIssued At: (?<issuedAt>[^\n]+)\nResources:\n(?<resources>[\S\s]+)$/;
  
  const match = DOMAIN_ADDRESS_STATEMENT.exec(text);
  
  if (match) {
    console.log("Debug: DOMAIN_ADDRESS_STATEMENT matched. Domain:", match.groups?.domain, "Address:", match.groups?.address, "Statement:", match.groups?.statement);
  } else {
    console.log("Debug: DOMAIN_ADDRESS_STATEMENT did not match.");
  }
  
  // 3. Check for the existence of the "Authentication statement."
  if (/Authentication statement\./.test(text)) {
    console.log("Debug: Basic 'Authentication statement.' match found!");
  } else {
    console.log("Debug: Basic 'Authentication statement.' match NOT found!");
  }
  
  // 4. If advanced match doesn't capture the statement, let's try a specific regex for it
  if (!match?.groups?.statement) {
    const STATEMENT_ONLY_REGEX = /(?:\n(?<statement>[a-zA-Z\s\.]+?)(?:\n|$))/;
    const statementMatch = STATEMENT_ONLY_REGEX.exec(text);
    
    if (statementMatch && statementMatch.groups?.statement) {
      console.log("Debug: Extracted Statement using STATEMENT_ONLY_REGEX:", statementMatch.groups.statement);
    } else {
      console.log("Debug: Failed to extract the statement using STATEMENT_ONLY_REGEX.");
    }
  }
  
  // After the advanced match:
  if (match && !match.groups?.address) {
    console.log("Debug: Address not found in advanced match!");
  }
  
  // 5. Main verification: If there's no match for the main regex, exit
  if (!match) {
    console.log("No regex match found.");
    return null;
  }
  
  // 6. Construct and return the result
  const groups = match.groups;
  if (!groups || !groups.domain || !groups.address) {
    console.log("Critical groups (domain or address) not found.");
    return null;
  }
  
  // 7. Verification of resources
  let resourcesList: string[] = [];
  if (match && match.groups && match.groups.resources) {
    resourcesList = match.groups.resources.split('\n').map(res => res.replace('- ', '')).filter(Boolean);
    console.log("Debug: Received Resources:", resourcesList);
  }
  
  const result = {
    domain: groups.domain,
    address: groups.address,
    statement: groups.statement.trim(),
    uri: groups.uri,
    version: groups.version,
    nonce: groups.nonce,
    chainId: groups.chainId,
    issuedAt: groups.issuedAt,
    expirationTime: groups.expirationTime,
    notBefore: groups.notBefore,
    requestId: groups.requestId,
    resources: resourcesList
  };
  
  if (!result.address) {
    console.log("Debug: Address is missing in the final result object!");
  }
  
  return result;
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
  
  // Confirm function execution
  console.log("verifyMessageSignature called!");
  
  //* Debug: Validate `bytesEqual` function
  console.log("Decoded Message:", new TextDecoder().decode(message));
  console.log("Message bytes:", [...message]);
  
  console.log("Decoded SignedMessage:", new TextDecoder().decode(signedMessage));
  console.log("SignedMessage bytes:", [...signedMessage]);
  
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