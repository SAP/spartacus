import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Get a stock level for a product
     *
     * @member {string} [page]
     */
    stock?: string | OccEndpoint;
  }
}
