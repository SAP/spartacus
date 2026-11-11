/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OccEndpoint as CoreOccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to get ticket details by ticket id
     * @member {string}
     */
    getTicket?: string | CoreOccEndpoint;

    /**
     * Endpoint to get ticket list by customer id
     * @member {string}
     */
    getTickets?: string | CoreOccEndpoint;

    /**
     * Endpoint to create a ticket event
     *
     * * @member {string}
     */
    createTicketEvent?: string | CoreOccEndpoint;
    /**
     * Endpoint to get ticket categories
     *
     * * @member {string}
     */
    getTicketCategories?: string | CoreOccEndpoint;
    /**
     * Endpoint to get ticket associated objects
     *
     * * @member {string}
     */
    getTicketAssociatedObjects?: string | CoreOccEndpoint;

    /* Endpoint to create ticket
     *
     * * @member {string}
     */
    createTicket?: string | CoreOccEndpoint;

    /* Endpoint to upload an attachment
     *
     * * @member {string}
     */
    uploadAttachment?: string | CoreOccEndpoint;

    /**
     * Endpoint to download an attachment
     *
     * * @member {string}
     */
    downloadAttachment?: string | CoreOccEndpoint;
  }
}
