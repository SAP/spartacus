import { RoutingConfig } from '@spartacus/core';

export const defaultCheckoutScheduledReplenishmentRoutingConfig: RoutingConfig =
  {
    routing: {
      routes: {
        replenishmentConfirmation: { paths: ['replenishment/confirmation'] },
      },
    },
  };
