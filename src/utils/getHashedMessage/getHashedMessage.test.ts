import getHashedMessage from '.';
import { mockDigest } from 'setupTests';

describe('getHashedMessage', () => {
  const mockMessage = 'abcd';

  it('should hash a message correctly', async () => {
    mockDigest.mockImplementation(async () => {
      return new Uint8Array([97, 98, 99, 100]).buffer;
    });

    // '61' = hexadecimal value 97 = ASCII code for the character 'a'
    // '62' = hexadecimal value 98 = ASCII code for the character 'b'
    // '63' = hexadecimal value 99 = ASCII code for the character 'c'
    // '64' = hexadecimal value 100 = ASCII code for the character 'd'
    const expectedHash = '61626364';

    const hash = await getHashedMessage(mockMessage);
    expect(hash).toBe(expectedHash);
  });

  it('should handle errors during the hashing process', async () => {
    mockDigest.mockRejectedValue(new Error('Hashing error'));
    const consoleErrorSpy = jest.spyOn(console, 'error');

    const hash = await getHashedMessage(mockMessage);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Hashing process failed: Hashing error',
    );
    expect(hash).toBeNull();

    // Clean up the spy
    consoleErrorSpy.mockRestore();
  });
});
