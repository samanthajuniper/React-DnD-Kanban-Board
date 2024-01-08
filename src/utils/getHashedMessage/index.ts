/**
 * Computes the SHA-256 hash of a given message asynchronously.
 *
 * @param message - The message to be hashed.
 * @returns A hexadecimal representation of the SHA-256 hash of the message, or null if an error occurs.
 */

const getHashedMessage = async (message: string) => {
  // Create a TextEncoder to encode the message
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  try {
    // Use the crypto.subtle API to compute the SHA-256 hash
    const buffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash buffer to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
  } catch (error: any) {
    // Handle errors and log a message in case of failure
    console.error('Hashing process failed: ' + error.message);
    return null;
  }
};

export default getHashedMessage;
