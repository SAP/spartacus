import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to get ticket details by ticket id
     *
     * * @member {string}
     */
    getTicket?: string | OccEndpoint;

    /**
     * Endpoint to create a ticket event
     *
     * * @member {string}
     */
    createTicketEvent?: string | OccEndpoint;
  }
}
