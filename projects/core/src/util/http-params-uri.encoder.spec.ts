import { HttpParamsURIEncoder } from './http-params-uri.encoder';

describe('HttpParamsURIEncoder', () => {
  const httpParamsURIEncoder = new HttpParamsURIEncoder();
  const stringDecoded = 'Hello Spartacus!';
  const stringEncoded = 'Hello%20Spartacus!';
  describe(`test for encodeKey`, () => {
    it('should equal to result of encodeURIComponent', () => {
      const result = httpParamsURIEncoder.encodeKey(stringDecoded);
      expect(result).toEqual(stringEncoded);
    });
  });

  describe(`test for encodeValue`, () => {
    it('should equal to result of encodeURIComponent', () => {
      const result = httpParamsURIEncoder.encodeValue(stringDecoded);
      expect(result).toEqual(stringEncoded);
    });
  });

  describe(`test for decodeKey`, () => {
    it('should equal to result of decodeURIComponent', () => {
      const result = httpParamsURIEncoder.decodeKey(stringEncoded);
      expect(result).toEqual(stringDecoded);
    });
  });

  describe(`test for decodeValue`, () => {
    it('should equal to result of decodeURIComponent', () => {
      const result = httpParamsURIEncoder.decodeValue(stringEncoded);
      expect(result).toEqual(stringDecoded);
    });
  });
});
