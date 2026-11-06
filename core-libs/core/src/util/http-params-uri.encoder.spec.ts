import { HttpParamsURIEncoder } from './http-params-uri.encoder';

const stringDecoded = 'Hello Spartacus!';
const stringEncoded = 'Hello%20Spartacus!';

describe('HttpParamsURIEncoder', () => {
  const encoder = new HttpParamsURIEncoder();

  describe(`encodeKey()`, () => {
    it('should return encoded key', () => {
      const result = encoder.encodeKey(stringDecoded);

      expect(result).toEqual(stringEncoded);
    });
  });

  describe(`encodeValue()`, () => {
    it('should return encoded value', () => {
      const result = encoder.encodeValue(stringDecoded);

      expect(result).toEqual(stringEncoded);
    });
  });

  describe(`decodeKey()`, () => {
    it('should return decoded key', () => {
      const result = encoder.decodeKey(stringEncoded);

      expect(result).toEqual(stringDecoded);
    });
  });

  describe(`decodeValue()`, () => {
    it('should return decoded value', () => {
      const result = encoder.decodeValue(stringEncoded);

      expect(result).toEqual(stringDecoded);
    });
  });
});
