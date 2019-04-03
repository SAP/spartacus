import { OccConfig } from '@spartacus/core';

export abstract class CheckoutConfig extends OccConfig {
  checkout?: {
    steps: Array<string>;
  };
}
