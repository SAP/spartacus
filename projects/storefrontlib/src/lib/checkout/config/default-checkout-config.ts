import { CheckoutConfig } from './checkout-config';
import { CheckoutStepType } from '../model/checkout-step.model';

export const defaultCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'shippingAddress',
        name: 'checkoutProgress.shippingAddress',
        route: 'shippingAddress',
        type: [CheckoutStepType.shippingAddress],
      },
      {
        id: 'deliveryMode',
        name: 'checkoutProgress.deliveryMode',
        route: 'deliveryMode',
        type: [CheckoutStepType.deliveryMode],
      },
      {
        id: 'paymentDetails',
        name: 'checkoutProgress.paymentDetails',
        route: 'paymentDetails',
        type: [CheckoutStepType.paymentDetails],
      },
      {
        id: 'reviewOrder',
        name: 'checkoutProgress.reviewOrder',
        route: 'reviewOrder',
        type: [CheckoutStepType.reviewOrder],
      },
    ],
  },
};
