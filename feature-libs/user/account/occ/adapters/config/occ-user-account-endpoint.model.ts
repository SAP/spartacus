import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Get user account details
     */
    user?: string | OccEndpoint;
  }
}
