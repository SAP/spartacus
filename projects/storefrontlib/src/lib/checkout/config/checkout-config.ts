import { CheckoutStep } from '../model/checkout-step.model';

export abstract class CheckoutConfig {
  checkout?: {
    steps: Array<CheckoutStep>;
  };
}

export enum CheckoutStepType {
  shippingAddress = 'shippingAddress',
  deliveryMode = 'deliveryMode',
  paymentDetails = 'paymentDetails',
  reviewOrder = 'reviewOrder',
}
