import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to get ticket details by ticket id
     * @member {string}
     */
    getTicket?: string | OccEndpoint;

    /**
     * Endpoint to get ticket list by customer id
     * @member {string}
     */
    getTickets?: string | OccEndpoint;
  }
}
