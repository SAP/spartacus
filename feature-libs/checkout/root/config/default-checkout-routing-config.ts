import { RoutesConfig, RoutingConfig } from '@spartacus/core';

export const defaultStorefrontCheckoutRoutesConfig: RoutesConfig = {
  checkoutLogin: { paths: ['checkout-login'] },
  checkout: { paths: ['checkout'] },
  checkoutPaymentType: { paths: ['checkout/payment-type'] },
  checkoutShippingAddress: { paths: ['checkout/shipping-address'] },
  checkoutDeliveryMode: { paths: ['checkout/delivery-mode'] },
  checkoutPaymentDetails: { paths: ['checkout/payment-details'] },
  checkoutReviewOrder: { paths: ['checkout/review-order'] },
  orderConfirmation: { paths: ['order-confirmation'] },
  replenishmentConfirmation: { paths: ['replenishment/confirmation'] },
};

export const defaultCheckoutRoutingConfig: RoutingConfig = {
  routing: {
    routes: defaultStorefrontCheckoutRoutesConfig,
  },
};
