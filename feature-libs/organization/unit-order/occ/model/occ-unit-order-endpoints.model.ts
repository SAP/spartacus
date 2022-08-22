import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to retrieve unit-level orders
     *
     * @member {string}
     */
    unitLevelOrderHistory?: string | OccEndpoint;
  }
}
