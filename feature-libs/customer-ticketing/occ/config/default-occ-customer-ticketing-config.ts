/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccCustomerTicketingConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        getTicket: 'users/${customerId}/tickets/${ticketId}',
        getTickets: 'users/${customerId}/tickets',
        createTicketEvent: 'users/${customerId}/tickets/${ticketId}/events',
        getTicketCategories: '/ticketCategories',
        getTicketAssociatedObjects:
          'users/${customerId}/ticketAssociatedObjects',
        createTicket: 'users/${customerId}/tickets',
        uploadAttachment:
          '/users/${customerId}/tickets/${ticketId}/events/${eventCode}/attachments',
        downloadAttachment:
          '/users/${customerId}/tickets/${ticketId}/events/${eventCode}/attachments/${attachmentId}',
      },
    },
  },
};
