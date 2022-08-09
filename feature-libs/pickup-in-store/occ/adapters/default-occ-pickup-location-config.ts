import { OccConfig } from '@spartacus/core';

export const defaultOccPickupLocationConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        storeDetails: 'stores/${storeName}',
        patchDeliveryOption:
          'users/${userId}/carts/${cartId}/entries/${entryNumber}',
      },
    },
  },
};
