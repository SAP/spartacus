import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Get cart validation results
     */
    validate?: string | OccEndpoint;
  }
}
