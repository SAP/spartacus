import { OccConfig } from '../../config/occ-config';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
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
