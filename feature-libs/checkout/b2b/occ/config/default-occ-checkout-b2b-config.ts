// We need these imports for augmentation of OccEndpoints to be picked up
import { CheckoutOccEndpoints } from '@spartacus/checkout/base/occ';
import { OccConfig } from '@spartacus/core';

const defaultB2bCheckoutDetailsOccEndpoint: CheckoutOccEndpoints = {
  getCheckoutDetails:
    'users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL),costCenter(FULL),purchaseOrderNumber,paymentType(FULL)',
};

export const defaultOccCheckoutB2BConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...defaultB2bCheckoutDetailsOccEndpoint,
        setDeliveryAddress:
          'orgUsers/${userId}/carts/${cartId}/addresses/delivery',
        paymentTypes: 'paymenttypes', // TODO:#checkout - shouldn't the following endpoints use `orgUsers`?
        setCartCostCenter: 'users/${userId}/carts/${cartId}/costcenter', // TODO:#checkout - rename to b2bPlaceOrder? Similar to `scheduleReplenishmentOrder` from `feature-libs/checkout/scheduled-replenishment/occ/config/default-occ-scheduled-replenishment-config.ts`
        placeOrder: 'orgUsers/${userId}/orders?fields=FULL',
      },
    },
  },
};
