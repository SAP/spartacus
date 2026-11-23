import { maskFiscalId } from './mask-fiscal-id';

describe('maskFiscalId', () => {
  it.each([
    [undefined, ''],
    ['', ''],
    ['1', '*'],
    ['1234', '****'],
    ['12345', '*2345'],
    ['123456789', '*****6789'],
    ['PT123456789', '*******6789'],
  ])('masks %s', (value, expected) => {
    expect(maskFiscalId(value)).toBe(expected);
  });
});
