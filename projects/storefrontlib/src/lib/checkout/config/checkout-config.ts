import { OccConfig } from '@spartacus/core';
import { CheckoutStep } from './model/checkout-step.model';

export abstract class CheckoutConfig extends OccConfig {
  checkout?: {
    steps: Array<CheckoutStep>;
  };
}
