import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Get user details
     *
     * @member {string}
     */
    user?: string | OccEndpoint;
  }
}
