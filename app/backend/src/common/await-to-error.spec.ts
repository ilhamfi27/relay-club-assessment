import { awaitToError } from './await-to-error';

describe('src/common/await-to-error.spec.ts', () => {
  describe('awaitToError', () => {
    it('should resolve with [null, result] if the promise resolves', async () => {
      // Arrange
      const promise = Promise.resolve('result');

      // Act
      const [error, result] = await awaitToError(promise);

      // Assert
      expect(error).toBeNull();
      expect(result).toBe('result');
    });

    it('should reject with [error, null] if the promise rejects', async () => {
      // Arrange
      const promise = Promise.reject(new Error('error'));

      // Act
      const [error, result] = await awaitToError(promise);

      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error!.message).toBe('error');
      expect(result).toBeNull();
    });
  });
});
