import { OccConfig } from '../../config/occ-config';

export const defaultOccCartConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        setDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        placeOrder: 'users/${userId}/orders',
      },
    },
  },
};
