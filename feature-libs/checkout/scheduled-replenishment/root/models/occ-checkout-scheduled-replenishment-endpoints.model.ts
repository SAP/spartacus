import { OccEndpoint } from '@spartacus/core';

export interface CheckoutScheduledReplenishmentOccEndpoints {
  scheduleReplenishmentOrder?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends CheckoutScheduledReplenishmentOccEndpoints {}
}
