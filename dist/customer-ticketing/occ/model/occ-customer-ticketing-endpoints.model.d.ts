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
        /**
         * Endpoint to create a ticket event
         *
         * * @member {string}
         */
        createTicketEvent?: string | OccEndpoint;
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
        createTicket?: string | OccEndpoint;
        uploadAttachment?: string | OccEndpoint;
        /**
         * Endpoint to download an attachment
         *
         * * @member {string}
         */
        downloadAttachment?: string | OccEndpoint;
    }
}
