import { OccConfig } from '@spartacus/core';

export const defaultOccCheckoutB2BConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        paymentTypes: 'paymenttypes',
        setCartCostCenter: 'users/${userId}/carts/${cartId}/costcenter',
        setCartPaymentType: 'users/${userId}/carts/${cartId}/paymenttype',
      },
    },
  },
};
