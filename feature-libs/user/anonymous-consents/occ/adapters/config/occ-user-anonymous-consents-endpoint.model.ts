import { OccEndpoint } from '@spartacus/core';

export interface UserAnonymousConsentsOccEndpoints {
  /**
   * Anonymous consent templates.
   */
  anonymousConsentTemplates?: string | OccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends UserAnonymousConsentsOccEndpoints {}
}
