import { RoutingConfig } from '@spartacus/core';

export const defaultCheckoutB2BRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      checkoutPaymentType: { paths: ['checkout/payment-type'] },
    },
  },
};
