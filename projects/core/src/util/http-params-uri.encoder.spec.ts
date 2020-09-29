import { HttpParamsURIEncoder } from './http-params-uri.encoder';

describe('HttpParamsURIEncoder', () => {
  const httpParamsURIEncoder = new HttpParamsURIEncoder();
  const VALUE_FOR_ENCODE = 'Hello Spartacus!';
  const VALUE_FOR_DECODE = 'Hello%20Spartacus!';
  describe(`test for encodeKey`, () => {
    it('should equal to result of encodeURIComponent', () => {
      const result = httpParamsURIEncoder.encodeKey(VALUE_FOR_ENCODE);
      expect(result).toEqual(VALUE_FOR_DECODE);
    });
  });

  describe(`test for encodeValue`, () => {
    it('should equal to result of encodeURIComponent', () => {
      const result = httpParamsURIEncoder.encodeValue(VALUE_FOR_ENCODE);
      expect(result).toEqual(VALUE_FOR_DECODE);
    });
  });

  describe(`test for decodeKey`, () => {
    it('should equal to result of decodeURIComponent', () => {
      const result = httpParamsURIEncoder.decodeKey(VALUE_FOR_DECODE);
      expect(result).toEqual(VALUE_FOR_ENCODE);
    });
  });

  describe(`test for decodeValue`, () => {
    it('should equal to result of decodeURIComponent', () => {
      const result = httpParamsURIEncoder.decodeValue(VALUE_FOR_DECODE);
      expect(result).toEqual(VALUE_FOR_ENCODE);
    });
  });
});
