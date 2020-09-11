import { OccConfig } from '@spartacus/core';

export const defaultB2bOccConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        user: 'orgUsers/${userId}',
        addEntries: 'orgUsers/${userId}/carts/${cartId}/entries',
        setDeliveryAddress:
          'orgUsers/${userId}/carts/${cartId}/addresses/delivery',
        // TODO(#8877): Is this a hack for an API? Shouldn't user pass this data?
        placeOrder: 'orgUsers/${userId}/orders?termsChecked=true',
      },
    },
  },
};
