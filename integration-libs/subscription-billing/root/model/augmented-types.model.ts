import {
  PricePlan,
  SubscriptionTerm,
} from './subscription-billing-product.model';
import '@spartacus/core';

declare module '@spartacus/core' {
  interface Product {
    sapSubscriptionTerm?: SubscriptionTerm;
    sapPricePlan?: PricePlan;
  }
}

declare module '@spartacus/core' {
  const enum ProductScope {
    SUBSCRIPTION = 'subscription',
  }
}
