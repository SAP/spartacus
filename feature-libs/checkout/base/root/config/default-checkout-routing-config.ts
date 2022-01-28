import { RoutingConfig } from '@spartacus/core';

// TODO:#checkout to update sample data to /delivery-address
export const defaultCheckoutRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      checkoutLogin: { paths: ['checkout-login'], authFlow: true },
      checkout: { paths: ['checkout'] },
      checkoutDeliveryAddress: { paths: ['checkout/shipping-address'] },
      checkoutDeliveryMode: { paths: ['checkout/delivery-mode'] },
      checkoutPaymentDetails: { paths: ['checkout/payment-details'] },
      checkoutReviewOrder: { paths: ['checkout/review-order'] },
      orderConfirmation: { paths: ['order-confirmation'] },
    },
  },
};
