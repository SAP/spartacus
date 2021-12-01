// We need this import for augmentation of OccEndpoints to pick up
import { CartOccEndpoints } from '@spartacus/cart/main/occ';
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

const defaultB2bCartOccEndpoints: CartOccEndpoints = {
  addEntries: 'orgUsers/${userId}/carts/${cartId}/entries?quantity=${quantity}',
};

export const defaultB2bOccConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...defaultB2bUserAccountOccEndpoints,
        ...defaultB2bUserProfileOccEndpoints,
        ...defaultB2bCartOccEndpoints,
      },
    },
  },
};
