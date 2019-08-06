import { CheckoutStep } from '../model/checkout-step.model';

export abstract class CheckoutConfig {
  checkout?: {
    steps: Array<CheckoutStep>;
    /**
     * Allow for express checkout if default shipping method and payment method are available.
     */
    express?: boolean;
  };
}
