import { OccEndpoint } from '@spartacus/core';

export interface UserAccountOccEndpoints {
  /**
   * Get user account details
   */
  user?: string | OccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends UserAccountOccEndpoints {}
}
