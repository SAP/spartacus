import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Get a store location
     *
     * @member {string} [page]
     */
    store?: string | OccEndpoint;
    /**
     * Get a list of store locations
     *
     * @member {string} [page]
     */
    stores?: string | OccEndpoint;
    /**
     * Gets a store location count per country and regions
     *
     * @member {string} [page]
     */
    storescounts?: string | OccEndpoint;
  }
}
