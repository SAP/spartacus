import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint for asm customer search
     *
     * @member {string}
     */
    asmCustomerSearch?: string | OccEndpoint;
  }
}
