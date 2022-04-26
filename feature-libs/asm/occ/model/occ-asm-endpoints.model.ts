import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint for asm customer search
     *
     * @member {string}
     */
    asmCustomerSearch?: string | OccEndpoint;
    asmBindCart?: string | OccEndpoint;
    asmCustomerLists?: string | OccEndpoint;
  }
}
