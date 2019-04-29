import { CheckoutConfig } from './checkout-config';

export enum CheckoutStepType {
  shippingAddress = 'shippingAddress',
  deliveryMode = 'deliveryMode',
  paymentDetails = 'paymentDetails',
  reviewOrder = 'reviewOrder',
}

export const defaultCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'shippingAddress',
        name: 'checkoutProgress.shippingAddress',
        url: '/checkout/shipping-address',
        type: [CheckoutStepType.shippingAddress],
      },
      {
        id: 'deliveryMode',
        name: 'checkoutProgress.deliveryMode',
        url: '/checkout/delivery-mode',
        type: [CheckoutStepType.deliveryMode],
      },
      {
        id: 'paymentDetails',
        name: 'checkoutProgress.paymentDetails',
        url: '/checkout/payment-details',
        type: [CheckoutStepType.paymentDetails],
      },
      {
        id: 'reviewOrder',
        name: 'checkoutProgress.reviewOrder',
        url: '/checkout/review-order',
        type: [CheckoutStepType.reviewOrder],
      },
    ],
  },
};
