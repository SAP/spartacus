import { parseCSV } from './transform-utils';

describe('parseCSV', () => {
  it('should use the default values if no raw value is provided', () => {
    const result = parseCSV(undefined, ['default', 'values']);
    expect(result).toEqual(`'default', 'values'`);
  });
  it('should not add a comma when the input is not a csv list', () => {
    const result = parseCSV('test');
    expect(result).toEqual(`'test'`);
  });
  it('should return a csv string', () => {
    const result = parseCSV('foo,bar');
    expect(result).toEqual(`'foo', 'bar'`);
  });
});
