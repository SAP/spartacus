import { OccConfig } from '@spartacus/core';

export const defaultOccCustomerTicketingConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        getTicket: 'users/${customerId}/tickets/${ticketId}',
        getTicketCategories: '/ticketCategories',
        getTicketAssociatedObjects:
          'users/${customerId}/ticketAssociatedObjects',
        createTicket: 'users/${customerId}/tickets',
      },
    },
  },
};
