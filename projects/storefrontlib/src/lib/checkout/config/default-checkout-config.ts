import { CheckoutConfig } from './checkout-config';

export enum StepType {
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
        name: 'checkoutProgress.label.shippingAddress',
        url: '/checkout/shipping-address',
        type: [StepType.shippingAddress],
      },
      {
        id: 'deliveryMode',
        name: 'checkoutProgress.label.deliveryMode',
        url: '/checkout/delivery-mode',
        type: [StepType.deliveryMode],
      },
      {
        id: 'paymentDetails',
        name: 'checkoutProgress.label.paymentDetails',
        url: '/checkout/payment-details',
        type: [StepType.paymentDetails],
      },
      {
        id: 'reviewOrder',
        name: 'checkoutProgress.label.reviewOrder',
        url: '/checkout/review-order',
        type: [StepType.reviewOrder],
      },
    ],
  },
};
