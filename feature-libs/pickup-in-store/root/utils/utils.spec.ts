import { cartWithIdAndUserId, getProperty } from './utils';

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

describe('cartWithIdAndUserId', () => {
  it('should return true if cartId and userId are present', () => {
    const result = cartWithIdAndUserId({
      guid: 'cartGuid',
      code: 'cartCode',
      user: {
        uid: 'userId',
      },
    });
    expect(result).toEqual(true);
  });

  it('should return false if cartId is not present', () => {
    const result = cartWithIdAndUserId({
      user: {
        uid: 'userId',
      },
    });
    expect(result).toEqual(false);
  });

  it('should return false if userId is not present', () => {
    const result = cartWithIdAndUserId({
      guid: 'cartGuid',
    });
    expect(result).toEqual(false);
  });
});
