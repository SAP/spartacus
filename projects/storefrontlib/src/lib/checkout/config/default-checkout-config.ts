import { CheckoutConfig } from './checkout-config';
import { CheckoutStepType } from '../model/checkout-step.model';

export const defaultCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'shippingAddress',
        name: 'checkoutProgress.shippingAddress',
        route: 'checkoutShippingAddress',
        type: [CheckoutStepType.shippingAddress],
      },
      {
        id: 'deliveryMode',
        name: 'checkoutProgress.deliveryMode',
        route: 'checkoutDeliveryMode',
        type: [CheckoutStepType.deliveryMode],
      },
      {
        id: 'paymentDetails',
        name: 'checkoutProgress.paymentDetails',
        route: 'checkoutPaymentDetails',
        type: [CheckoutStepType.paymentDetails],
      },
      {
        id: 'reviewOrder',
        name: 'checkoutProgress.reviewOrder',
        route: 'checkoutReviewOrder',
        type: [CheckoutStepType.reviewOrder],
      },
    ],
  },
};
