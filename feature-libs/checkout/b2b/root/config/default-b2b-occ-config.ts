// TODO:#checkout - consider moving this OCC-specific config to the feature module. This would require schematics update.

// We need this import for augmentation of OccEndpoints to pick up
import { OccConfig } from '@spartacus/core';
import { UserAccountOccEndpoints } from '@spartacus/user/account/occ';
import { UserProfileOccEndpoints } from '@spartacus/user/profile/occ';

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

        addEntries:
          'orgUsers/${userId}/carts/${cartId}/entries?quantity=${quantity}',
      },
    },
  },
};
