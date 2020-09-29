import { HttpParamsURIEncoder } from './http-params-uri.encoder';

describe('HttpParamsURIEncoder', () => {
  const httpParamsURIEncoder = new HttpParamsURIEncoder();
  const stringDecoded = 'Hello Spartacus!';
  const stringEncoded = 'Hello%20Spartacus!';
  describe(`encodeKey()`, () => {
    it('should return encoded key', () => {
      const result = httpParamsURIEncoder.encodeKey(stringDecoded);
      expect(result).toEqual(stringEncoded);
    });
  });

  describe(`encodeValue()`, () => {
    it('should return encoded value', () => {
      const result = httpParamsURIEncoder.encodeValue(stringDecoded);
      expect(result).toEqual(stringEncoded);
    });
  });

  describe(`decodeKey()`, () => {
    it('should return decoded key', () => {
      const result = httpParamsURIEncoder.decodeKey(stringEncoded);
      expect(result).toEqual(stringDecoded);
    });
  });

  describe(`decodeValue()`, () => {
    it('should return decoded value', () => {
      const result = httpParamsURIEncoder.decodeValue(stringEncoded);
      expect(result).toEqual(stringDecoded);
    });
  });
});
