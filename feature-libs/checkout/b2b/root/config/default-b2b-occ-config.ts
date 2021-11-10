import { OccConfig } from '@spartacus/core';
import { UserAccountOccEndpoints } from '@spartacus/user/account/occ';
import { UserProfileOccEndpoints } from '@spartacus/user/profile/occ';

/**
 * TODO:#checkout - this file should be spread:
 *
 * - defaultB2bUserAccountOccEndpoints should go to organization lib?
 * - defaultB2bUserProfileOccEndpoints should also go to organization lib?
 *
 * -  user: 'orgUsers/${userId}', - org lib?
 * - userUpdateProfile: 'users/${userId}', - org lib?
 * - userCloseAccount: 'users/${userId}', - org lib?
 *
 * - addEntries - to the cart/b2b lib?
 *
 */
const defaultB2bUserAccountOccEndpoints: UserAccountOccEndpoints = {
  user: 'orgUsers/${userId}',
};

const defaultB2bUserProfileOccEndpoints: UserProfileOccEndpoints = {
  userUpdateProfile: 'users/${userId}',
  userCloseAccount: 'users/${userId}',
};

export const defaultB2bOccConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...defaultB2bUserAccountOccEndpoints,
        ...defaultB2bUserProfileOccEndpoints,
        user: 'orgUsers/${userId}',
        userUpdateProfile: 'users/${userId}',
        userCloseAccount: 'users/${userId}',
        addEntries:
          'orgUsers/${userId}/carts/${cartId}/entries?quantity=${quantity}',
      },
    },
  },
};
