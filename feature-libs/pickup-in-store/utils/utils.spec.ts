import { getProperty } from './utils';

describe('getProperty', () => {
  it('should return null if arg is null', () => {
    const received = getProperty(null, 'key');
    expect(received).toBeNull();
  });
  it('should return null if key is not present in object', () => {
    const received = getProperty({}, 'key');
    expect(received).toBeNull();
  });
  it('should return key value if key is present in object', () => {
    const received = getProperty({ key: 'value' }, 'key');
    expect(received).toEqual('value');
  });
});
