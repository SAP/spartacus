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
        uploadAttachment:
          '/users/${customerId}/tickets/${ticketId}/events/${eventCode}/attachments',
        createTicket: 'users/${customerId}/tickets',
        downloadAttachment:
          '/users/${customerId}/tickets/${ticketId}/events/${eventCode}/attachments/${attachmentId}',
      },
    },
  },
};
