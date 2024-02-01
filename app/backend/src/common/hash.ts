import * as crypto from 'crypto';

export const hashString = (inputString) => {
  const hash = crypto.createHash('sha256');
  hash.update(inputString);
  return hash.digest('hex');
};
