import { RoutingConfig } from '@spartacus/core';

export const defaultCheckoutRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      checkoutLogin: { paths: ['checkout-login'], authFlow: true },
      checkout: { paths: ['checkout'] },
      checkoutPaymentType: { paths: ['checkout/payment-type'] },
      checkoutShippingAddress: { paths: ['checkout/shipping-address'] },
      checkoutDeliveryMode: { paths: ['checkout/delivery-mode'] },
      checkoutPaymentDetails: { paths: ['checkout/payment-details'] },
      checkoutReviewOrder: { paths: ['checkout/review-order'] },
      orderConfirmation: { paths: ['order-confirmation'] },
      replenishmentConfirmation: { paths: ['replenishment/confirmation'] },
    },
  },
};
