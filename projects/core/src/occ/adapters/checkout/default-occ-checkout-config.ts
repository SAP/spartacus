import { OccConfig } from '../../config/occ-config';

export const defaultOccCheckoutConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        setDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        placeOrder: 'users/${userId}/orders?fields=FULL',
      },
    },
  },
};
