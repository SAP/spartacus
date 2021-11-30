// We need this import for augmentation of OccEndpoints to pick up
import { OccConfig } from '@spartacus/core';

const defaultB2bUserAccountOccEndpoints = {
  user: 'orgUsers/${userId}',
};

const defaultB2bUserProfileOccEndpoints = {
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
