import { InvalidTraceparentFormatError } from './errors/invalid-traceparent-format-error';
import { InvalidTraceparentLengthError } from './errors/invalid-traceparent-length-error';
import { parseTraceparent } from './parse-traceparent';

describe('parseTraceparent', () => {
  it('should return null if traceparent is not a string', () => {
    const result = parseTraceparent({} as string);

    expect(result).toBeUndefined();
  });

  it('should throw an error if traceparent is not 55 characters long', () => {
    const shorterString = '0'.repeat(54);
    const longerString = '0'.repeat(56);

    expect(() => parseTraceparent(shorterString)).toThrow(
      InvalidTraceparentLengthError
    );
    expect(() => parseTraceparent(longerString)).toThrow(
      InvalidTraceparentLengthError
    );
  });

  it('should throw an error if traceparent does not match the W3C pattern', () => {
    const additionalChar = 'x';
    const unsupportedFormats: string[] = [
      `00${additionalChar}-af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01`,
      `0-${additionalChar}0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01`,
      `00-0af7651916cd43dd8448eb211c80319-${additionalChar}b7ad6b7169203331-01`,
      `00-0af7651916cd43dd8448eb211c80319c-b7ad6b716920333-${additionalChar}01`,
      `00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331${additionalChar}-1`,
      `0010af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01`,
      `00-0af7651916cd43dd8448eb211c80319c1b7ad6b7169203331-01`,
      `00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331101`,
      `0010af7651916cd43dd8448eb211c80319c1b7ad6b7169203331101`,
    ];

    unsupportedFormats.forEach((traceparent) => {
      expect(() => parseTraceparent(traceparent)).toThrow(
        InvalidTraceparentFormatError
      );
    });
  });

  it('should parse traceparent correctly', () => {
    const traceparent =
      '00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01';

    const result = parseTraceparent(traceparent);

    expect(result).toMatchInlineSnapshot(`
      {
        "parentId": "b7ad6b7169203331",
        "traceFlags": "01",
        "traceId": "0af7651916cd43dd8448eb211c80319c",
        "version": "00",
      }
    `);
  });
});
