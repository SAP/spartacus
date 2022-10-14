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
     * Endpoint to get ticket categories
     *
     * * @member {string}
     */
    getTicketCategories?: string | OccEndpoint;
    /**
     * Endpoint to get ticket associated objects
     *
     * * @member {string}
     */
    getTicketAssociatedObjects?: string | OccEndpoint;
  }
}
