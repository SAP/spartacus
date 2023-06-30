import { parseTraceparent } from './parse-traceparent';

describe('parseTraceparent', () => {
  it('should return null if traceparent is not a string', () => {
    const result = parseTraceparent({} as string);

    expect(result).toBeNull();
  });

  it('should return null if traceparent is not 55 characters long', () => {
    const shorterString = '0'.repeat(54);
    const longerString = '0'.repeat(56);

    const resultWithShorterString = parseTraceparent(shorterString);
    const resultWithLongerString = parseTraceparent(longerString);

    expect(resultWithShorterString).toBeNull();
    expect(resultWithLongerString).toBeNull();
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
