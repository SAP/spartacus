import { OccConfig } from '@spartacus/core';

export const defaultOccCustomerTicketingConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        getTicketDetails: 'users/${customerId}/tickets/${ticketId}',
      },
    },
  },
};
