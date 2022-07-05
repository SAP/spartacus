import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to get ticket details by ticket id
     *
     * * @member {string}
     */
    getTicketDetails?: string | OccEndpoint;
  }
}
