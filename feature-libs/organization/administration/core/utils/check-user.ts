import { OCC_USER_ID_ANONYMOUS } from '@spartacus/core';

/**
 * Checks if `userId` passed is actual user id.
 * Should return false if `userId` equals to `'anonymous'`.
 *
 * @param userId Id of the user
 */
export function isValidUser(userId: string): boolean {
  return userId !== OCC_USER_ID_ANONYMOUS;
}
