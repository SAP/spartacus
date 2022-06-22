import { RoutingConfig } from '@spartacus/core';

export const defaultSupportTicketRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      supportTickets: {
        paths: ['my-account/support-tickets'],
      },
      supportTicketDetails: {
        paths: ['my-account/support-ticket/:ticketCode'],
        paramsMapping: { ticketCode: 'ticketCode' },
      },
    },
  },
};
