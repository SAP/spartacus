/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { decodeBase64, encodeBase64 } from './base64';

const simpleString = {
  stringValue: 'hello',
  encoded: 'aGVsbG8=',
} as const;
const simpleUrlSafeString = {
  ...simpleString,
  encoded: simpleString.encoded.replaceAll('=', ''),
} as const;

const complexString = {
  /** contains non-ASCII characters */
  stringValue: 'ÿÿþ',
  /** contains all url-unsafe characters */
  encoded: 'w7/Dv8O+',
} as const;
const complexUrlSafeString = {
  ...complexString,
  /** contains all url-unsafe characters converted to safe values */
  encoded: 'w7_Dv8O-',
} as const;

const padding2 = {
  /** has 2 padding */
  encoded: 'TQ==',
  stringValue: 'M',
} as const;
const padding1 = {
  /** has 1 padding */
  encoded: 'TWE=',
  stringValue: 'Ma',
} as const;
const padding0 = {
  /** has no padding */
  encoded: 'TWFu',
  stringValue: 'Man',
} as const;

const missingPadding2 = {
  ...padding2,
  /** missing 2 padding */
  encoded: padding2.encoded.replaceAll('=', ''),
} as const;
const missingPadding1 = {
  ...padding1,
  /** missing 1 padding */
  encoded: padding1.encoded.replaceAll('=', ''),
} as const;
const missingPadding0 = {
  ...padding0,
  /** missing no padding */
  encoded: padding0.encoded.replaceAll('=', ''),
} as const;

describe('base64 utilities', () => {
  describe('encodeBase64()', () => {
    it('encodeTests', () => {
      expect(encodeBase64(padding0.stringValue)).toEqual(padding0.encoded);
      expect(encodeBase64(padding1.stringValue)).toEqual(padding1.encoded);
      expect(encodeBase64(padding2.stringValue)).toEqual(padding2.encoded);
    });

    it('should encode a simple ASCII string to standard base64', () => {
      const { encoded, stringValue } = simpleString;
      expect(encodeBase64(stringValue)).toBe(encoded);
    });

    it('should produce standard base64 with + and / characters when applicable', () => {
      const { encoded, stringValue } = complexString;
      expect(encodeBase64(stringValue)).toBe(encoded);
    });

    it('should encode a UTF-8 string', () => {
      const { encoded, stringValue } = complexString;
      expect(encodeBase64(stringValue)).toBe(encoded);
    });

    it('should encode an empty string to an empty base64 string', () => {
      expect(encodeBase64('')).toBe('');
    });

    describe('with urlSafe option', () => {
      it('should replace + with - and / with _', () => {
        const { encoded, stringValue } = complexUrlSafeString;
        expect(encodeBase64(stringValue, { urlSafe: true })).toBe(encoded);
      });

      it('should strip = padding', () => {
        expect(
          encodeBase64(missingPadding0.stringValue, { urlSafe: true })
        ).toBe(missingPadding0.encoded);
        expect(
          encodeBase64(missingPadding1.stringValue, { urlSafe: true })
        ).toBe(missingPadding1.encoded);
        expect(
          encodeBase64(missingPadding2.stringValue, { urlSafe: true })
        ).toBe(missingPadding2.encoded);
      });
    });
  });

  describe('decodeBase64()', () => {
    it('should decode an empty string to an empty string', () => {
      expect(decodeBase64('')).toBe('');
    });

    it('should decode a standard base64 string', () => {
      const { encoded, stringValue } = simpleString;

      expect(decodeBase64(encoded)).toBe(stringValue);
    });

    it('should decode a UTF-8 encoded base64 string', () => {
      const { encoded, stringValue } = complexString;
      expect(decodeBase64(encoded)).toBe(stringValue);
    });

    it('should decode with padding as optional', () => {
      expect(decodeBase64(padding0.encoded)).toEqual(padding0.stringValue);
      expect(decodeBase64(padding1.encoded)).toEqual(padding1.stringValue);
      expect(decodeBase64(padding2.encoded)).toEqual(padding2.stringValue);

      expect(decodeBase64(missingPadding0.encoded)).toEqual(
        missingPadding0.stringValue
      );
      expect(decodeBase64(missingPadding1.encoded)).toEqual(
        missingPadding1.stringValue
      );
      expect(decodeBase64(missingPadding2.encoded)).toEqual(
        missingPadding2.stringValue
      );
    });

    describe('with urlSafe option', () => {
      it('should decode a URL-safe base64 string', () => {
        const { encoded, stringValue } = simpleUrlSafeString;
        expect(decodeBase64(encoded, { urlSafe: true })).toBe(stringValue);
      });

      it('should decode URL-safe base64 with - and _ characters', () => {
        const { encoded, stringValue } = complexUrlSafeString;
        expect(decodeBase64(encoded, { urlSafe: true })).toBe(stringValue);
      });

      it('should decode a URL-safe base64 string without padding', () => {
        expect(decodeBase64(padding0.encoded)).toEqual(padding0.stringValue);
        expect(decodeBase64(padding1.encoded)).toEqual(padding1.stringValue);
        expect(decodeBase64(padding2.encoded)).toEqual(padding2.stringValue);
      });
    });
  });

  describe('round-trip (encode -> decode)', () => {
    it('should recover the original ASCII string', () => {
      const original = simpleString.stringValue;
      expect(decodeBase64(encodeBase64(original))).toBe(original);
    });

    it('should recover the original UTF-8 string', () => {
      const original = complexString.stringValue;
      expect(decodeBase64(encodeBase64(original))).toBe(original);
    });

    it('should recover the original string using URL-safe encoding', () => {
      const original = simpleUrlSafeString.stringValue;
      expect(
        decodeBase64(encodeBase64(original, { urlSafe: true }), {
          urlSafe: true,
        })
      ).toBe(original);
    });

    it('should recover the original string with special characters', () => {
      const original = '{"key":"value","num":42}';
      expect(decodeBase64(encodeBase64(original))).toBe(original);
    });
  });
});
