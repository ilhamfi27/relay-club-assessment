import { hashString } from './hash';

describe('hashString', () => {
  it('should hash the input string using sha256 algorithm', () => {
    // Arrange
    const inputString = 'password123';
    const expectedHash =
      'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f';

    // Act
    const actualHash = hashString(inputString);

    // Assert
    expect(actualHash).toBe(expectedHash);
  });

  it('should return a different hash for different input strings', () => {
    // Arrange
    const inputString1 = 'password123';
    const inputString2 = 'password456';

    // Act
    const hash1 = hashString(inputString1);
    const hash2 = hashString(inputString2);

    // Assert
    expect(hash1).not.toBe(hash2);
  });
});
