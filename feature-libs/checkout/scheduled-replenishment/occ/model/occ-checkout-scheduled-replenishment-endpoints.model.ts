import { OccEndpoint } from '@spartacus/core';

export interface CheckoutScheduledReplenishmentOccEndpoints {
  abc?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends CheckoutScheduledReplenishmentOccEndpoints {}
}
