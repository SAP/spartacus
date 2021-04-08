import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to add items to cart active
     *
     * * @member {string}
     */
    addToCart?: string | OccEndpoint;
  }
}
