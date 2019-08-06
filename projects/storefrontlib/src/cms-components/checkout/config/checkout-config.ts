import { CheckoutStep } from '../model/checkout-step.model';

export enum deliveryModeOptions {
  FREE = 'free',
  LEAST_EXPENSIVE = 'least expensive',
  MOST_EXPENSIVE = 'most expensive',
}

export abstract class CheckoutConfig {
  checkout?: {
    steps: Array<CheckoutStep>;
    deliveryMode?: deliveryModeOptions | string;
  };
}
