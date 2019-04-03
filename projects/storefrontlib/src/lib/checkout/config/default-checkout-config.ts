import { CheckoutConfig } from './checkout-config';

export const defaultCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
      '/checkout/shipping-address',
      '/checkout/delivery-mode',
      '/checkout/payment-details',
      '/checkout/review-order',
    ],
  },
};
