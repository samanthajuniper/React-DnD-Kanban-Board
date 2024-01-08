import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

export const mockDigest: any = jest.fn();
export const mockRandomUUID: any = jest.fn();

beforeAll(() => {
  Object.assign(global, { TextEncoder });
  Object.assign(global, {
    crypto: {
      subtle: {
        digest: mockDigest,
      },
      randomUUID: mockRandomUUID,
    },
  });
});

afterAll(() => {
  // reset globals to original values, which were undefined to begin with
  Object.assign(global, { TextEncoder: undefined });
  Object.assign(global, { crypto: undefined });
});

afterEach(() => {
  mockDigest.mockReset();
  mockRandomUUID.mockReset();
});
