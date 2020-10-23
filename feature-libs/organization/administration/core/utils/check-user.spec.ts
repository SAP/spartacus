import { OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { isValidUser } from './check-user';

describe('isValidUser', () => {
  it("should return `false` if user id equals to 'anonymous'", () => {
    expect(isValidUser(OCC_USER_ID_ANONYMOUS)).toBeFalse();
  });
  it("should return `true` if user id is not 'anonymous'", () => {
    expect(isValidUser(OCC_USER_ID_CURRENT)).toBeTrue();

    const mockUserId = '123456';
    expect(isValidUser(mockUserId)).toBeTrue();
  });
});
