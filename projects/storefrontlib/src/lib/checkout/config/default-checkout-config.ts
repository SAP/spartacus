import { CheckoutConfig } from './checkout-config';

export const defaultCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'shippingAddress',
        name: 'checkoutProgress.label.shippingAddress',
        url: '/checkout/shipping-address',
        type: ['shippingAddress'],
      },
      {
        id: 'deliveryMode',
        name: 'checkoutProgress.label.deliveryMode',
        url: '/checkout/delivery-mode',
        type: ['deliveryMode'],
      },
      {
        id: 'paymentDetails',
        name: 'checkoutProgress.label.paymentDetails',
        url: '/checkout/payment-details',
        type: ['paymentDetails'],
      },
      {
        id: 'reviewOrder',
        name: 'checkoutProgress.label.reviewOrder',
        url: '/checkout/review-order',
        type: ['reviewOrder'],
      },
    ],
  },
};
