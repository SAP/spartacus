import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Get store details by store Name.
     *
     * @member {string} [storeDetails]
     */
    storeDetails?: string | OccEndpoint;
  }
}
