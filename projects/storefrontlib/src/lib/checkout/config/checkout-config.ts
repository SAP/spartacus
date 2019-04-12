import { CheckoutStep } from './model/checkout-step.model';

export abstract class CheckoutConfig {
  checkout?: {
    steps: Array<CheckoutStep>;
  };
}
